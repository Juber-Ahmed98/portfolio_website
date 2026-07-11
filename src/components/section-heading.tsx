/**
 * Section header pattern from DESIGN.md: a mono index (accent) baseline-aligned
 * with the H2, gap 14px. Callers control the surrounding spacing via `className`.
 */
export function SectionHeading({
  index,
  title,
  className,
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline gap-[14px] ${className ?? ""}`}>
      <span className="font-mono text-[13px] text-accent">{index}</span>
      <h2 className="text-[26px] font-extrabold tracking-[-0.02em] text-ink">
        {title}
      </h2>
    </div>
  );
}
