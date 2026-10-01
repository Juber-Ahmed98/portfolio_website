import { ArrowDown, Mail } from "lucide-react";
import { Bilingual } from "@/components/bilingual";
import { contact, hero } from "@/content/site";

/**
 * The poster. A claim at the condensed end of Mona Sans, the same claim in
 * Bengali under it, and the two things a recruiter came for (email, CV) within
 * thumb reach. The phone that rises under it belongs to the film below: the
 * hero hands straight over to it, with no section break between.
 *
 * Nothing here animates. On this site the type never moves; the planes do.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto w-full max-w-[1240px] px-5 pb-8 pt-[84px] sm:px-10 sm:pb-14 sm:pt-[132px] xl:px-16 xl:pt-[150px]"
    >
      <p className="mb-4 text-[15px] font-[550] text-muted sm:mb-7 sm:text-[16px]">
        {hero.name} · {hero.place}
      </p>

      {/* From lg up the break sits at the comma, on purpose: two lines, the
          claim then the reach. Below that the words wrap where they fall. */}
      <h1 className="t-poster max-w-[13ch] text-[clamp(64px,19vw,156px)] text-ink lg:max-w-none lg:text-[min(9.6vw,148px)]">
        {hero.headingLead} <span className="lg:block">{hero.headingTail}</span>
      </h1>

      <div className="mt-5 grid gap-6 sm:mt-9 lg:mt-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Bilingual />
        <div>
          <p className="max-w-[46ch] text-[17px] leading-[1.55] text-body sm:text-[18px] [text-wrap:pretty]">
            {hero.sub}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${contact.email}`}
              className="tap inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[15px] font-[650] text-on-accent"
            >
              <Mail size={17} aria-hidden />
              Email me
            </a>
            <a
              href={contact.cv.href}
              className="tap inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-[15px] font-[650] text-ink hover:border-ink"
            >
              <ArrowDown size={17} aria-hidden />
              {contact.cv.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
