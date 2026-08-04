import { Squiggle } from "@/components/squiggle";

/**
 * Section header: a display H2 with the Workshop squiggle drawn underneath.
 * Nothing sits beside it.
 *
 * The heading used to carry a mono index (`01`…) baseline-aligned to its left.
 * That shape — small tag left, heading right — is the single most recognisable
 * generated-portfolio section head, so it's gone and shouldn't come back. If a
 * section ever needs a label, stack it above the heading in the same column
 * (DESIGN.md, decision log).
 *
 * Callers control the surrounding spacing via `className`.
 */
export function SectionHeading({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      <h2 className="font-display text-[clamp(28px,3vw,42px)] font-extrabold tracking-[-0.02em] text-ink">
        {title}
      </h2>
      <Squiggle className="mt-2 h-[8px] w-full max-w-[220px]" />
    </div>
  );
}
