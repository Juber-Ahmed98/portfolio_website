"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

/**
 * Circular theme toggle (34px) matching the mockup nav.
 *
 * Icons come from Lucide, not the `☀`/`☾` characters the mockup used: those are
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
      className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-chip bg-transparent text-ink transition-transform hover:-translate-y-px"
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
