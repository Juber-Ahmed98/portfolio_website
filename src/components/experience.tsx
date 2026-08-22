import { SectionHeading } from "@/components/section-heading";
import { experience, sections, toolbox } from "@/content/site";

/**
 * Experience — two columns: role cards (left, bordered + block-shadowed like
 * everything else on the bench) and the "toolbox" sticker-pill cloud (right).
 * Stacks to a single column below `md`.
 */
export function Experience() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className="mx-auto max-w-[1180px] scroll-mt-6 border-b-2 border-ink px-6 py-[70px] sm:px-10 2xl:max-w-[1320px] 2xl:px-16"
    >
      <SectionHeading title={sections.experience.title} className="mb-10" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.25fr_0.75fr] md:gap-16">
        {/* Role cards */}
        <div className="flex flex-col gap-5">
          {experience.map((role) => (
            <div
              key={role.title}
              className="flex flex-col gap-[7px] rounded-[12px] border-2 border-ink bg-panel px-6 py-5 shadow-[var(--shadow-card)]"
            >
              <span className="font-mono text-[12px] font-semibold text-accent">
                {role.date}
              </span>
              <span className="font-display text-[clamp(17px,1.3vw,19px)] font-extrabold tracking-[-0.015em] text-ink">
                {role.title}
              </span>
              <span className="text-[14.5px] font-medium leading-[1.65] text-body">
                {role.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Toolbox sticker pills */}
        <div className="flex flex-col gap-3.5">
          <span className="font-mono text-[12px] font-semibold text-muted">
            toolbox
          </span>
          <ul className="flex flex-wrap gap-[9px] font-mono text-[12px] text-body">
            {toolbox.map((tool) => (
              <li
                key={tool}
                className="rounded-full border-2 border-chip bg-panel px-[14px] py-[6px] transition-[border-color,translate,rotate] motion-safe:hover:rotate-[-1.5deg] hover:border-accent"
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
