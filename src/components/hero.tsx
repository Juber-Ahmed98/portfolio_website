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
      className="mx-auto max-w-[1180px] border-b border-line px-6 pb-[64px] pt-16 sm:px-10 sm:pb-[84px] sm:pt-24 2xl:max-w-[1320px] 2xl:px-16 2xl:pb-[104px] 2xl:pt-32"
    >
      <p className="mb-[26px] text-[clamp(15px,1.1vw,16.5px)] font-semibold text-body">
        {hero.eyebrow}
      </p>

      {/* Plus Jakarta, 800 + tight tracking — weight carries the display
          hierarchy now that the serif is gone (DESIGN.md). */}
      <h1 className="max-w-[1000px] font-display text-[clamp(42px,6vw,78px)] font-extrabold leading-[1.03] tracking-[-0.03em]">
        {hero.headingLead}{" "}
        <span className="box-decoration-clone shadow-[inset_0_-0.18em_0_var(--hl)]">
          {hero.headingHighlight}
        </span>
      </h1>

      <p className="mt-[34px] max-w-[560px] text-[clamp(17px,1.3vw,20px)] leading-[1.65] text-body [text-wrap:pretty]">
        {hero.sub}
      </p>

      {showStats && (
        <div className="mt-10 flex flex-wrap items-center gap-9 font-mono text-[13px] text-muted">
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
        className="mt-9 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[13.5px]"
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
