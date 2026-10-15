import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JembatanRoute } from "@/components/jembatan-route";
import { jembatan } from "@/content/site";

/**
 * The flagship, front to back, in one dark band straight under the hero. Name
 * at poster scale and the reason it exists; then the route a message takes:
 * what you say, the four layers it passes through, what the other person
 * reads, beside the real recording on loop. The scroll-scrubbed film and the
 * demo panel are on the case study, where someone who clicked in wants depth.
 *
 * One DOM for both layouts. Phones read intro, route, links; from `lg` the
 * intro and links share the left column and the route takes the right.
 */
export function Jembatan() {
  return (
    <section
      id="jembatan"
      data-night
      aria-labelledby="jembatan-title"
      className="bg-night text-night-ink"
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-5 py-14 [grid-template-areas:'intro'_'route'_'links'] sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8 lg:[grid-template-areas:'intro_route'_'links_route'] xl:px-16">
        <div className="[grid-area:intro]">
          <span className="inline-flex items-center gap-2 text-[14px] font-[600] text-night-body">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[#9dc48f] motion-safe:animate-ping motion-safe:opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-[#9dc48f]" />
            </span>
            {jembatan.status}
          </span>

          <h2
            id="jembatan-title"
            className="t-poster mt-4 text-[clamp(72px,22vw,150px)] lg:text-[clamp(88px,8.6vw,124px)]"
          >
            {jembatan.name}
          </h2>
          <p className="mt-2 text-[15px] text-night-muted">{jembatan.meaning}</p>

          <p className="mt-6 max-w-[34ch] text-[clamp(19px,5vw,23px)] font-[500] leading-[1.42] text-night-ink [text-wrap:pretty]">
            {jembatan.lede}
          </p>
          <p className="mt-4 max-w-[44ch] text-[15.5px] leading-[1.6] text-night-body [text-wrap:pretty]">
            {jembatan.also}
          </p>
        </div>

        <JembatanRoute />

        <div className="flex flex-wrap gap-3 [grid-area:links] lg:self-start">
          {jembatan.links.map((l, i) => {
            const cls = `tap inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-[15px] font-[650] ${
              i === 0 ? "bg-night-accent text-night" : "border border-night-line text-night-ink hover:border-night-muted"
            }`;
            return "external" in l && l.external ? (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={cls}>
                {l.label}
                <ArrowUpRight size={17} aria-hidden />
              </a>
            ) : (
              <Link key={l.href} href={l.href} className={cls}>
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
