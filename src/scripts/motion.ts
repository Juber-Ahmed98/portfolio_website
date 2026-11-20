/**
 * The motion layer for the home page (a trial, on the branch motion/gsap).
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
          gsap.set(el, { transformPerspective: 1400 });
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

// ── Start ────────────────────────────────────────────────────────────────────
function start() {
  if (ON.hero) hero();
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
