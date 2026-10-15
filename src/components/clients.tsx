import { ArrowUpRight } from "lucide-react";
import { Phone } from "@/components/phone";
import { clients } from "@/content/site";

/**
 * Paid work for Birmingham businesses. Each site is shown the way its own
 * visitors mostly see it, on a phone, and its whole page slides past inside
 * the frame as you scroll by (CSS scroll-driven animation, compositor-only,
 * no JS; it rests on the top of the page where unsupported or under reduced
 * motion). The desktop layout sits behind the phone at every width, so both
 * halves of the responsive work are on show, phones included.
 */
export function Clients() {
  return (
    <section id="work" aria-labelledby="clients-title" className="scroll-mt-16">
      <div className="mx-auto w-full max-w-[1240px] px-5 pt-14 sm:px-10 sm:pt-20 xl:px-16">
        <h2 id="clients-title" className="t-poster max-w-[12ch] text-[clamp(52px,14vw,120px)]">
          Sites for Birmingham businesses.
        </h2>
        <p className="mt-5 max-w-[40ch] text-[17px] leading-[1.6] text-body sm:text-[18px]">
          Paid work for real clients, live today, shown with their permission.
        </p>
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-10 xl:px-16">
        {clients.map((c, i) => (
          <article
            key={c.name}
            aria-labelledby={`client-${i}`}
            className="grid items-center gap-10 border-b border-line py-12 last:border-b-0 sm:py-20 lg:grid-cols-2 lg:gap-16"
          >
            {/* Media */}
            <ClientMedia url={c.url} host={c.host} shots={c.shots} flip={i % 2 === 1} />

            {/* Words */}
            <div className={i % 2 ? "lg:order-1" : ""}>
              <p className="text-[15px] font-[550] text-muted">{c.who}</p>
              <h3 id={`client-${i}`} className="t-head mt-2 text-[clamp(40px,10vw,64px)]">
                {c.name}
              </h3>
              <p className="mt-5 max-w-[50ch] text-[17px] leading-[1.65] text-body [text-wrap:pretty]">
                {c.summary}
              </p>
              <ul className="mt-7 grid grid-cols-2 border-t border-line">
                {c.facts.map((f, j) => (
                  <li
                    key={f}
                    className={`border-b border-line py-3.5 pr-3 text-[14.5px] font-[550] leading-[1.35] text-ink ${
                      j % 2 ? "border-l pl-4" : ""
                    }`}
                  >
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="tap mt-8 inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-[15px] font-[650] text-bg"
              >
                Visit {c.host}
                <ArrowUpRight size={17} aria-hidden />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * The media half of a client row: the desktop capture in a browser frame, with
 * the phone overlapping its lower corner (on the side away from the words on
 * desktop). On phones it's the same picture scaled down, and the margin below
 * keeps the overhanging phone clear of the words. Shared with `/websites`.
 */
export function ClientMedia({
  url,
  host,
  shots,
  flip,
}: {
  url: string;
  host: string;
  shots: { phone: string; desktop: string; alt: string };
  flip: boolean;
}) {
  return (
    <div className={`relative mb-6 lg:mb-0 ${flip ? "lg:order-2" : ""}`}>
      <div aria-hidden className="overflow-clip rounded-[10px] border border-line-strong bg-surface shadow-[var(--lift)] lg:rounded-[14px]">
        <div className="flex h-7 items-center justify-center border-b border-line lg:h-9">
          <span className="t-data rounded-full bg-bg px-3 py-0.5 text-[11px] text-muted">{host}</span>
        </div>
        <img src={shots.desktop} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        className={`tap absolute -bottom-8 block w-[38%] lg:-bottom-12 lg:w-[34%] ${
          flip ? "-left-2 lg:-left-6" : "-right-2 lg:-right-6"
        }`}
      >
        <Phone screenClassName="scroll-frame">
          <img src={shots.phone} alt={shots.alt} loading="lazy" className="scroll-shot pan-y" />
        </Phone>
      </a>
    </div>
  );
}
