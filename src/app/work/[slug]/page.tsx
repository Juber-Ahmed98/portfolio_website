import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { caseStudies, caseStudyOrder, nav } from "@/content/site";

/**
 * Case-study template + routing (CP5).
 *
 * One static `/work/[slug]/` route per featured project, generated from the
 * `caseStudies` content module. Shared layout: hero → screenshots → narrative
 * blocks (problem → approach → …) → live + code links, with a slim back-to-home
 * header and footer. Deep per-project narratives land in CP6/CP7 — this ships the
 * reusable shell and wires the links both ways.
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
      <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-[22px] sm:px-10 2xl:max-w-[1320px] 2xl:px-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-[13px] font-semibold text-body transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} aria-hidden />
            Home
          </Link>

          <div className="flex items-center gap-4 sm:gap-[30px]">
            <Link
              href="/"
              className="text-[15px] font-extrabold tracking-[-0.01em] text-ink"
            >
              {nav.brand.text}
              <span className="text-accent">{nav.brand.accent}</span>
            </Link>

            <ThemeToggle />

            <a
              href={nav.cv.href}
              className="hidden whitespace-nowrap rounded-[8px] bg-btn-bg px-5 py-[10px] text-[13.5px] font-bold text-btn-fg transition-transform hover:-translate-y-0.5 min-[400px]:inline-block"
            >
              {nav.cv.label}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1180px] px-6 sm:px-10 2xl:max-w-[1320px] 2xl:px-16">
        {/* Hero */}
        <section className="border-b border-line py-[70px]">
          <p className="font-mono text-[13px] text-accent">{study.eyebrow}</p>
          <h1 className="mt-4 font-display text-[clamp(38px,5.6vw,66px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink">
            {study.name}
          </h1>
          <p className="mt-4 max-w-[620px] text-[clamp(18px,1.6vw,22px)] font-semibold leading-[1.4] text-body">
            {study.tagline}
          </p>
          <p className="mt-5 max-w-[620px] text-[clamp(16px,1.15vw,17.5px)] leading-[1.7] text-body">
            {study.intro}
          </p>

          {/* Stack chips */}
          <ul className="mt-7 flex flex-wrap gap-[10px]">
            {study.stackChips.map((chip) => (
              <li
                key={chip}
                className="rounded-[5px] border border-chip px-[11px] py-[6px] font-mono text-[12px] text-muted"
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
                      ? "rounded-[8px] bg-btn-bg px-6 py-3 text-[14px] font-bold text-btn-fg transition-transform hover:-translate-y-0.5"
                      : "rounded-[8px] border-[1.5px] border-line px-6 py-3 text-[14px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
                  }
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Screenshots — placeholder tiles until CP8. */}
        <section
          aria-label="Screenshots"
          className="border-b border-line py-[70px]"
        >
          <p className="mb-6 font-mono text-[13px] text-accent">screenshots</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {study.screenshots.map((label) => (
              <div
                key={label}
                className="flex h-[220px] items-center justify-center rounded-[10px] border border-line bg-[repeating-linear-gradient(-45deg,var(--hover),var(--hover)_8px,var(--panel)_8px,var(--panel)_16px)]"
              >
                <span className="rounded-[5px] border border-chip bg-panel px-[10px] py-[5px] font-mono text-[11.5px] text-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Narrative blocks — problem → approach → … */}
        <article className="border-b border-line py-[70px]">
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
                      className="text-[clamp(16px,1.15vw,17.5px)] leading-[1.75] text-body [text-wrap:pretty]"
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
            className="flex items-center gap-2 font-mono text-[13px] font-semibold text-body transition-colors hover:text-accent"
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
              className="font-mono text-[13px] font-semibold text-accent transition-colors hover:text-ink"
            >
              {links[0].label}
            </a>
          )}
        </div>
      </main>
    </>
  );
}
