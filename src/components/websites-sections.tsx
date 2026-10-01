import { ArrowDown, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { ClientMedia } from "@/components/clients";
import { Phone } from "@/components/phone";
import {
  about,
  apps,
  clientSites,
  howItWorks,
  quotes,
  reach,
  services,
  websitesHero,
  whatsappHref,
  work,
} from "@/content/websites";

/**
 * The sections of `/websites`, in the order a business owner needs them: what
 * I do, proof, what clients say, what I can build, how it works, the bigger
 * work, who I am. Same type, colours and phone frames as the home page; no
 * pinned film, so it scrolls quickly. Copy lives in `src/content/websites.ts`.
 */

const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-10 xl:px-16";
const sectionTitle = "t-poster max-w-[12ch] text-[clamp(52px,14vw,120px)]";

/** WhatsApp first when there's a number (it's how local businesses talk), email otherwise. */
export function ReachButtons({ tone = "paper" }: { tone?: "paper" | "night" }) {
  const primary =
    tone === "night" ? "bg-night-accent text-night" : "bg-accent text-on-accent";
  const secondary =
    tone === "night"
      ? "border border-night-line hover:border-night-muted"
      : "border border-line-strong text-ink hover:border-ink";
  return (
    <>
      {whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={`tap inline-flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-[650] ${primary}`}
        >
          <MessageCircle size={17} aria-hidden />
          Message me on WhatsApp
        </a>
      )}
      <a
        href={reach.mailto}
        className={`tap inline-flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-[650] ${
          whatsappHref ? secondary : primary
        }`}
      >
        <Mail size={17} aria-hidden />
        Email me
      </a>
    </>
  );
}

export function WebsitesHero() {
  return (
    <section id="top" className={`${wrap} pb-14 pt-[84px] sm:pb-20 sm:pt-[132px] xl:pt-[150px]`}>
      <p className="mb-4 text-[16px] leading-[1.35] sm:mb-7 sm:text-[17px]">
        <span className="block font-[700] text-ink">{websitesHero.name}</span>
        <span className="block font-[550] text-body">{websitesHero.role}</span>
      </p>

      <h1 className="t-poster max-w-[14ch] text-[clamp(56px,16vw,140px)] text-ink lg:max-w-none lg:text-[min(8.4vw,128px)]">
        {websitesHero.headingLead} <span className="lg:block">{websitesHero.headingTail}</span>
      </h1>

      <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.55] text-body sm:mt-9 sm:text-[19px] [text-wrap:pretty]">
        {websitesHero.sub}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <ReachButtons />
        <a
          href="#work"
          className="tap inline-flex min-h-11 items-center gap-1.5 px-2 text-[15px] font-[650] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
        >
          {websitesHero.seeWork}
          <ArrowDown size={16} aria-hidden />
        </a>
      </div>

      <p className="mt-12 border-t border-line pt-5 text-[14.5px] leading-[1.6] text-muted sm:mt-16">
        <span className="font-[650] text-body">Recent clients: </span>
        {clientSites.map((c, i) => (
          <span key={c.name}>
            {i > 0 && " · "}
            <span className="whitespace-nowrap">{c.name}</span>
          </span>
        ))}
      </p>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-16">
      <div className={`${wrap} pt-12 sm:pt-16`}>
        <h2 id="work-title" className={sectionTitle}>
          {work.heading}
        </h2>
        <p className="mt-5 max-w-[40ch] text-[17px] leading-[1.6] text-body sm:text-[18px]">{work.intro}</p>
      </div>

      <div className={wrap}>
        {clientSites.map((c, i) => (
          <article
            key={c.name}
            aria-labelledby={`site-${i}`}
            className="grid items-center gap-10 border-b border-line py-16 last:border-b-0 sm:py-24 lg:grid-cols-2 lg:gap-16"
          >
            <ClientMedia url={c.url} host={c.host} shots={c.shots} flip={i % 2 === 1} />

            <div className={i % 2 ? "lg:order-1" : ""}>
              <p className="text-[15px] font-[550] text-muted">{c.who}</p>
              <h3 id={`site-${i}`} className="t-head mt-2 text-[clamp(40px,10vw,64px)]">
                {c.name}
              </h3>
              <p className="mt-5 max-w-[50ch] text-[17px] leading-[1.65] text-body [text-wrap:pretty]">{c.summary}</p>
              <ul className="mt-7 grid grid-cols-2 border-t border-line">
                {c.points.map((p, j) => (
                  <li
                    key={p}
                    className={`border-b border-line py-3.5 pr-3 text-[14.5px] font-[550] leading-[1.35] text-ink ${
                      j % 2 ? "border-l pl-4" : ""
                    }`}
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[13.5px] leading-[1.5] text-muted">{c.tech}</p>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="tap mt-7 inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-3 text-[15px] font-[650] text-bg"
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

/** Hidden until there's a real quote; never ships a placeholder. */
export function Quotes() {
  if (quotes.length === 0) return null;
  return (
    <section aria-labelledby="quotes-title" className="border-t border-line">
      <div className={`${wrap} py-20 sm:py-28`}>
        <h2 id="quotes-title" className={sectionTitle}>
          What clients say.
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {quotes.map((q) => (
            <figure key={q.name} className="border-t border-ink pt-7">
              <blockquote className="t-head text-[clamp(28px,6.4vw,40px)] leading-[1.05] text-ink [text-wrap:pretty]">
                “{q.text}”
              </blockquote>
              <figcaption className="mt-5 text-[15px] leading-[1.5] text-body">
                <span className="font-[650] text-ink">{q.name}</span>, {q.role}, {q.business}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section aria-labelledby="services-title" className="bg-surface">
      <div className={`${wrap} grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.2fr] lg:gap-20`}>
        <h2 id="services-title" className={`${sectionTitle} max-w-[10ch]`}>
          {services.heading}
        </h2>
        <ul className="border-t border-ink lg:mt-3">
          {services.items.map((s) => (
            <li key={s.title} className="border-b border-line py-6">
              <h3 className="t-head text-[clamp(28px,7vw,36px)]">{s.title}</h3>
              <p className="mt-2.5 max-w-[48ch] text-[16.5px] leading-[1.6] text-body [text-wrap:pretty]">{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title">
      <div className={`${wrap} py-20 sm:py-28`}>
        <h2 id="how-title" className={sectionTitle}>
          {howItWorks.heading}
        </h2>
        <ol className="mt-12 grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((s, i) => (
            <li
              key={s.label}
              className={`border-b border-line py-7 sm:pr-6 ${i % 2 ? "sm:border-l sm:pl-6" : ""} ${
                i > 0 ? "lg:border-l lg:pl-6" : ""
              }`}
            >
              <h3 className="t-head text-[clamp(32px,8vw,44px)] text-accent">{s.label}</h3>
              <p className="mt-3 text-[16.5px] leading-[1.6] text-body [text-wrap:pretty]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Apps() {
  return (
    <section aria-labelledby="apps-title" className="border-t border-line">
      <div className={`${wrap} grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.3fr_1fr] lg:gap-20`}>
        <div>
          <h2 id="apps-title" className={sectionTitle}>
            {apps.heading}
          </h2>
          <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.65] text-body sm:text-[18px] [text-wrap:pretty]">
            {apps.body}
          </p>
          <a
            href={apps.link.href}
            className="tap mt-7 inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-3 text-[15px] font-[650] text-ink hover:border-ink"
          >
            {apps.link.label}
            <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>
        <div className="mx-auto w-[min(60vw,260px)]">
          <Phone>
            <img src={apps.still.src} alt={apps.still.alt} loading="lazy" />
          </Phone>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section aria-labelledby="about-title" className="bg-surface">
      <div className={`${wrap} grid gap-10 py-20 sm:py-28 lg:grid-cols-[1fr_1.2fr] lg:gap-20`}>
        <h2 id="about-title" className={`${sectionTitle} max-w-[10ch]`}>
          {about.heading}
        </h2>
        <p className="max-w-[52ch] text-[17px] leading-[1.7] text-body sm:text-[18px] lg:mt-3 [text-wrap:pretty]">
          {about.body}
        </p>
      </div>
    </section>
  );
}
