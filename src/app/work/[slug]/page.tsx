import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Squiggle } from "@/components/squiggle";
import { caseStudies, caseStudyOrder, nav } from "@/content/site";

/**
 * Case-study template + routing.
 *
 * One static `/work/[slug]/` route per featured project, generated from the
 * `caseStudies` content module. Shared layout: hero → screenshots → narrative
 * blocks (problem → approach → …) → live + code links, with a slim back-to-home
 * header and footer. Dressed in the Workshop system (DESIGN.md): squiggle
 * wordmark, sticker-pill chips, taped polaroid screenshot tiles, terracotta
 * block headings.
 *
 * Static export: `generateStaticParams` enumerates the three slugs and
 * `dynamicParams = false` rejects anything else at build time.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyOrder.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};
  return {
    title: `${study.name} — Case study`,
    description: study.tagline,
    alternates: { canonical: `/work/${slug}/` },
    // The root file-based OG image doesn't cascade into nested routes, so point
    // case shares at it explicitly (resolved via metadataBase).
    openGraph: {
      title: `${study.name} — Case study`,
      description: study.tagline,
      url: `/work/${slug}/`,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.name} — Case study`,
      description: study.tagline,
      images: ["/opengraph-image"],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  // Skip live links that aren't public yet ("#") — don't fake a demo button.
  const links = study.links.filter((link) => link.href !== "#");

  return (
    <>
      {/* Slim case-study header — back to home, brand, theme toggle, CV.
          Edge-aligned like the home nav (DESIGN.md), so the bar doesn't change
          shape when you click through from the featured cards. */}
      <header className="sticky top-0 z-50 border-b-2 border-ink bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-[18px] sm:px-10 2xl:max-w-[1320px] 2xl:px-16">
          <Link
            href="/"
            className="press-soft -my-[11px] flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-semibold text-body hover:text-accent active:text-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            Home
          </Link>

          <div className="flex items-center gap-4 sm:gap-[30px]">
            <Link
              href="/"
              className="press-soft relative pb-[6px] text-[16px] font-extrabold tracking-[-0.01em] text-ink"
            >
              {nav.brand.text}
              <span className="text-accent">{nav.brand.accent}</span>
              <Squiggle className="absolute bottom-0 left-0 h-[6px] w-full" />
            </Link>

            <ThemeToggle />

            <a
              href={nav.cv.href}
              className="press hidden whitespace-nowrap rounded-[10px] border-2 border-ink bg-panel px-4 py-[8px] text-[13.5px] font-bold text-ink shadow-[var(--shadow-card)] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[6px_6px_0_var(--accent)] min-[400px]:inline-block"
            >
              {nav.cv.label}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-6 sm:px-10 2xl:max-w-[1320px] 2xl:px-16">
        {/* Hero */}
        <section className="border-b-2 border-ink py-[70px]">
          <p className="font-mono text-[13px] font-semibold text-accent">
            {study.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-[clamp(38px,5.6vw,66px)] font-extrabold leading-[1.05] tracking-[-0.025em] text-ink">
            {study.name}
          </h1>
          <p className="mt-4 max-w-[620px] text-[clamp(18px,1.6vw,22px)] font-semibold leading-[1.4] text-body">
            {study.tagline}
          </p>
          <p className="mt-5 max-w-[620px] text-[clamp(16px,1.15vw,17.5px)] font-medium leading-[1.7] text-body">
            {study.intro}
          </p>

          {/* Stack chips — sticker pills */}
          <ul className="mt-7 flex flex-wrap gap-[9px]">
            {study.stackChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border-2 border-chip bg-panel px-[14px] py-[6px] font-mono text-[12px] text-body transition-[border-color,transform] motion-safe:hover:rotate-[-1.5deg] hover:border-accent"
              >
                {chip}
              </li>
            ))}
          </ul>

          {/* Live + code links */}
          {links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className={
                    i === 0
                      ? "press rounded-[10px] border-2 border-accent bg-accent px-6 py-3 text-[14px] font-bold text-bg shadow-[var(--shadow-card)] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[6px_6px_0_var(--ink)]"
                      : "press rounded-[10px] border-2 border-ink bg-panel px-6 py-3 text-[14px] font-semibold text-ink shadow-[var(--shadow-card)] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[6px_6px_0_var(--accent)]"
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Screenshots — taped polaroid placeholders until real captures land. */}
        <section
          aria-label="Screenshots"
          className="border-b-2 border-ink py-[70px]"
        >
          <p className="mb-8 font-mono text-[13px] font-semibold text-accent">
            screenshots
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {study.screenshots.map((label, i) => (
              <div
                key={label}
                className={`relative grid h-[220px] place-items-center rounded-[6px] border-2 border-ink bg-panel shadow-[var(--shadow-card)] ${
                  i % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"
                } transition-transform motion-safe:hover:rotate-0 motion-safe:hover:-translate-y-[3px]`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-[13px] left-[22px] h-[26px] w-[84px] rotate-[-6deg] border-x border-dashed"
                  style={{
                    background:
                      "color-mix(in srgb, var(--accent) 20%, transparent)",
                    borderColor:
                      "color-mix(in srgb, var(--accent) 32%, transparent)",
                  }}
                />
                <span className="px-4 text-center font-mono text-[11.5px] text-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Narrative blocks — problem → approach → … */}
        <article className="border-b-2 border-ink py-[70px]">
          <div className="flex flex-col gap-14">
            {study.blocks.map((block) => (
              /* One column: label above body, never beside it (DESIGN.md). */
              <section key={block.heading} className="flex flex-col gap-3">
                <h2 className="font-mono text-[13px] font-semibold text-accent">
                  {block.heading}
                </h2>
                <div className="flex max-w-[640px] flex-col gap-4">
                  {block.body.map((para, i) => (
                    <p
                      key={i}
                      className="text-[clamp(16px,1.15vw,17.5px)] font-medium leading-[1.75] text-body [text-wrap:pretty]"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>

        {/* Back to home */}
        <div className="flex items-center justify-between gap-4 py-12">
          <Link
            href="/#work"
            className="press-soft -my-[11px] flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-semibold text-body hover:text-accent active:text-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            Back to all work
          </Link>
          {links.length > 0 && (
            <a
              href={links[0].href}
              {...(links[0].external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="press-soft -my-[11px] inline-flex min-h-[44px] items-center font-mono text-[13px] font-semibold text-accent hover:text-ink active:text-ink"
            >
              {links[0].label}
            </a>
          )}
        </div>
      </main>
    </>
  );
}
