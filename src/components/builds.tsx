import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { builds } from "@/content/site";

/**
 * Everything else, as an index rather than a grid of cards: one row per
 * build, ruled like a contents page. The count in the heading is derived, and
 * every row has somewhere to go.
 */
export function Builds() {
  return (
    <section id="builds" aria-labelledby="builds-title" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-10 sm:py-28 xl:px-16">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2 id="builds-title" className="t-poster text-[clamp(52px,14vw,120px)]">
            More builds.
          </h2>
          <p className="max-w-[44ch] text-[17px] leading-[1.6] text-body sm:text-[18px] lg:justify-self-end">
            {builds.length} more since January, from client sites to the apps I use every day.
          </p>
        </div>

        {/* On desktop every row is a subgrid of the list, so the description
            and links columns line up down the page whatever each row holds. */}
        <ol className="mt-12 border-t border-ink sm:mt-16 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)_auto] lg:gap-x-8">
          {builds.map((b) => (
            <li
              key={b.name}
              className="grid gap-x-8 gap-y-2 border-b border-line py-6 sm:py-7 lg:col-span-3 lg:grid-cols-subgrid lg:items-baseline"
            >
              <div className="flex items-baseline justify-between gap-4 lg:block">
                <h3 className="t-head text-[clamp(30px,8vw,40px)]">{b.name}</h3>
                <span className="t-data shrink-0 text-muted lg:mt-2 lg:block">
                  {b.started}
                  <span className={b.status === "live" ? "text-live" : "text-wip"}> · {b.status}</span>
                </span>
              </div>
              <div>
                <p className="text-[16px] leading-[1.55] text-body [text-wrap:pretty]">{b.what}</p>
                <p className="t-data mt-2 text-muted">{b.stack}</p>
              </div>
              <div className="-mx-2 mt-1 flex flex-wrap lg:mt-0 lg:justify-end">
                {b.links.map((l) =>
                  l.external ? (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="tap group inline-flex min-h-11 items-center gap-1 px-2 text-[15px] font-[650] text-ink"
                    >
                      <span className="border-b-2 border-accent/60 group-hover:border-accent">{l.label}</span>
                      <ArrowUpRight size={15} aria-hidden className="text-accent" />
                    </a>
                  ) : (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="tap group inline-flex min-h-11 items-center px-2 text-[15px] font-[650] text-ink"
                    >
                      <span className="border-b-2 border-accent/60 group-hover:border-accent">{l.label}</span>
                    </Link>
                  ),
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
