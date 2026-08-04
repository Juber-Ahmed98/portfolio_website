import { hero, jumpLinks } from "@/content/site";

type HeroProps = {
  /** Gate the stat tiles (DESIGN.md: "still gated behind `showStats`"). */
  showStats?: boolean;
};

/**
 * Landing hero: kicker → H1 (with the marker-blob highlight on the last phrase)
 * → sub-paragraph → optional stat tiles → section jump list as sticker pills.
 *
 * The jump list is the set of anchors the nav gave up when it went edge-aligned
 * minimal. It's the only navigation on the page, so it renders whether or not
 * the stat row is shown.
 *
 * The entrance (hero-enter / hero-blob classes) is the site's one authored
 * motion moment — defined and reduced-motion-gated in globals.css.
 */
export function Hero({ showStats = true }: HeroProps) {
  return (
    <section
      id="top"
      className="mx-auto max-w-[1180px] border-b-2 border-ink px-6 pb-[64px] pt-16 sm:px-10 sm:pb-[84px] sm:pt-24 2xl:max-w-[1320px] 2xl:px-16 2xl:pb-[104px] 2xl:pt-32"
    >
      <p className="hero-enter mb-[26px] font-mono text-[clamp(13px,1vw,14.5px)] font-semibold text-accent">
        {hero.eyebrow}
      </p>

      <h1 className="hero-enter max-w-[1000px] font-display text-[clamp(42px,6vw,80px)] font-extrabold leading-[1.03] tracking-[-0.025em]">
        {hero.headingLead}{" "}
        <span className="relative isolate whitespace-nowrap">
          {/* Marker-stroke highlight: an irregular blob behind the text,
              swept in on load. Decorative only. */}
          <svg
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
            aria-hidden
            className="hero-blob absolute bottom-[-4%] left-[-2%] -z-10 h-[46%] w-[104%]"
          >
            <path
              d="M2 16 Q 20 8, 50 12 T 98 10 L 98 19 Q 60 16, 30 18 T 2 19 Z"
              fill="var(--hl)"
            />
          </svg>
          {hero.headingHighlight}
        </span>
      </h1>

      <p className="hero-enter-late mt-[34px] max-w-[580px] text-[clamp(17px,1.3vw,20px)] font-medium leading-[1.65] text-body [text-wrap:pretty]">
        {hero.sub}
      </p>

      {showStats && (
        <div className="mt-10 flex flex-wrap gap-3.5">
          {hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`rounded-[12px] border-2 border-ink bg-panel px-5 py-3 shadow-[var(--shadow-card)] ${
                i % 2 === 0 ? "rotate-[-0.6deg]" : "rotate-[0.5deg]"
              }`}
            >
              <div className="font-display text-[24px] font-extrabold tracking-[-0.02em] text-accent">
                {stat.value}
              </div>
              <div className="mt-0.5 font-mono text-[11px] text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <nav
        aria-label="Sections"
        className="mt-9 flex flex-wrap gap-x-2.5 gap-y-3"
      >
        {jumpLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="rounded-full border-2 border-ink bg-panel px-[18px] py-[8px] font-mono text-[12.5px] font-semibold text-ink transition-[background-color,transform] motion-safe:hover:-translate-y-0.5 motion-safe:hover:rotate-[-1deg] hover:bg-hl"
          >
            {link.label.toLowerCase()}
          </a>
        ))}
      </nav>
    </section>
  );
}
