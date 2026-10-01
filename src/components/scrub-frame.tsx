"use client";

import { useEffect, useRef } from "react";

type ScrubFrameProps = {
  /** Scrub-encoded clip (dense GOP — see DESIGN.md, flagship scrub decision). */
  src: string;
  /** First frame of the clip. The no-JS, reduced-motion and sub-md state. */
  poster: string;
  alt: string;
};

/**
 * A screenshot frame whose clip plays under the visitor's scroll instead of
 * on a timer: the card's passage through the viewport is the playhead. The
 * copy beside it never moves — the motion lives entirely inside the frame
 * ("images move, text never").
 *
 * The poster <img> is the base layer and the only thing many visitors get:
 * no JavaScript, `prefers-reduced-motion`, and viewports below `md` (phones
 * don't pay the clip's ~2.3MB) all rest on it. The <video> gains a src only
 * when the frame is within a viewport of arriving, fetched as a Blob so
 * seeking never depends on HTTP range support, and stays hidden until a real
 * frame has painted — a seeked-but-never-played muted video is blank on iOS,
 * and revealing on metadata alone would flash an empty stage.
 *
 * Scroll never writes `currentTime` directly. It sets a target and a rAF
 * loop lerps the playhead toward it (wheel events arrive in bursts; a 1:1
 * write reproduces every gap as stutter), skips writes smaller than the
 * deadband (a sub-frame seek costs a decode and shows nothing), and never
 * queues a seek while the decoder is mid-seek.
 */
export function ScrubFrame({ src, poster, alt }: ScrubFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const LERP = 0.18;
    const DEADBAND = 0.008; // seconds; ≈ a quarter frame at 30fps

    let disposed = false;
    let fetchStarted = false;
    let ready = false;
    let inRange = false;
    let objectUrl: string | null = null;
    let raf = 0;
    let playhead = 0;

    /** 0 at "frame's top edge at the bottom of the viewport", 1 at "bottom
        edge at the top" — the frame's whole visible life, like a flow act. */
    const progress = () => {
      const rect = video.getBoundingClientRect();
      const vh = window.innerHeight;
      return Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
    };

    const step = () => {
      raf = 0;
      if (disposed || !ready) return;
      const target = progress() * Math.max(0, video.duration - 0.05);
      playhead += (target - playhead) * LERP;
      if (!video.seeking && Math.abs(playhead - video.currentTime) > DEADBAND) {
        video.currentTime = playhead;
      }
      if (inRange) raf = requestAnimationFrame(step);
    };

    const kick = () => {
      if (!raf && ready && !disposed) raf = requestAnimationFrame(step);
    };

    const reveal = () => {
      if (disposed) return;
      ready = true;
      video.classList.remove("opacity-0");
      kick();
    };

    const load = async () => {
      fetchStarted = true;
      try {
        const res = await fetch(src);
        if (!res.ok) return; // poster stays — a 404 must not blank the frame
        const blob = await res.blob();
        if (disposed) return;
        objectUrl = URL.createObjectURL(blob);
        video.addEventListener(
          "loadedmetadata",
          () => {
            if (disposed) return;
            // Land on the scroll-correct frame before revealing, so the
            // swap from poster to video is invisible mid-scroll too.
            playhead = progress() * Math.max(0, video.duration - 0.05);
            video.currentTime = playhead;
            if (typeof video.requestVideoFrameCallback === "function") {
              video.requestVideoFrameCallback(() => reveal());
            } else {
              video.addEventListener("seeked", reveal, { once: true });
            }
          },
          { once: true },
        );
        video.src = objectUrl;
      } catch {
        // Network failure: the poster is the finished state.
      }
    };

    // One observer, one viewport of headroom: entering range starts the
    // fetch the first time and (re)starts the scrub loop every time.
    const io = new IntersectionObserver(
      ([entry]) => {
        inRange = entry.isIntersecting;
        if (inRange) {
          if (!fetchStarted) void load();
          kick();
        }
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(video);

    return () => {
      disposed = true;
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      video.removeAttribute("src");
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  return (
    <>
      <img
        src={poster}
        alt={alt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full rounded-[4px] object-cover"
      />
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 h-full w-full rounded-[4px] object-cover opacity-0 transition-opacity duration-300"
      />
    </>
  );
}
