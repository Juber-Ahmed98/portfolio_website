"use client";

import { useState } from "react";
import type { NavLink } from "@/content/site";

/**
 * Mobile disclosure for the nav's anchor links. Hidden at `sm` and up (the links
 * render inline there); below `sm` it's a hamburger button that toggles a
 * dropdown panel. Closes on link tap so the menu never blocks the page after
 * navigation. `aria-expanded`/`aria-controls` keep it screen-reader friendly.
 */
export function MobileMenu({ links }: { links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-chip text-[15px] text-ink transition-transform hover:-translate-y-px"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Site"
          className="absolute right-0 top-[42px] z-50 flex min-w-[160px] flex-col overflow-hidden rounded-[10px] border border-line bg-panel py-1 shadow-[0_16px_40px_rgba(11,20,24,0.18)]"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-4 py-[10px] text-[14px] font-semibold text-body transition-colors hover:bg-hover hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
