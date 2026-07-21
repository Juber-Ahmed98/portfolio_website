/**
 * Section header: a plain display-serif H2. Nothing sits beside it.
 *
 * This used to be a mono index (`01`…) baseline-aligned with the heading. That
 * shape — small tag left, heading right — is the single most recognisable
 * generated-portfolio section head, so it's gone and shouldn't come back. If a
 * section ever needs a label, stack it above the heading in the same column
 * (DESIGN.md, "Section header pattern").
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
    <h2
      className={`font-display text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.02em] text-ink ${
        className ?? ""
      }`}
    >
      {title}
    </h2>
  );
}
