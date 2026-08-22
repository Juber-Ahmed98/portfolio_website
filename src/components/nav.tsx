import { ThemeToggle } from "@/components/theme-toggle";
import { Squiggle } from "@/components/squiggle";
import { nav } from "@/content/site";

/**
 * Top navigation — edge-aligned minimal (DESIGN.md decision log): wordmark
 * hard-left, theme toggle + CV button hard-right, and deliberately nothing in
 * between.
 *
 * The empty middle is the point. The shape this replaced — wordmark left, four
 * inline anchors centre, CTA right — is the most recognisable AI-generated nav
 * there is. The anchors live in the hero as a jump list. Don't put links back
 * here "to fill the space".
 *
 * Workshop dress: the wordmark carries the hand-drawn squiggle, the CV button is
 * a ghost block (2px ink border + letterpress shadow), and the bottom border is
 * the section-grade 2px ink rule. With no links to collapse there's no mobile
 * menu — the bar is two items wide at every breakpoint.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-[18px] sm:px-10 2xl:max-w-[1320px] 2xl:px-16">
        <a
          href={nav.brand.href}
          className="press-soft relative pb-[6px] text-[16px] font-extrabold tracking-[-0.01em] text-ink"
        >
          {nav.brand.text}
          <span className="text-accent">{nav.brand.accent}</span>
          <Squiggle className="absolute bottom-0 left-0 h-[6px] w-full" />
        </a>

        <div className="flex items-center gap-3.5">
          <ThemeToggle />

          {/* Two labels, one link. The full label overflows the bar below 349px
              and is still visibly cramped against the wordmark up to ~375px, so
              the short label covers everything narrower than that. aria-label
              keeps the accessible name "Download CV" at both widths. */}
          <a
            href={nav.cv.href}
            aria-label={nav.cv.label}
            className="press whitespace-nowrap rounded-[10px] border-2 border-ink bg-panel px-4 py-[8px] text-[13.5px] font-bold text-ink shadow-[var(--shadow-card)] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[6px_6px_0_var(--accent)]"
          >
            <span className="min-[375px]:hidden">{nav.cv.shortLabel}</span>
            <span className="hidden min-[375px]:inline">{nav.cv.label}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
