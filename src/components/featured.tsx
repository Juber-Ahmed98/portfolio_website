import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { featured, flagship, sections } from "@/content/site";

/**
 * Internal case-study routes (`/work/…`) navigate client-side via next/link;
 * external live/code links stay plain anchors with target=_blank.
 */
function ProjectLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={className}
    >
      {children}
    </a>
  );
}

/**
 * A translucent masking-tape strip for the screenshot frames (DESIGN.md,
 * "Signature elements" → Tape). Decorative only.
 */
function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-[26px] w-[84px] border-x border-dashed ${className ?? ""}`}
      style={{
        background: "color-mix(in srgb, var(--accent) 20%, transparent)",
        borderColor: "color-mix(in srgb, var(--accent) 32%, transparent)",
      }}
    />
  );
}

/**
 * Featured work — the warm-dark Jembatan flagship card (dark in BOTH themes,
 * fixed internal hex per DESIGN.md) followed by the two client-site rows
 * (Stratemize, Yoosuf Zaman). Screenshots sit in rotated, taped frames — the
 * Workshop's polaroid treatment.
 */
export function Featured() {
  return (
    <section
      id="work"
      /* Featured gets the most room of any section; the wall is the tightest.
         Uniform padding everywhere reads as a template's default rhythm. */
      className="mx-auto max-w-[1180px] scroll-mt-6 border-b-2 border-ink px-6 py-[88px] sm:px-10 2xl:max-w-[1320px] 2xl:px-16 2xl:py-[112px]"
    >
      <SectionHeading title={sections.featured.title} className="mb-10" />

      {/* Flagship — Jembatan. Warm espresso card, terracotta block shadow. */}
      <div className="mb-6 grid grid-cols-1 overflow-hidden rounded-[18px] border-2 border-flag-line bg-flag text-[#f4ead9] shadow-[6px_6px_0_var(--accent)] transition-[transform,box-shadow] duration-200 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-[3px] motion-safe:hover:shadow-[9px_9px_0_var(--accent)] md:grid-cols-[1.05fr_440px]">
        <div className="flex flex-col justify-center gap-4 px-7 py-10 sm:px-12 sm:py-[52px]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[12px] font-semibold text-[#e08a5c]">
              {flagship.label}
            </span>
            <span className="rotate-[-2deg] rounded-[6px] border-2 border-[#9dc48f] px-[10px] py-[3px] font-mono text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#9dc48f]">
              {flagship.badge}
            </span>
          </div>
          <h3 className="font-display text-[clamp(30px,3vw,44px)] font-extrabold tracking-[-0.025em]">
            {flagship.name}
          </h3>
          <p className="max-w-[460px] text-[clamp(15.5px,1.15vw,17px)] font-medium leading-[1.7] text-[#d3c4ad]">
            {flagship.blurb}
          </p>
          <div className="font-mono text-[12px] text-[#a8967c]">
            {flagship.stack}
          </div>
          <div className="mt-[10px] flex flex-wrap gap-3">
            {flagship.links.map((link) => (
              <ProjectLink
                key={link.label}
                href={link.href}
                external={"external" in link ? link.external : undefined}
                className={
                  link.kind === "live"
                    ? "inline-flex items-center gap-[6px] whitespace-nowrap rounded-[10px] bg-[#e08a5c] px-6 py-3 text-[14px] font-bold text-[#201812] transition-transform motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-0.5"
                    : "inline-flex items-center gap-[6px] whitespace-nowrap rounded-[10px] border-2 border-[#5c4a38] px-6 py-3 text-[14px] font-semibold text-[#f4ead9] transition-colors hover:border-[#e08a5c]"
                }
              >
                {link.label}
                {"external" in link && link.external && (
                  <ArrowUpRight size={15} aria-hidden strokeWidth={2.5} />
                )}
              </ProjectLink>
            ))}
          </div>
        </div>
        {/* Screenshot as a taped polaroid, tilted on the bench. */}
        <div className="grid min-h-[300px] place-items-center p-7 sm:min-h-[340px]">
          <div className="relative grid h-full min-h-[220px] w-full rotate-[1.4deg] place-items-center rounded-[6px] border-2 border-[#5c4a38] bg-[#35261c]">
            {/* The image is near the fold and is the page's focal proof —
                eager with high priority, unlike the lazy row screenshots. */}
            {flagship.image ? (
              <img
                src={flagship.image.src}
                alt={flagship.image.alt}
                fetchPriority="high"
                className="absolute inset-0 h-full w-full rounded-[4px] object-cover"
              />
            ) : (
              <span className="font-mono text-[11.5px] text-[#e08a5c]">
                {flagship.screenshotLabel}
              </span>
            )}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-[13px] left-[22px] h-[26px] w-[84px] rotate-[-6deg] border-x border-dashed border-[rgba(244,234,217,0.35)] bg-[rgba(244,234,217,0.28)]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-[13px] right-[22px] h-[26px] w-[84px] rotate-[-4deg] border-x border-dashed border-[rgba(244,234,217,0.35)] bg-[rgba(244,234,217,0.28)]"
            />
          </div>
        </div>
      </div>

      {/* Featured rows — client sites. Dashed workbench dividers between rows. */}
      {featured.map((project, i) => {
        /* Card-only client sites have exactly one destination, and the screenshot
           is the biggest thing on the row — so it links there too rather than
           looking clickable and doing nothing. */
        const liveLink = project.links.find(
          (l) => l.kind === "live" && l.href !== "#",
        );
        const Frame = liveLink ? "a" : "div";
        return (
        <div
          key={project.name}
          className={`grid grid-cols-1 items-center gap-6 md:grid-cols-[1.1fr_400px] md:gap-11 ${
            i === featured.length - 1
              ? "pb-2 pt-10"
              : "border-b-2 border-dashed border-line py-10"
          }`}
        >
          <div className="flex flex-col gap-[11px]">
            <h3 className="font-display text-[clamp(22px,2vw,28px)] font-extrabold tracking-[-0.02em] text-ink">
              {project.name}
            </h3>
            <p className="max-w-[500px] text-[clamp(15px,1.1vw,16.5px)] font-medium leading-[1.65] text-body">
              {project.blurb}
            </p>
            <div className="font-mono text-[12px] text-faint">
              {project.stack}
            </div>
            <div className="mt-1 flex flex-wrap gap-3">
              {project.links
                /* Drop live links that aren't public yet ("#") — no button that
                   jumps to top. They reappear once a real URL lands in site.ts. */
                .filter((l) => !(l.kind === "live" && l.href === "#"))
                .map((link) => (
                  <ProjectLink
                    key={link.label}
                    href={link.href}
                    external={link.external}
                    className={
                      link.kind === "live"
                        ? "inline-flex items-center gap-[6px] rounded-full border-2 border-ink bg-accent px-[20px] py-[9px] text-[14px] font-bold text-bg shadow-[var(--shadow-card)] transition-[transform,box-shadow] hover:shadow-[6px_6px_0_var(--ink)] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5"
                        : "inline-flex items-center gap-[6px] rounded-full border-2 border-ink bg-panel px-[20px] py-[9px] text-[14px] font-semibold text-ink shadow-[var(--shadow-card)] transition-[transform,box-shadow] hover:shadow-[6px_6px_0_var(--accent)] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5"
                    }
                  >
                    {link.label}
                    {link.external && <ArrowUpRight size={15} aria-hidden strokeWidth={2.5} />}
                  </ProjectLink>
                ))}
            </div>
          </div>
          {/* Screenshot frame: 2px ink border, block shadow, slight alternating
              tilt that straightens on hover. As a link it also grows the block
              shadow to terracotta, the system's "this is interactive" hover. */}
          <Frame
            {...(liveLink
              ? {
                  href: liveLink.href,
                  ...(liveLink.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {}),
                  /* Same destination as the button above it, so it stays out of
                     the tab order rather than doubling every row's stops. */
                  tabIndex: -1,
                }
              : {})}
            className={`relative block rounded-[6px] border-2 border-ink bg-panel shadow-[var(--shadow-card)] transition-[transform,box-shadow] motion-safe:hover:rotate-0 motion-safe:hover:-translate-y-[3px] ${
              liveLink ? "hover:shadow-[6px_6px_0_var(--accent)]" : ""
            } ${i % 2 === 0 ? "rotate-[-1deg]" : "rotate-[1deg]"}`}
          >
            <Tape className="-top-[13px] left-[22px] rotate-[-6deg]" />
            {project.image ? (
              <img
                src={project.image.src}
                alt={project.image.alt}
                loading="lazy"
                className="h-[210px] w-full rounded-[4px] object-cover object-top"
              />
            ) : (
              <div className="grid h-[210px] place-items-center">
                <span className="font-mono text-[11.5px] text-muted">
                  {project.screenshotLabel}
                </span>
              </div>
            )}
          </Frame>
        </div>
        );
      })}
    </section>
  );
}
