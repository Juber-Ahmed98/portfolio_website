import { SectionHeading } from "@/components/section-heading";
import { currentlyBuilding, sections, wall } from "@/content/site";

/**
 * The Wall — a 3-col hairline-grid of every real build (1px gaps over a --line
 * background give the joined-cell look). Badge colour is accent for live builds,
 * --wip for works-in-progress. The dashed "currently building → habit_tracker"
 * strip sits directly beneath (how the mockup folds in the WIP content).
 */
export function Wall() {
  return (
    <section
      id="wall"
      className="mx-auto max-w-[1180px] scroll-mt-6 border-b border-line px-10 py-[70px]"
    >
      <SectionHeading
        index={sections.wall.index}
        title={sections.wall.title}
        className="mb-[10px]"
      />
      <p className="mb-[30px] ml-[74px] text-[14.5px] text-muted">
        {sections.wall.sub}
      </p>

      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[12px] border border-line bg-line">
        {wall.map((project) => (
          <a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col gap-[6px] bg-bg px-[22px] py-5 text-ink transition-colors hover:bg-hover"
          >
            <span className="flex items-baseline justify-between">
              <span className="text-[14.5px] font-bold text-ink">
                {project.name}
              </span>
              <span
                className={`font-mono text-[11px] font-semibold ${
                  project.live ? "text-accent" : "text-wip"
                }`}
              >
                {project.badge}
              </span>
            </span>
            <span className="text-[13px] leading-[1.5] text-muted">
              {project.desc}
            </span>
            <span className="font-mono text-[12px] text-faint">
              {project.tags}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-[22px] flex items-baseline gap-[10px] rounded-[10px] border border-dashed border-wipline bg-wipbg px-5 py-4">
        <span className="shrink-0 font-mono text-[12px] font-semibold text-accent">
          {currentlyBuilding.label}
        </span>
        <span className="text-[13.5px] leading-[1.6] text-body">
          <span className="font-bold">{currentlyBuilding.name}</span>
          {": "}
          {currentlyBuilding.desc}
        </span>
      </div>
    </section>
  );
}
