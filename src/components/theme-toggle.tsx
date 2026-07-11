"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Circular theme toggle (34px, ☾ / ☀) matching the mockup nav.
 * Renders a neutral placeholder until mounted so the icon never
 * mismatches between server and client (avoids hydration warnings).
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
      className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-chip bg-transparent text-[14px] text-ink transition-transform hover:-translate-y-px"
    >
      {/* Show the icon for the theme you'd switch TO. */}
      <span suppressHydrationWarning>{mounted ? (isDark ? "☀" : "☾") : "☾"}</span>
    </button>
  );
}
