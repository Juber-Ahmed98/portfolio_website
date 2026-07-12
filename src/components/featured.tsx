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
 * Featured work — the two core "proof" pieces: the dark Jembatan flagship card
 * (its own 2-col layout) followed by the two featured rows (Mission to Abs,
 * E-commerce). Screenshot areas use the mockup's diagonal-stripe placeholder
 * tiles; real captures land at CP8, case-study links (`#`) wire up in Milestone 2.
 *
 * The flagship + contact cards are dark in BOTH themes (DESIGN.md), so their
 * internal colours are the fixed dark hex values from the mockup, not tokens.
 */
export function Featured() {
  return (
    <section
      id="work"
      className="mx-auto max-w-[1180px] scroll-mt-6 border-b border-line px-6 py-[70px] sm:px-10"
    >
      <SectionHeading
        index={sections.featured.index}
        title={sections.featured.title}
        className="mb-9"
      />

      {/* Flagship — Jembatan */}
      <div className="mb-2 grid grid-cols-1 overflow-hidden rounded-[18px] border border-flag-line bg-flag text-[#f2f7f8] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[3px] hover:shadow-[0_20px_48px_rgba(11,20,24,0.22)] md:grid-cols-[1.05fr_460px]">
        <div className="flex flex-col justify-center gap-4 px-7 py-10 sm:px-12 sm:py-[52px]">
          <div className="flex items-center gap-[10px] font-mono text-[12px]">
            <span className="text-[#22c8e0]">{flagship.index}</span>
            <span className="rounded-[4px] bg-[rgba(34,200,224,0.14)] px-[9px] py-[3px] text-[#22c8e0]">
              {flagship.badge}
            </span>
          </div>
          <h3 className="text-[38px] font-extrabold tracking-[-0.025em]">
            {flagship.name}
          </h3>
          <p className="max-w-[440px] text-[15.5px] leading-[1.7] text-[#b8c8cd]">
            {flagship.blurb}
          </p>
          <div className="font-mono text-[12px] text-[#7e959c]">
            {flagship.stack}
          </div>
          <div className="mt-[10px] flex flex-wrap gap-3">
            {flagship.links.map((link, i) => (
              <ProjectLink
                key={link.label}
                href={link.href}
                external={"external" in link ? link.external : undefined}
                className={
                  i === 0
                    ? "rounded-[8px] bg-[#22c8e0] px-6 py-3 text-[14px] font-bold text-[#0b1418] transition-transform hover:-translate-y-0.5"
                    : "rounded-[8px] border-[1.5px] border-[#2c4148] px-6 py-3 text-[14px] font-semibold text-[#f2f7f8]"
                }
              >
                {link.label}
              </ProjectLink>
            ))}
          </div>
        </div>
        <div className="flex min-h-[340px] items-center justify-center bg-[repeating-linear-gradient(-45deg,rgba(34,200,224,0.10),rgba(34,200,224,0.10)_10px,rgba(34,200,224,0.03)_10px,rgba(34,200,224,0.03)_20px)]">
          <span className="rounded-[5px] border border-[#1c3a42] bg-[#0b1418] px-[11px] py-[6px] font-mono text-[11.5px] text-[#22c8e0]">
            {flagship.screenshotLabel}
          </span>
        </div>
      </div>

      {/* Featured rows */}
      {featured.map((project, i) => (
        <div
          key={project.name}
          className={`grid grid-cols-1 items-center gap-5 transition-colors hover:bg-hover md:grid-cols-[60px_1.1fr_420px] md:gap-10 ${
            i === featured.length - 1
              ? "pb-2 pt-9"
              : "border-b border-line py-9"
          }`}
        >
          <span className="font-mono text-[14px] text-muted">
            {project.index}
          </span>
          <div className="flex flex-col gap-[11px]">
            <h3 className="text-[25px] font-extrabold tracking-[-0.02em] text-ink">
              {project.name}
            </h3>
            <p className="max-w-[480px] text-[15px] leading-[1.65] text-body">
              {project.blurb}
            </p>
            <div className="font-mono text-[12px] text-muted">
              {project.stack}
            </div>
            <div className="flex gap-5 text-[14px] font-bold">
              {project.links.map((link) => {
                const isCode = link.label.startsWith("Code");
                const isCase = link.label.startsWith("Case");
                return (
                  <ProjectLink
                    key={link.label}
                    href={link.href}
                    external={link.external}
                    className={
                      isCode
                        ? "font-semibold text-muted"
                        : isCase
                          ? "text-ink"
                          : "text-accent"
                    }
                  >
                    {link.label}
                  </ProjectLink>
                );
              })}
            </div>
          </div>
          <div className="flex h-[200px] items-center justify-center rounded-[10px] border border-line bg-[repeating-linear-gradient(-45deg,var(--hover),var(--hover)_8px,var(--panel)_8px,var(--panel)_16px)]">
            <span className="rounded-[5px] border border-chip bg-panel px-[10px] py-[5px] font-mono text-[11.5px] text-muted">
              {project.screenshotLabel}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
