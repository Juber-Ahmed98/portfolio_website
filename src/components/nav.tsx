import { ThemeToggle } from "@/components/theme-toggle";
import { nav } from "@/content/site";

/**
 * Top navigation — Hallmark N9, edge-aligned minimal: wordmark at the true left
 * edge, theme toggle + CV button at the true right, and deliberately nothing in
 * between.
 *
 * The empty middle is the point. The shape this replaced — wordmark left, four
 * inline anchors centre, CTA right, full width, sticky, hairline border — is the
 * most recognisable AI-generated nav there is, and it's genre-blind: the same bar
 * appears on a bank, a barbershop, and a portfolio. The anchors now live in the
 * hero as a jump list, which is where a one-page site actually wants them. Don't
 * put links back here "to fill the space" (DESIGN.md, Components → Nav).
 *
 * With no links to collapse there's no mobile menu — the bar is two items wide at
 * every breakpoint.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-[22px] sm:px-10 2xl:max-w-[1320px] 2xl:px-16">
        <a
          href={nav.brand.href}
          className="text-[15px] font-extrabold tracking-[-0.01em] text-ink"
        >
          {nav.brand.text}
          <span className="text-accent">{nav.brand.accent}</span>
        </a>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Two labels, one link. The full label overflows the bar below 349px
              and is still visibly cramped against the wordmark up to ~375px, so
              the short label covers everything narrower than that. aria-label
              keeps the accessible name "Download CV" at both widths. */}
          <a
            href={nav.cv.href}
            aria-label={nav.cv.label}
            className="whitespace-nowrap rounded-[8px] bg-btn-bg px-5 py-[10px] text-[13.5px] font-bold text-btn-fg transition-transform hover:-translate-y-0.5"
          >
            <span className="min-[375px]:hidden">{nav.cv.shortLabel}</span>
            <span className="hidden min-[375px]:inline">{nav.cv.label}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
