"use client";

import { useEffect, useRef, useState } from "react";
import { Phone } from "@/components/phone";
import { jembatan } from "@/content/site";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ease = (v: number) => v * v * (3 - 2 * v);

/**
 * Where a message is in the stack at second `t` of the recording, as a float
 * layer index (0 = Phone … 3 = Model), plus the dot's opacity. Keyed to the
 * clip's beats: speech until ~1.9s, down to the model as the mic lets go, the
 * translation streaming back up to the keyboard while the review strip fills
 * (to ~5.4s), then the keyboard inserts and sends. The dot fades over the
 * loop's seam so it never jumps from the keyboard back to the phone.
 */
function routeAt(t: number, duration: number) {
  let at: number;
  if (t < 1.9) at = 0;
  else if (t < 2.6) at = ease((t - 1.9) / 0.7) * 3;
  else if (t < 5.4) at = 3 - ease((t - 2.6) / 2.8) * 2;
  else at = 1;
  const fade = Math.min(clamp01(t / 0.3), clamp01((duration - t) / 0.5));
  return { at, fade };
}

/**
 * The route a message takes, for the home page's Jembatan section: what you
 * say, the four layers, what the other person reads, and the real recording
 * on loop beside them. A dot runs the layers in time with the video, driven
 * by its own clock, so the two can't drift.
 *
 * - The clip is only fetched when the section is a screen away, plays muted
 *   while at least a third of it is on screen, and pauses otherwise.
 * - Reduced motion and Save-Data never fetch it: the poster (the review
 *   frame, showing the first example) holds and the dot stays hidden.
 * - The examples change only on a tap. All three are stacked in one cell, so
 *   swapping never moves the button or the layout.
 *
 * One DOM for both layouts: phones read said / phone + layers / sent; from
 * `lg` the words take a column and the phone stands to their right.
 */
export function JembatanRoute() {
  const { examples, layers, route, loop } = jembatan;
  const [shown, setShown] = useState(0);
  const [announce, setAnnounce] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLOListElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stack = stackRef.current;
    const rail = railRef.current;
    const dot = dotRef.current;
    const video = videoRef.current;
    if (!root || !stack || !rail || !dot || !video) return;

    const items = Array.from(stack.querySelectorAll<HTMLElement>("[data-layer]"));
    let centers: number[] = [];
    // Each layer's name line, centred, in the list's own coordinates.
    const measure = () => {
      const top = stack.getBoundingClientRect().top;
      centers = items.map((li) => {
        const r = li.querySelector<HTMLElement>("[data-k]")!.getBoundingClientRect();
        return r.top - top + r.height / 2;
      });
      rail.style.top = `${centers[0]}px`;
      rail.style.height = `${centers[centers.length - 1] - centers[0]}px`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stack);

    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    );
    if (!motionOk || saveData) return () => ro.disconnect();

    let raf = 0;
    let lit = -1;
    let disposed = false;

    const frame = () => {
      raf = 0;
      if (disposed || video.paused) return;
      const duration = Number.isFinite(video.duration) ? video.duration : 10.47;
      const { at, fade } = routeAt(video.currentTime, duration);
      const lo = Math.floor(at);
      const hi = Math.min(lo + 1, centers.length - 1);
      const y = centers[lo] + (centers[hi] - centers[lo]) * (at - lo);
      dot.style.transform = `translate3d(0, ${(y - 4.5).toFixed(1)}px, 0)`;
      dot.style.opacity = fade.toFixed(2);
      const now = Math.round(at);
      if (now !== lit) {
        lit = now;
        items.forEach((li, n) => (li.dataset.on = String(n === now)));
      }
      raf = requestAnimationFrame(frame);
    };

    const onPlaying = () => {
      video.dataset.ready = "true";
      stack.dataset.live = "true";
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onPause = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);

    // Fetch a screen early; play only while it's properly on screen.
    const near = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || video.src) return;
        video.src = loop.src;
        near.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    near.observe(root);
    const seen = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          video.play().catch(() => {
            // Autoplay refused (low-power mode): the poster is a finished state.
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    seen.observe(root);

    return () => {
      disposed = true;
      ro.disconnect();
      near.disconnect();
      seen.disconnect();
      onPause();
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
    };
  }, [loop.src]);

  const next = () => {
    const n = (shown + 1) % examples.length;
    setShown(n);
    const e = examples[n];
    setAnnounce(`You say: ${e.said}. ${route.sent} ${e.langLabel}: ${e.sent}`);
  };

  const swap = (n: number) =>
    `[grid-area:1/1] transition-opacity duration-300 motion-reduce:transition-none ${
      n === shown ? "opacity-100" : "invisible opacity-0"
    }`;

  return (
    <div
      ref={rootRef}
      className="grid grid-cols-[minmax(0,40%)_minmax(0,1fr)] items-center gap-x-5 gap-y-6 [grid-area:route] [grid-template-areas:'said_said'_'phone_stack'_'sent_sent'_'next_next'] sm:grid-cols-[minmax(0,210px)_minmax(0,1fr)] sm:gap-x-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,212px)] lg:gap-x-10 lg:[grid-template-areas:'said_phone'_'stack_phone'_'sent_phone'_'next_phone']"
    >
      {/* What you say */}
      <div className="[grid-area:said]">
        <p className="t-data text-[12.5px] text-night-accent">{route.said}</p>
        <div className="mt-2 grid">
          {examples.map((e, n) => (
            <p
              key={e.said}
              lang="en"
              className={`text-[18px] font-[500] leading-[1.45] text-night-ink [text-wrap:pretty] ${swap(n)}`}
            >
              “{e.said}”
            </p>
          ))}
        </div>
      </div>

      {/* The real recording, on loop */}
      <div className="[grid-area:phone] lg:self-center">
        <Phone className="w-full">
          <img src={loop.poster} alt={loop.alt} loading="lazy" decoding="async" />
          <video
            ref={videoRef}
            className="film-video"
            muted
            loop
            playsInline
            preload="none"
            aria-hidden
            tabIndex={-1}
          />
        </Phone>
      </div>

      {/* The layers it passes through */}
      <ol ref={stackRef} aria-label="The layers it passes through" className="route relative pl-6 [grid-area:stack]">
        <span ref={railRef} aria-hidden className="absolute left-[5px] w-px bg-night-line" />
        <span
          ref={dotRef}
          aria-hidden
          className="route-dot absolute left-[1px] top-0 h-[9px] w-[9px] rounded-full bg-night-accent opacity-0"
        />
        {layers.map((l) => (
          <li
            key={l.k}
            data-layer
            className="route-layer border-t border-night-line py-3 first-of-type:border-t-0 first-of-type:pt-0 last-of-type:pb-0"
          >
            <span data-k className="route-k relative block text-[15.5px] font-[650] leading-[22px]">
              <span aria-hidden className="route-mark absolute -left-[22px] top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full" />
              {l.k}
            </span>
            <span className="mt-0.5 block text-[14px] leading-[1.45] text-night-body">{l.v}</span>
          </li>
        ))}
      </ol>

      {/* What they read */}
      <div className="grid [grid-area:sent]">
        {examples.map((e, n) => (
          <div key={e.said} className={`justify-self-end text-right ${swap(n)}`}>
            <p className="t-data text-[12.5px] text-night-accent">
              {route.sent} {e.langLabel}
            </p>
            <p
              lang={e.lang}
              className={`mt-2 max-w-[34ch] rounded-[18px] rounded-br-[6px] border border-night-line bg-night-raise px-4 py-3 text-left text-night-ink [text-wrap:pretty] ${
                e.lang === "bn" ? "font-bangla text-[18px] leading-[1.6]" : "text-[17.5px] leading-[1.5]"
              }`}
            >
              {e.sent}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 [grid-area:next]">
        <p className="max-w-[46ch] text-[13.5px] leading-[1.5] text-night-muted">{route.note}</p>
        <button
          type="button"
          onClick={next}
          className="tap inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-full border border-night-line px-4 text-[14.5px] font-[600] text-night-ink hover:border-night-muted"
        >
          {route.next}
          <span className="t-data text-[12px] text-night-muted">
            {shown + 1}/{examples.length}
          </span>
        </button>
        <p aria-live="polite" className="sr-only">
          {announce}
        </p>
      </div>
    </div>
  );
}
