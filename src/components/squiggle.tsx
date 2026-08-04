/**
 * The Workshop's hand-drawn squiggle underline (DESIGN.md, "Signature
 * elements"). One shared path so the wobble is consistent everywhere it
 * appears — under the nav wordmark and under every section H2.
 *
 * Purely decorative: always `aria-hidden`, sized by the parent via className
 * (the viewBox stretches with `preserveAspectRatio="none"`).
 */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 8"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
    >
      <path
        d="M2 5 Q 30 1, 60 4.5 T 120 4 T 180 4.5 T 218 4"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
