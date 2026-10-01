"use client";

import { useEffect, useRef } from "react";
import { Phone } from "@/components/phone";
import { film } from "@/content/site";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** The clip's own length, used until its metadata arrives. */
const FALLBACK_DURATION = 10.47;

/**
 * The film: Jembatan, used for real, played by the visitor's scroll.
 *
 * One tall track holds a sticky stage. As the track arrives the phone is set
 * down (it straightens and grows to full size) and the room dims; while the
 * stage is pinned, the track's progress is the playhead of a real screen
 * recording, and the three beats of the story advance with it. The copy never
 * moves; only the phone and the light do.
 *
 * Mechanics, kept from the v2 scrubber because they are what make scrubbing
 * smooth rather than stepped:
 * - The clip is fetched whole as a Blob when the track is a screen away, so
 *   seeking never waits on HTTP range requests.
 * - Scroll sets a target; a rAF loop lerps the playhead toward it and stops
 *   once it has converged. Wheel and touch scroll arrive in bursts, and a 1:1
 *   write reproduces every gap as a stutter.
 * - No seek is issued while the decoder is still seeking, and none smaller
 *   than a frame.
 * - The video stays invisible until a real frame has painted. A muted video
 *   that has been seeked but never played is blank on iOS, so it is primed
 *   with play() then pause() first.
 *
 * Phones get a 480px-wide encode (578 KB), larger screens the 720 (1.3 MB).
 * Save-Data never fetches either: the poster holds and the story still runs.
 * Reduced motion and no-JS never mount the stage at all (CSS, `.film-scrub`)
 * and get three stills instead.
 */
export function Film() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video) return;
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

    const steps = Array.from(track.querySelectorAll<HTMLElement>("[data-step]"));
    const fills = Array.from(track.querySelectorAll<HTMLElement>("[data-fill]"));
    const saveData = Boolean(
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    );
    const src = window.matchMedia("(min-width: 768px)").matches ? film.src.large : film.src.small;

    const LERP = 0.22;
    const DEADBAND = 1 / 30; // one frame of the 20fps cut is 0.05s

    let raf = 0;
    let disposed = false;
    let fetched = false;
    let ready = false;
    let objectUrl: string | null = null;
    let playhead = 0;
    let target = 0;
    let active = 0;

    const duration = () =>
      ready && Number.isFinite(video.duration) ? video.duration : FALLBACK_DURATION;

    const measure = () => {
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight;
      // Arriving: 0 with the track's top at the bottom of the screen, 1 when it pins.
      track.style.setProperty("--enter", clamp01((vh - r.top) / vh).toFixed(4));
      // The lights go down over the second half of the arrival, so the room is
      // dark by the time the story text is on screen. Smoothstep, over a short
      // run, so the room spends as little time as possible half-lit (a flat
      // mid-grey reads as mud, not dusk).
      const d = clamp01((vh * 0.5 - r.top) / (vh * 0.32));
      track.style.setProperty("--dim", (d * d * (3 - 2 * d)).toFixed(4));
      // Pinned: 0 → 1 across the track's scrollable length.
      const p = clamp01(-r.top / Math.max(1, r.height - vh));
      target = p * (duration() - 0.06);
    };

    const paint = (t: number) => {
      let idx = 0;
      film.steps.forEach((s, i) => {
        if (t >= s.at - 0.04) idx = i;
      });
      if (idx !== active) {
        active = idx;
        steps.forEach((el) => (el.dataset.active = String(Number(el.dataset.step) === idx)));
      }
      for (const el of fills) {
        const i = Number(el.dataset.fill);
        const start = film.steps[i].at;
        const end = film.steps[i + 1]?.at ?? duration();
        el.style.setProperty("--fill", clamp01((t - start) / (end - start)).toFixed(3));
      }
    };

    const tick = () => {
      raf = 0;
      if (disposed) return;
      measure();
      playhead += (target - playhead) * LERP;
      const settled = Math.abs(target - playhead) < 0.003;
      if (settled) playhead = target;
      if (ready && !video.seeking && Math.abs(playhead - video.currentTime) > DEADBAND) {
        video.currentTime = playhead;
      }
      paint(playhead);
      if (!settled) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(tick);
    };

    const load = async () => {
      fetched = true;
      if (saveData) return;
      try {
        const res = await fetch(src);
        if (!res.ok) return; // the poster is a finished state
        const blob = await res.blob();
        if (disposed) return;
        objectUrl = URL.createObjectURL(blob);
        video.addEventListener(
          "loadedmetadata",
          async () => {
            if (disposed) return;
            try {
              await video.play();
              video.pause();
            } catch {
              // Autoplay refused: seeking still works on every engine we target.
            }
            ready = true;
            measure();
            playhead = target;
            const reveal = () => {
              if (disposed) return;
              video.dataset.ready = "true";
              kick();
            };
            if (typeof video.requestVideoFrameCallback === "function") {
              video.requestVideoFrameCallback(reveal);
            } else {
              video.addEventListener("seeked", reveal, { once: true });
            }
            video.currentTime = playhead;
          },
          { once: true },
        );
        video.src = objectUrl;
      } catch {
        // Offline or blocked: the poster stays.
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fetched) void load();
        kick();
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(track);

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    kick();

    return () => {
      disposed = true;
      io.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      if (raf) cancelAnimationFrame(raf);
      video.removeAttribute("src");
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <section data-night aria-labelledby="film-title">
      <h2 id="film-title" className="sr-only">
        Jembatan, in use
      </h2>

      {/* ── The show: motion allowed and JS on ── */}
      <div ref={trackRef} className="film-scrub film-track relative">
        <div className="film-stage sticky top-0 flex h-svh flex-col items-center justify-start gap-5 overflow-hidden px-5 pb-5 pt-[60px] lg:justify-center lg:pt-0">
          <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-5 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20 lg:px-16">
            {/* Story beats. Phones: one beat at a time under a three-part
                progress bar. Desktop: all three, the current one lit. */}
            <div className="film-copy order-2 w-full max-w-[440px] lg:order-1 lg:max-w-[520px]">
              <div aria-hidden className="mb-4 grid grid-cols-3 gap-1.5 lg:hidden">
                {film.steps.map((s, i) => (
                  <span key={s.at} className="h-[3px] overflow-hidden rounded-full bg-night-line">
                    <span data-fill={i} className="film-fill block h-full bg-night-accent" />
                  </span>
                ))}
              </div>
              <ol className="grid lg:gap-10">
                {film.steps.map((s, i) => (
                  <li
                    key={s.at}
                    data-step={i}
                    data-active={i === 0}
                    className="film-step [grid-area:1/1] lg:[grid-area:auto]"
                  >
                    <span aria-hidden className="mb-4 hidden h-[3px] w-full overflow-hidden rounded-full bg-night-line lg:block">
                      <span data-fill={i} className="film-fill block h-full bg-night-accent" />
                    </span>
                    <p className="t-head text-[clamp(26px,7vw,34px)] lg:text-[clamp(30px,2.6vw,40px)]">
                      {s.title}
                    </p>
                    <p className="film-step-body mt-2 text-[15px] leading-[1.55] lg:text-[17px]">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="film-phone order-1 lg:order-2">
              <Phone className="set-down w-[min(74vw,calc((100svh-250px)*0.479))] lg:w-[min(400px,calc(82svh*0.479))]">
                <img src={film.poster} alt={film.alt} fetchPriority="high" />
                <video
                  ref={videoRef}
                  className="film-video"
                  muted
                  playsInline
                  preload="none"
                  aria-hidden
                  tabIndex={-1}
                />
              </Phone>
            </div>
          </div>
        </div>
      </div>

      {/* ── Reduced motion / no JS: the same story as three stills ── */}
      <div className="film-stills bg-night px-5 py-16 sm:px-10 lg:py-24">
        <ol className="mx-auto flex max-w-[1240px] snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:gap-12 lg:overflow-visible xl:px-6">
          {film.steps.map((s, i) => (
            <li key={s.at} className="w-[64vw] shrink-0 snap-center lg:w-auto">
              <Phone className="mx-auto w-full max-w-[300px]">
                <img src={film.stills[i].src} alt={film.stills[i].alt} loading="lazy" />
              </Phone>
              <p className="t-head mt-6 text-[26px] text-night-ink">{s.title}</p>
              <p className="mt-2 text-[15px] leading-[1.55] text-night-body">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
