import { dayJob } from "@/content/site";

/**
 * The professional backbone, set as plainly as a CV but at poster scale: the
 * employer's name is the heading. Tools are a sentence each, not a chip wall.
 */
export function DayJob() {
  return (
    <section id="experience" aria-labelledby="dayjob-title" className="scroll-mt-16 bg-surface">
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20 xl:px-16">
        <div>
          <h2 id="dayjob-title" className="t-poster max-w-[9ch] text-[clamp(52px,14vw,120px)]">
            {dayJob.heading}
          </h2>
          <p className="mt-6 max-w-[40ch] text-[18px] leading-[1.6] text-body [text-wrap:pretty]">
            {dayJob.lede}
          </p>
        </div>

        <div className="lg:pt-4">
          <ol className="border-t border-ink">
            {dayJob.roles.map((r) => (
              <li key={r.title} className="border-b border-line py-7">
                <p className="t-data text-accent">{r.dates}</p>
                <h3 className="t-head mt-2 text-[clamp(28px,7vw,36px)]">{r.title}</h3>
                <p className="mt-3 text-[16.5px] leading-[1.65] text-body [text-wrap:pretty]">{r.desc}</p>
              </li>
            ))}
          </ol>
          <dl className="mt-10 grid gap-5">
            {dayJob.tools.map((t) => (
              <div key={t.k}>
                <dt className="text-[14px] font-[650] text-ink">{t.k}</dt>
                <dd className="mt-1 text-[16px] leading-[1.6] text-body">{t.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
