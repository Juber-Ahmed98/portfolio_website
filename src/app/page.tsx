import { ThemeToggle } from "@/components/theme-toggle";

/**
 * CP0 placeholder home page.
 * A themed shell that proves the token system + theme toggle work in both
 * light and dark. The real nav / hero / sections land in CP1+.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Placeholder header — real nav is built in CP1. */}
      <header className="mx-auto flex max-w-[1180px] items-center justify-between border-b border-line px-10 py-[22px]">
        <a
          href="#top"
          className="text-[15px] font-extrabold tracking-[-0.01em] text-ink"
        >
          juberahmed<span className="text-accent">.dev</span>
        </a>
        <ThemeToggle />
      </header>

      <main
        id="top"
        className="mx-auto max-w-[1180px] px-10 py-24"
      >
        <p className="font-mono text-[13px] text-accent">cp0 · foundation</p>
        <h1 className="mt-4 max-w-[920px] text-[clamp(44px,6.5vw,78px)] font-extrabold leading-[1.03] tracking-[-0.035em]">
          Themed shell is{" "}
          <span className="box-decoration-clone shadow-[inset_0_-14px_0_var(--hl)]">
            up and running.
          </span>
        </h1>
        <p className="mt-8 max-w-[560px] text-[17.5px] leading-[1.7] text-body [text-wrap:pretty]">
          Next.js + TypeScript + Tailwind, static-export ready, with the full
          light/dark token set wired in. Toggle the theme in the corner — no
          flash on load.
        </p>

        {/* Quick visual swatch of the core tokens, to eyeball both themes. */}
        <div className="mt-12 flex flex-wrap gap-3 font-mono text-[11px]">
          {[
            ["bg", "bg-bg"],
            ["panel", "bg-panel"],
            ["accent", "bg-accent"],
            ["line", "bg-line"],
            ["chip", "bg-chip"],
            ["wip", "bg-wip"],
          ].map(([label, cls]) => (
            <span
              key={label}
              className="flex items-center gap-2 rounded-[5px] border border-line px-3 py-2 text-muted"
            >
              <span className={`h-4 w-4 rounded-[4px] border border-line ${cls}`} />
              {label}
            </span>
          ))}
        </div>
      </main>
    </div>
  );
}
