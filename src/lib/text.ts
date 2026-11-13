/**
 * Small text helpers for copy that lives in the content modules as plain
 * strings.
 */

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Typographic apostrophes: the content modules are typed with straight ones. */
export const curl = (s: string) => s.replace(/'/g, "’");

/**
 * Body copy to HTML: escapes it, curls apostrophes, and turns `backticked`
 * spans into <code>. Apostrophes inside code stay straight.
 */
export const prose = (s: string) =>
  s
    .split("`")
    .map((part, i) => (i % 2 ? `<code>${escapeHtml(part)}</code>` : curl(escapeHtml(part))))
    .join("");

/** "the problem" → "The problem". */
export const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** A heading used as a small label: curled, and without its closing full stop. */
export const label = (s: string) => curl(s).replace(/\.$/, "");
