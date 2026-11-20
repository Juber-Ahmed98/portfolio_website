/**
 * The motion layer for the home page (20 Nov; the rules are in DESIGN.md).
 *
 * It is loaded only when reduced motion is off (see the head script in
 * index.astro), so under prefers-reduced-motion nothing here is even fetched.
 * Every element is in its final place in the HTML; this file only decides how
 * it arrives. Each section has its own function and its own switch in ON.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/** Turn one section's motion off here. */
const ON = {
  hero: true,
  clients: true,
  more: true,
  day: true,
  jembatan: true,
  /** Hold the Jembatan room in place while its story plays (wide screens only). */
  jembatanPin: true,
  waystone: true,
  footer: true,
  /** Pointer parallax and the ambient light (desktop pointers only). */
  pointer: true,
};

const WIDE = "(min-width: 900px) and (min-aspect-ratio: 11/10)";
const POINTER = "(hover: hover) and (pointer: fine)";
/**
 * The viewing distance for every turned capture. It is set on the element once and never
 * tweened: animated towards "none" it shrinks to a few pixels on the way, which holds the
 * capture visibly skewed until the last frame and then snaps it flat.
 */
const PERSPECTIVE = 1600;

const root = document.documentElement;
const mm = gsap.matchMedia();
const $ = (sel: string, el: ParentNode = document) => el.querySelector<HTMLElement>(sel);
const $$ = (sel: string, el: ParentNode = document) => Array.from(el.querySelectorAll<HTMLElement>(sel));

/** Sections whose entrance has finished: pointer parallax waits for this. */
const settled = new WeakSet<Element>();
/** Sections still waiting to arrive, and how to bring each one in. */
const pending = new Map<HTMLElement, (instant?: boolean) => void>();

/**
 * Lines of type rising out of clipped containers. The text is split when this
 * is called and the markup is put back the moment the last line lands, so
 * nothing split survives a resize.
 */
function riseLines(el: HTMLElement, vars: gsap.TweenVars = {}) {
  const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "ln", aria: "none" });
  return gsap.from(split.lines, {
    yPercent: 128,
    duration: 0.8,
    ease: "expo.out",
    stagger: 0.09,
    ...vars,
    onComplete: () => split.revert(),
  });
}

/**
 * A section's entrance, once, when it scrolls into view. A section already on
 * screen when the page loads is left exactly as it is. Until it arrives the
 * parts are transparent but still focusable, and focus inside it (or printing)
 * brings it in at once.
 */
function arrive(section: HTMLElement, parts: (HTMLElement | null)[], build: () => gsap.core.Timeline, start = "top 70%") {
  const els = parts.filter((el): el is HTMLElement => !!el);
  if (section.getBoundingClientRect().top < innerHeight * 0.85) {
    settled.add(section);
    return;
  }
  gsap.set(els, { opacity: 0 });
  let done = false;
  const run = (instant = false) => {
    if (done) return;
    done = true;
    pending.delete(section);
    trigger.kill();
    gsap.set(els, { clearProps: "opacity" });
    const tl = build().eventCallback("onComplete", () => settled.add(section));
    if (instant) tl.progress(1);
  };
  const trigger = ScrollTrigger.create({ trigger: section, start, once: true, onEnter: () => run() });
  pending.set(section, run);
}

/**
 * Pointer depth for one section: its layers shift and tilt by a few pixels and
 * a degree or so, and a soft light follows the pointer. Built on the first
 * pointer move over a section that has arrived, and only for a pointer that
 * hovers on a wide screen.
 */
type Layer = { el: HTMLElement | null; shift: number; tilt?: number } | { to: (nx: number, ny: number) => void };

function depth(section: HTMLElement, layers: () => Layer[]) {
  if (!ON.pointer) return;
  mm.add(`${WIDE} and ${POINTER}`, () => {
    type Mover = (nx: number, ny: number) => void;
    let movers: Mover[] | null = null;
    let glow: HTMLElement | null = null;
    let gx: gsap.QuickToFunc, gy: gsap.QuickToFunc;

    const build = () => {
      glow = document.createElement("div");
      glow.className = "glow";
      glow.setAttribute("aria-hidden", "true");
      section.append(glow);
      gx = gsap.quickTo(glow, "x", { duration: 1.1, ease: "power3.out" });
      gy = gsap.quickTo(glow, "y", { duration: 1.1, ease: "power3.out" });
      movers = layers()
        .filter((l) => "to" in l || l.el)
        .map((l) => {
          if ("to" in l) return l.to;
          const { el, shift, tilt = 0 } = l;
          const x = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
          if (!tilt) return (nx) => x(nx * shift);
          gsap.set(el, { transformPerspective: PERSPECTIVE });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3.out" });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3.out" });
          return (nx, ny) => { x(nx * shift); ry(nx * tilt); rx(-ny * tilt * 0.6); };
        });
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !settled.has(section)) return;
      const r = section.getBoundingClientRect();
      const first = !movers;
      if (first) build();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      if (first) gsap.set(glow, { x: px, y: py });
      gx(px); gy(py);
      gsap.to(glow, { opacity: 1, duration: 0.8, ease: "power2.out", overwrite: "auto" });
      const nx = px / r.width - 0.5, ny = py / r.height - 0.5;
      movers!.forEach((m) => m(nx, ny));
    };
    const leave = () => {
      if (!movers) return;
      movers.forEach((m) => m(0, 0));
      gsap.to(glow, { opacity: 0, duration: 1.2, ease: "power2.out", overwrite: "auto" });
    };

    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    return () => {
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      movers?.forEach((m) => m(0, 0));
      glow?.remove();
    };
  });
}

// ── The first screen ─────────────────────────────────────────────────────────
/**
 * He is there first; then the headline rises line by line out of clipped
 * containers and the claim follows. He settles upward a little as he fades in.
 * Scrolling away, he sinks a touch while the words lift, and on a desktop he
 * and the words answer the pointer in opposite directions.
 */
function hero() {
  const section = $(".hero");
  const h1 = section && $("h1", section);
  const say = section && $(".say", section);
  const rest = section && $(".rest", section);
  const img = section && $<HTMLImageElement>(".me img", section);
  if (!section || !h1 || !say || !rest || !img) return;

  // The photo is placed with the CSS `translate` property, in percentages. GSAP would bake
  // that into pixels the moment it touched the element, so his three small movements (the
  // rise, the sink on scroll, the pointer) are summed here and written as one transform.
  const pos = { rise: 0, sink: 0, x: 0, y: 0 };
  let tall = img.offsetHeight;
  const place = () => {
    img.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${(pos.rise + pos.y + pos.sink * tall).toFixed(2)}px, 0)`;
  };
  ScrollTrigger.addEventListener("refresh", () => { tall = img.offsetHeight; place(); });

  // If the script arrived after the CSS fallback showed the words, leave them be.
  const late = performance.now() - ((window as any).__m0 ?? 0) > 1500;
  if (late || scrollY > 40) {
    settled.add(section);
  } else {
    pos.rise = 24;
    place();
    const rise = () => gsap.to(pos, { rise: 0, duration: 1.2, ease: "power3.out", onUpdate: place });
    if (img.classList.contains("in")) rise();
    else img.addEventListener("load", rise, { once: true });

    gsap.timeline({ delay: 0.12, onComplete: () => settled.add(section) })
      .add(riseLines(say, { duration: 0.9, stagger: 0.1 }), 0)
      .add(riseLines(rest, { duration: 0.8, stagger: 0.08 }), 0.26);
  }

  const scroll = { trigger: section, start: "top top", end: "bottom top", scrub: 0.5 };
  gsap.to(pos, { sink: 0.05, ease: "none", onUpdate: place, scrollTrigger: scroll });
  gsap.to(h1, { yPercent: -16, ease: "none", scrollTrigger: { ...scroll } });

  const px = gsap.quickTo(pos, "x", { duration: 1, ease: "power3.out", onUpdate: place });
  const py = gsap.quickTo(pos, "y", { duration: 1, ease: "power3.out", onUpdate: place });
  depth(section, () => [
    { to: (nx, ny) => { px(nx * -14); py(ny * -6); } },
    { el: h1, shift: 7 },
  ]);
}

/** The parts every room shares: the small line, the name, and the copy under it. */
function roomParts(room: HTMLElement) {
  return {
    kind: $(".kind", room),
    name: $(".head h2", room),
    copy: $$(":scope > .lede, :scope > .facts, :scope > .links", room),
  };
}

/** The start of every room's entrance: the small line fades, the name rises from a clip. */
function roomHead(tl: gsap.core.Timeline, kind: HTMLElement | null, name: HTMLElement | null) {
  if (kind) tl.from(kind, { opacity: 0, duration: 0.5, ease: "power2.out", clearProps: "opacity" }, 0);
  if (name) tl.add(riseLines(name), 0.04);
  return tl;
}

/** The copy never moves: it fades in, one block after another, and is always readable. */
function roomCopy(tl: gsap.core.Timeline, copy: HTMLElement[], at = 0.34) {
  if (copy.length) tl.from(copy, { opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.07, clearProps: "opacity" }, at);
  return tl;
}

// ── Jembatan: the story, told by the scroll ──────────────────────────────────
/**
 * The room arrives: its name from a clip, the phone settling out of a slight
 * turn. Then the scroll tells what the app does. What you say lights up word
 * by word; a hairline crosses to the other language; the Bengali rises word by
 * word out of clipped containers; the note that it is real output comes last.
 * On a wide screen the room holds still while this plays. The phone does not
 * move during the story: the recording is the one thing that moves by itself.
 */
function jembatan() {
  const room = $(".room.jem");
  const pair = room && $(".pair", room);
  if (!room || !pair) return;
  const { kind, name, copy } = roomParts(room);
  const phone = $(".rec .device", room);
  const caption = $(".rec figcaption", room);
  const said = $(".said", pair), sent = $(".sent", pair), note = $(".note", pair);
  const sentLabel = sent?.previousElementSibling as HTMLElement | null;
  if (!said || !sent) return;

  arrive(room, [kind, name, phone, caption, ...copy], () => {
    const wide = matchMedia(WIDE).matches;
    const tl = roomHead(gsap.timeline(), kind, name);
    if (phone) {
      gsap.set(phone, { transformPerspective: PERSPECTIVE });
      tl.from(phone, {
        opacity: 0, yPercent: 6, rotationY: wide ? -14 : -6, rotationX: wide ? 4 : 0,
        duration: 0.9, ease: "power3.out", clearProps: "opacity",
      }, 0.1);
    }
    if (caption) tl.from(caption, { opacity: 0, duration: 0.5, ease: "power2.out", clearProps: "opacity" }, 0.5);
    return roomCopy(tl, copy);
  });

  // Words, not lines: words wrap by themselves, so the story survives any resize.
  const saidWords = SplitText.create(said, { type: "words", aria: "none" }).words;
  const sentWords = SplitText.create(sent, { type: "words", mask: "words", wordsClass: "wd", aria: "none" }).words;

  const story = () => {
    const tl = gsap.timeline({ defaults: { ease: "none" } });
    tl.fromTo(saidWords, { opacity: 0.3 }, { opacity: 1, duration: 0.1, stagger: { amount: 0.26 } }, 0)
      .fromTo(said, { "--bridge": 0 }, { "--bridge": 1, duration: 0.16, ease: "power1.inOut" }, 0.34);
    if (sentLabel) tl.fromTo(sentLabel, { opacity: 0.3 }, { opacity: 0.78, duration: 0.08 }, 0.44);
    tl.fromTo(sentWords, { yPercent: 135 }, { yPercent: 0, duration: 0.2, ease: "power2.out", stagger: { amount: 0.22 } }, 0.5);
    if (note) tl.fromTo(note, { opacity: 0 }, { opacity: 0.7, duration: 0.1 }, 0.9);
    return tl;
  };

  const HOLD = `${WIDE} and (min-height: 640px)`;
  mm.add({ hold: HOLD, flow: `not all and ${HOLD}` }, (ctx) => {
    const fits = room.offsetHeight <= innerHeight + 2;
    if (ctx.conditions!.hold && ON.jembatanPin && fits) {
      // The room holds for most of a screen; the story starts a little before it lands.
      ScrollTrigger.create({ trigger: room, start: "top top", end: "+=80%", pin: true, anticipatePin: 1 });
      ScrollTrigger.create({ trigger: room, start: "top 28%", end: "+=100%", scrub: 0.6, animation: story() });
    } else {
      // No hold: the story plays as the pair crosses the middle of the screen.
      ScrollTrigger.create({ trigger: pair, start: "top 82%", end: "top 26%", scrub: 0.5, animation: story() });
    }
  });

  depth(room, () => [
    { el: phone, shift: -10, tilt: 2.4 },
    { el: pair, shift: 5 },
  ]);
}

/**
 * Layers that drift at different rates as their room scrolls past, so the
 * nearer capture moves more than the one behind it. Wide screens only.
 */
function drift(room: HTMLElement, layers: [HTMLElement | null, number][]) {
  mm.add(WIDE, () => {
    layers.forEach(([el, px]) => {
      if (!el) return;
      gsap.fromTo(el, { y: px }, {
        y: -px, ease: "none",
        scrollTrigger: { trigger: room, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    });
  });
}

/** A capture arriving out of a slight turn (flat, just a rise, on a phone). */
function turnIn(tl: gsap.core.Timeline, el: HTMLElement | null, at: number, turn: number, rise: number) {
  if (!el) return;
  const wide = matchMedia(WIDE).matches;
  gsap.set(el, { transformPerspective: PERSPECTIVE });
  tl.from(el, {
    opacity: 0, yPercent: rise, rotationY: wide ? turn : 0, rotationX: wide ? 3 : 0,
    duration: 0.9, ease: "power3.out", clearProps: "opacity",
  }, at);
}

// ── The client rooms: two sheets at two depths ───────────────────────────────
/**
 * The name rises from a clip; the desktop capture comes in out of a slight
 * turn and the phone capture follows from a deeper one. Scrolling past, the
 * phone drifts faster than the screen behind it, and the pointer tilts both.
 */
function clients() {
  $$(".room.site").forEach((room) => {
    const { kind, name, copy } = roomParts(room);
    const screen = $(".stage .screen", room), device = $(".stage .device", room);
    arrive(room, [kind, name, screen, device, ...copy], () => {
      const tl = roomHead(gsap.timeline(), kind, name);
      turnIn(tl, screen, 0.1, -8, 6);
      turnIn(tl, device, 0.24, -16, 10);
      return roomCopy(tl, copy);
    });
    drift(room, [[screen, 20], [device, 52]]);
    depth(room, () => [
      { el: screen, shift: -6, tilt: 1.2 },
      { el: device, shift: -14, tilt: 2.2 },
    ]);
  });
}

// ── Two more client sites ────────────────────────────────────────────────────
/** The heading rises; the two captures arrive one after the other. */
function more() {
  const room = $(".room.more");
  if (!room) return;
  const { kind, name } = roomParts(room);
  const figures = $$(".pairs figure", room);
  arrive(room, [kind, name, ...figures], () => {
    const tl = roomHead(gsap.timeline(), kind, name);
    tl.from(figures, { opacity: 0, yPercent: 6, duration: 0.8, ease: "power3.out", stagger: 0.14, clearProps: "opacity" }, 0.2);
    return tl;
  });
  depth(room, () => figures.map((figure, i) => ({ el: $(".shot", figure), shift: -5 - i * 4 })));
}

// ── Wolseley: the words are the stage ────────────────────────────────────────
/** The claim rises line by line; the roles and the tools fade in, row by row. */
function day() {
  const room = $(".room.day");
  if (!room) return;
  const { kind, name } = roomParts(room);
  const claim = $(".claim", room);
  const rows = $$(".roles li, .kit", room);
  arrive(room, [kind, name, claim, ...rows], () => {
    const tl = roomHead(gsap.timeline(), kind, name);
    if (claim) tl.add(riseLines(claim, { stagger: 0.07 }), 0.16);
    tl.from(rows, { opacity: 0, duration: 0.6, ease: "power2.out", stagger: 0.09, clearProps: "opacity" }, 0.42);
    return tl;
  });
  depth(room, () => []);
}

// ── Waystone: three phones at three depths ───────────────────────────────────
function waystone() {
  const room = $(".room.way");
  if (!room) return;
  const { kind, name, copy } = roomParts(room);
  const phones = $$(".stage .device", room);
  arrive(room, [kind, name, ...phones, ...copy], () => {
    const tl = roomHead(gsap.timeline(), kind, name);
    phones.forEach((phone, i) => turnIn(tl, phone, 0.1 + i * 0.12, -14, 7 + i * 3));
    return roomCopy(tl, copy);
  });
  drift(room, phones.map((phone, i) => [phone, 18 + i * 26]));
  depth(room, () => phones.map((phone, i) => ({ el: phone, shift: -6 - i * 5, tilt: 1.6 })));
}

// ── The footer ───────────────────────────────────────────────────────────────
/** The email address rises once from a clip. Nothing else. */
function footer() {
  const end = $(".end");
  const mail = end && $("a.mail", end);
  if (!end || !mail) return;
  arrive(end, [mail], () => gsap.timeline().add(riseLines(mail, { duration: 0.9 })), "top 82%");
}

// ── Start ────────────────────────────────────────────────────────────────────
function start() {
  // In page order: a held room adds scroll length, and the triggers below it must know.
  if (ON.hero) hero();
  if (ON.clients) clients();
  if (ON.more) more();
  if (ON.day) day();
  if (ON.jembatan) jembatan();
  if (ON.waystone) waystone();
  if (ON.footer) footer();
  root.classList.add("motion-on");

  // Focus inside a section that hasn't arrived, or printing, brings it in.
  document.addEventListener("focusin", (e) => {
    const section = (e.target as Element).closest<HTMLElement>("section, footer");
    if (section) pending.get(section)?.();
  });
  addEventListener("beforeprint", () => [...pending.values()].forEach((run) => run(true)));
}

// Lines are measured, so the typeface has to be in first (it is preloaded).
Promise.race([document.fonts.ready, new Promise((done) => setTimeout(done, 700))]).then(start);
