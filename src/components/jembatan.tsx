import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Demo } from "@/components/demo";
import { jembatan } from "@/content/site";

/**
 * The product behind the film, still in the dark room. Name at poster scale,
 * the reason it exists in one line, then a spec sheet a developer can skim in
 * five seconds, and the demo beside it.
 */
export function Jembatan() {
  return (
    <section
      id="jembatan"
      data-night
      aria-labelledby="jembatan-title"
      className="bg-night text-night-ink"
    >
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 pb-20 pt-6 sm:px-10 sm:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-16 xl:px-16">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2 text-[14px] font-[600] text-night-body">
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[#9dc48f] motion-safe:animate-ping motion-safe:opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-[#9dc48f]" />
              </span>
              {jembatan.status}
            </span>
          </div>

          <h2 id="jembatan-title" className="t-poster mt-5 text-[clamp(72px,22vw,168px)]">
            {jembatan.name}
          </h2>
          <p className="mt-3 text-[15px] text-night-muted">{jembatan.meaning}</p>

          <p className="mt-8 max-w-[34ch] text-[clamp(20px,5.2vw,26px)] font-[500] leading-[1.4] text-night-ink [text-wrap:pretty]">
            {jembatan.lede}
          </p>

          <dl className="mt-10 border-t border-night-line">
            {jembatan.parts.map((p) => (
              <div
                key={p.k}
                className="grid grid-cols-[84px_1fr] gap-4 border-b border-night-line py-4 sm:grid-cols-[110px_1fr]"
              >
                <dt className="t-data pt-[3px] text-night-accent">{p.k}</dt>
                <dd className="text-[15.5px] leading-[1.55] text-night-body">{p.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {jembatan.links.map((l, i) =>
              "external" in l && l.external ? (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`tap inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-[15px] font-[650] ${
                    i === 0 ? "bg-night-accent text-night" : "border border-night-line text-night-ink hover:border-night-muted"
                  }`}
                >
                  {l.label}
                  <ArrowUpRight size={17} aria-hidden />
                </a>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="tap inline-flex items-center rounded-full border border-night-line px-5 py-3 text-[15px] font-[650] text-night-ink hover:border-night-muted"
                >
                  {l.label}
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="lg:pt-24">
          <Demo />
        </div>
      </div>
    </section>
  );
}
