import { hero, jumpLinks } from "@/content/site";

type HeroProps = {
  /** Gate the mono stat row (DESIGN.md: "Stat row gated behind `showHeroStats`"). */
  showStats?: boolean;
};

/**
 * Landing hero: eyebrow → H1 (with the highlight underline on the last phrase)
 * → sub-paragraph → optional mono stat row → section jump list.
 *
 * The jump list is the set of anchors the nav gave up when it went edge-aligned
 * minimal (DESIGN.md). It's the only navigation on the page, so it renders
 * whether or not the stat row is shown.
 */
export function Hero({ showStats = true }: HeroProps) {
  return (
    <section
      id="top"
      className="mx-auto max-w-[1180px] border-b border-line px-6 pb-[64px] pt-16 sm:px-10 sm:pb-[84px] sm:pt-24"
    >
      <p className="mb-[26px] text-[15px] font-semibold text-body">
        {hero.eyebrow}
      </p>

      {/* Display serif, 400, roman. The tracking is far looser than the old
          geometric-sans setting — a serif at this size doesn't want -0.035em. */}
      <h1 className="max-w-[1000px] font-display text-[clamp(44px,7vw,84px)] leading-[1.04] tracking-[-0.02em]">
        {hero.headingLead}{" "}
        <span className="box-decoration-clone shadow-[inset_0_-0.18em_0_var(--hl)]">
          {hero.headingHighlight}
        </span>
      </h1>

      <p className="mt-[34px] max-w-[560px] text-[17.5px] leading-[1.7] text-body [text-wrap:pretty]">
        {hero.sub}
      </p>

      {showStats && (
        <div className="mt-10 flex flex-wrap items-center gap-9 font-mono text-[12.5px] text-muted">
          {hero.stats.map((stat) => (
            <span key={stat.label}>
              <span className="font-semibold text-ink">{stat.value}</span>{" "}
              {stat.label}
            </span>
          ))}
        </div>
      )}

      <nav
        aria-label="Sections"
        className="mt-9 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[13px]"
      >
        {jumpLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-muted underline decoration-line decoration-1 underline-offset-[7px] transition-colors hover:text-accent hover:decoration-accent"
          >
            {link.label.toLowerCase()}
          </a>
        ))}
      </nav>
    </section>
  );
}
