"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Light/dark switch. The new theme spreads out from the button as a circle,
 * like a lamp being switched on (View Transitions; see `::view-transition-new`
 * in globals.css). Browsers without the API, and reduced motion, swap
 * instantly.
 *
 * The class is written onto <html> inside the transition callback rather than
 * left to next-themes' effect, because the transition snapshots the page as
 * soon as the callback returns. next-themes still owns persistence and
 * applies the same class a moment later, which is a no-op.
 *
 * Renders a neutral icon until mounted so server and client markup match.
 */
export function ThemeToggle({ tone = "paper" }: { tone?: "paper" | "night" }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    const apply = () => {
      const root = document.documentElement;
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
      setTheme(next);
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof document.startViewTransition !== "function") {
      apply();
      return;
    }
    const r = ref.current?.getBoundingClientRect();
    if (r) {
      const root = document.documentElement.style;
      root.setProperty("--vt-x", `${r.left + r.width / 2}px`);
      root.setProperty("--vt-y", `${r.top + r.height / 2}px`);
    }
    document.startViewTransition(apply);
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={toggle}
      className={`tap grid h-10 w-10 place-items-center rounded-full border ${
        tone === "night"
          ? "border-night-line text-night-ink hover:border-night-muted"
          : "border-line-strong text-ink hover:border-ink"
      }`}
    >
      <span suppressHydrationWarning className="flex">
        {isDark ? <Sun size={17} aria-hidden /> : <Moon size={17} aria-hidden />}
      </span>
    </button>
  );
}
