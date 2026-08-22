"use client";

import { useState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { sections, wall } from "@/content/site";

/**
 * How many cards show before "view all". Both numbers are whole grid rows, so a
 * collapsed board never ends on a ragged half-row: 4 down the single mobile
 * column, then 3×2 at `sm` and 2×3 at `lg` above it.
 *
 * Every card is still in the HTML — collapsing is `display:none`, so the hidden
 * builds stay crawlable and leave the tab order at the same time.
 */
const COLLAPSED_MOBILE = 4;
const COLLAPSED_WIDE = 6;

/**
 * The Wall — a literal pegboard (DESIGN.md, "Signature elements"): a tinted,
 * dot-drilled container holding one tool card per build. Cards carry the
 * letterpress block shadow and lift with a slight tilt on hover. Badges are
 * stamps: live = green ink, building = dashed gold.
 *
 * Cards stay `div`s, not wrapping anchors — a nested case-study link inside a
 * card-wide anchor would be invalid HTML. Link labels carry no arrow glyphs
 * (decision log: no Unicode dingbats).
 */
export function Wall() {
  const [expanded, setExpanded] = useState(false);
  /* Below `sm` the button has work to do sooner, so it can be needed on mobile
     and not on desktop. It disappears entirely once the wall fits either way. */
  const hidesOnWide = wall.length > COLLAPSED_WIDE;
  const hidesOnMobile = wall.length > COLLAPSED_MOBILE;

  return (
    <section
      id="wall"
      /* Tighter than featured — the wall is a dense index, and the compression
         is what makes it read as "a lot of builds" rather than "a few cards". */
      className="mx-auto max-w-[1180px] scroll-mt-6 border-b-2 border-ink px-6 py-[58px] sm:px-10 2xl:max-w-[1320px] 2xl:px-16"
    >
      <SectionHeading title={sections.wall.title} className="mb-[12px]" />
      <p className="mb-[30px] max-w-[560px] text-[15px] font-medium text-muted">
        {sections.wall.sub}
      </p>

      {/* The pegboard. */}
      <div
        className="rounded-[16px] border-2 border-ink bg-hl p-4 sm:p-6"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--ink) 14%, transparent) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      >
        <div
          id="wall-grid"
          className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3"
        >
          {wall.map((project, i) => (
            <div
              key={project.name}
              /* The tappable thing here is a 12px link; the card is the visual
                 unit. `press-plate` presses the whole plate when either link is
                 held, which is the touch mirror of the hover lift above it. */
              className={`press-plate flex flex-col gap-[7px] rounded-[12px] border-2 border-ink bg-panel px-[18px] py-4 shadow-[var(--shadow-card)] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-[3px] motion-safe:hover:rotate-[-0.4deg] motion-safe:hover:shadow-[6px_6px_0_var(--accent)] ${
                expanded || i < COLLAPSED_MOBILE
                  ? ""
                  : i < COLLAPSED_WIDE
                    ? "hidden sm:flex"
                    : "hidden"
              }`}
            >
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-[15.5px] font-extrabold tracking-[-0.01em] text-ink">
                  {project.name}
                </span>
                <span
                  className={`shrink-0 rotate-[-2deg] rounded-[5px] px-[7px] py-[2px] font-mono text-[10px] font-semibold uppercase tracking-[0.07em] ${
                    project.live
                      ? "border-[1.5px] border-live text-live"
                      : "border-[1.5px] border-dashed border-wip text-wip"
                  }`}
                >
                  {project.badge}
                </span>
              </span>
              <span className="text-[13.5px] font-medium leading-[1.55] text-body">
                {project.desc}
              </span>
              <span className="font-mono text-[11.5px] text-faint">
                {project.tags}
              </span>
              {/* A card with nothing public to point at renders no link row at
                  all — never a dead link (see `WallProject.link`). */}
              {(project.link || project.caseHref) && (
                /* 12px mono on a 2px underline is a 65×18px tap target. The
                   anchors get padding out to 81×46 and the row pulls the same
                   distance back with negative margins, so the hit area more
                   than doubles while the card gains 5px of height. The
                   underline moves to an inner span so the rule still hugs the
                   text rather than floating at the bottom of the padding. */
                <span className="-mx-2 -mb-[10px] -mt-[9px] flex gap-1 font-mono text-[12px]">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex min-h-[44px] items-center px-2 py-[13px]"
                    >
                      <span className="border-b-2 border-accent font-semibold text-ink transition-colors group-hover:bg-hl group-hover:text-accent group-active:bg-hl group-active:text-accent">
                        {project.linkLabel ?? "code"}
                      </span>
                    </a>
                  )}
                  {project.caseHref && (
                    <Link
                      href={project.caseHref}
                      className="group inline-flex min-h-[44px] items-center px-2 py-[13px]"
                    >
                      <span className="border-b-2 border-accent font-semibold text-ink transition-colors group-hover:bg-hl group-hover:text-accent group-active:bg-hl group-active:text-accent">
                        case study
                      </span>
                    </Link>
                  )}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Lives inside the pegboard: it acts on the board's contents, not on
            the section. Nav CV button treatment — the site's "this is a button". */}
        {hidesOnMobile && (
          <div className={`mt-[18px] flex justify-center ${hidesOnWide ? "" : "sm:hidden"}`}>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls="wall-grid"
              className="press rounded-[10px] border-2 border-ink bg-panel px-5 py-[11px] font-mono text-[12.5px] font-bold text-ink shadow-[var(--shadow-card)] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[6px_6px_0_var(--accent)]"
            >
              {expanded ? "show fewer" : `view all ${wall.length} builds`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
