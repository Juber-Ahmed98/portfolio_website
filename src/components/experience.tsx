import { SectionHeading } from "@/components/section-heading";
import { experience, sections, toolbox } from "@/content/site";

/**
 * Experience — two columns: the roles timeline (left) and the "toolbox" chip
 * cloud (right). Stacks to a single column below `md`. Content is flush with the
 * heading: the old 74px indent existed only to clear a mono index that's gone.
 */
export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="mx-auto max-w-[1180px] scroll-mt-6 border-b border-line px-6 py-[70px] sm:px-10 2xl:max-w-[1320px] 2xl:px-16"
    >
      <SectionHeading title={sections.experience.title} className="mb-9" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
        {/* Roles timeline */}
        <div className="flex flex-col gap-[26px]">
          {experience.map((role) => (
            <div key={role.title} className="flex flex-col gap-[6px]">
              <span className="font-mono text-[12px] text-muted">
                {role.date}
              </span>
              <span className="text-[clamp(17px,1.3vw,19px)] font-bold text-ink">
                {role.title}
              </span>
              <span className="text-[15px] leading-[1.65] text-body">
                {role.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Toolbox chips */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-[12px] text-muted">toolbox</span>
          <ul className="flex flex-wrap gap-2 font-mono text-[12px] text-body">
            {toolbox.map((tool) => (
              <li
                key={tool}
                className="rounded-[5px] border border-chip px-3 py-[5px]"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
