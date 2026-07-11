import { ThemeToggle } from "@/components/theme-toggle";
import { nav } from "@/content/site";

/**
 * Top navigation. The mockup is static; DESIGN.md defers the sticky/static call
 * to CP1 — we go sticky (better for one-page anchor nav) with a translucent,
 * blurred backdrop so section content doesn't bleed through as it scrolls under.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-10 py-[22px]">
        <a
          href={nav.brand.href}
          className="text-[15px] font-extrabold tracking-[-0.01em] text-ink"
        >
          {nav.brand.text}
          <span className="text-accent">{nav.brand.accent}</span>
        </a>

        <nav className="flex items-center gap-[30px] text-[14px] font-semibold">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden text-body transition-colors hover:text-accent sm:inline"
            >
              {link.label}
            </a>
          ))}

          <ThemeToggle />

          <a
            href={nav.cv.href}
            className="rounded-[8px] bg-btn-bg px-5 py-[10px] text-[13.5px] font-bold text-btn-fg transition-transform hover:-translate-y-0.5"
          >
            {nav.cv.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
