import { hero } from "@/content/site";

type HeroProps = {
  /** Gate the mono stat row (DESIGN.md: "Stat row gated behind `showHeroStats`"). */
  showStats?: boolean;
};

/**
 * Landing hero: eyebrow → H1 (with the highlight underline on the last phrase)
 * → sub-paragraph → optional mono stat row.
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

      <h1 className="max-w-[920px] text-[clamp(44px,6.5vw,78px)] font-extrabold leading-[1.03] tracking-[-0.035em]">
        {hero.headingLead}{" "}
        <span className="box-decoration-clone shadow-[inset_0_-14px_0_var(--hl)]">
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
          <a
            href={hero.cta.href}
            className="font-sans text-[14px] font-semibold text-accent"
          >
            {hero.cta.label}
          </a>
        </div>
      )}
    </section>
  );
}
