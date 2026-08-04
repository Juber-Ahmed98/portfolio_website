import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { currentlyBuilding, sections, wall } from "@/content/site";

/**
 * The Wall — a literal pegboard (DESIGN.md, "Signature elements"): a tinted,
 * dot-drilled container holding one tool card per build. Cards carry the
 * letterpress block shadow and lift with a slight tilt on hover. Badges are
 * stamps: live = green ink, building = dashed gold.
 *
 * Cards stay `div`s, not wrapping anchors — a nested case-study link inside a
 * card-wide anchor would be invalid HTML. Link labels carry no arrow glyphs
 * (decision log: no Unicode dingbats).
 */
export function Wall() {
  return (
    <section
      id="wall"
      /* Tighter than featured — the wall is a dense index, and the compression
         is what makes it read as "a lot of builds" rather than "a few cards". */
      className="mx-auto max-w-[1180px] scroll-mt-6 border-b-2 border-ink px-6 py-[58px] sm:px-10 2xl:max-w-[1320px] 2xl:px-16"
    >
      <SectionHeading title={sections.wall.title} className="mb-[12px]" />
      <p className="mb-[30px] max-w-[560px] text-[15px] font-medium text-muted">
        {sections.wall.sub}
      </p>

      {/* The pegboard. */}
      <div
        className="rounded-[16px] border-2 border-ink bg-hl p-4 sm:p-6"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--ink) 14%, transparent) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      >
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {wall.map((project) => (
            <div
              key={project.name}
              className="flex flex-col gap-[7px] rounded-[12px] border-2 border-ink bg-panel px-[18px] py-4 shadow-[var(--shadow-card)] transition-[transform,box-shadow] motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-[3px] motion-safe:hover:rotate-[-0.4deg] motion-safe:hover:shadow-[6px_6px_0_var(--accent)]"
            >
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-[15.5px] font-extrabold tracking-[-0.01em] text-ink">
                  {project.name}
                </span>
                <span
                  className={`shrink-0 rotate-[-2deg] rounded-[5px] px-[7px] py-[2px] font-mono text-[10px] font-semibold uppercase tracking-[0.07em] ${
                    project.live
                      ? "border-[1.5px] border-live text-live"
                      : "border-[1.5px] border-dashed border-wip text-wip"
                  }`}
                >
                  {project.badge}
                </span>
              </span>
              <span className="text-[13.5px] font-medium leading-[1.55] text-body">
                {project.desc}
              </span>
              <span className="font-mono text-[11.5px] text-faint">
                {project.tags}
              </span>
              <span className="mt-1 flex gap-4 font-mono text-[12px]">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b-2 border-line font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  code
                </a>
                {project.caseHref && (
                  <Link
                    href={project.caseHref}
                    className="border-b-2 border-line font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    case study
                  </Link>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Currently-building strip: dashed gold border, masking-tape label. */}
      <div className="mt-[22px] flex flex-wrap items-baseline gap-3 rounded-[12px] border-2 border-dashed border-wipline bg-wipbg px-5 py-4">
        <span
          className="shrink-0 rotate-[-1.5deg] px-[10px] py-[3px] font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-wip"
          style={{
            background: "color-mix(in srgb, var(--wip) 16%, transparent)",
          }}
        >
          {currentlyBuilding.label}
        </span>
        <span className="text-[13.5px] font-medium leading-[1.6] text-body">
          <span className="font-extrabold text-ink">{currentlyBuilding.name}</span>
          {": "}
          {currentlyBuilding.desc}
        </span>
      </div>
    </section>
  );
}
