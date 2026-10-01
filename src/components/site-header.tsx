"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav } from "@/content/site";

/**
 * Wordmark left, theme + CV right, nothing between (decision log: no inline
 * link row). On a phone the bar gets out of the way: it slides up while you
 * read down the page and comes back the moment you scroll up.
 *
 * It also changes tone over the night sections (the film and the close),
 * which carry `data-night`. Without that it would sit as a cream strip across
 * the darkened room.
 */
type HeaderAction = { label: string; href: string; ariaLabel?: string };

/**
 * `/websites` reuses the bar with its own brand and button and no theme
 * toggle; with no props it is the home page's bar.
 */
export function SiteHeader({
  brand = nav.brand,
  action = { label: "CV", href: nav.cv.href, ariaLabel: nav.cv.label },
  themeToggle = true,
}: {
  brand?: { text: string; accent?: string; href: string };
  action?: HeaderAction;
  themeToggle?: boolean;
} = {}) {
  const [hidden, setHidden] = useState(false);
  const [night, setNight] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const dy = y - lastY;
        // A small deadband so a jittery thumb doesn't flicker the bar.
        if (Math.abs(dy) > 6) {
          setHidden(dy > 0 && y > 120);
          lastY = y;
        }
        setScrolled(y > 8);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Night = a [data-night] section is under the bar's own strip.
    const watched = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) watched.add(e.target);
          else watched.delete(e.target);
        }
        setNight(watched.size > 0);
      },
      { rootMargin: "0px 0px -94% 0px" },
    );
    document.querySelectorAll("[data-night]").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <header
      data-hidden={hidden}
      className={`site-header fixed inset-x-0 top-0 z-50 border-b ${
        night
          ? "border-night-line bg-night/80 text-night-ink"
          : scrolled
            ? "border-line bg-bg/85 text-ink"
            : "border-transparent bg-transparent text-ink"
      } backdrop-blur-md`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-5 sm:px-10 xl:px-16">
        <a href={brand.href} className="tap -mx-2 inline-flex min-h-11 items-center px-2 text-[16px] font-[650] tracking-[-0.01em]">
          {brand.text}
          {brand.accent && <span className={night ? "text-night-accent" : "text-accent"}>{brand.accent}</span>}
        </a>
        <div className="flex items-center gap-2.5">
          {themeToggle && <ThemeToggle tone={night ? "night" : "paper"} />}
          <a
            href={action.href}
            aria-label={action.ariaLabel}
            className={`tap inline-flex min-h-10 items-center rounded-full px-[18px] text-[14px] font-[650] ${
              night ? "bg-night-ink text-night" : "bg-ink text-bg"
            }`}
          >
            {action.label}
          </a>
        </div>
      </div>
    </header>
  );
}
