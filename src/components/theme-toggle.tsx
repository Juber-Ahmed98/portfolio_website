"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Theme toggle — a 36px rounded-square with the Workshop's 2px ink border and
 * small block shadow (DESIGN.md, Components → Nav).
 *
 * Icons come from Lucide, not the `☀`/`☾` characters the mockups used: those are
 * drawn by whatever font the OS falls back to, and `☀` has an emoji presentation
 * variant that some Windows and Android builds render as a colour emoji in the
 * middle of a monochrome nav.
 *
 * Renders a neutral placeholder until mounted so the icon never mismatches
 * between server and client (avoids hydration warnings).
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      /* press-sm: a 2px shadow, so a 2px sink — the switch bottoms out against
         the plate. The icon swap rides on `onClick`, which fires on release
         (touchend), so the press and the state change stay separate beats. */
      className="press press-sm flex h-[36px] w-[36px] items-center justify-center rounded-[10px] border-2 border-ink bg-panel text-ink shadow-[2px_2px_0_var(--ink)] motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[3px_3px_0_var(--ink)]"
    >
      {/* Show the icon for the theme you'd switch TO. */}
      <span suppressHydrationWarning className="flex">
        {mounted && isDark ? (
          <Sun size={16} aria-hidden />
        ) : (
          <Moon size={16} aria-hidden />
        )}
      </span>
    </button>
  );
}
