import { MobileMenu } from "@/components/mobile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { nav } from "@/content/site";

/**
 * Top navigation. The mockup is static; DESIGN.md defers the sticky/static call
 * to CP1 — we go sticky (better for one-page anchor nav) with a translucent,
 * blurred backdrop so section content doesn't bleed through as it scrolls under.
 *
 * Below `sm` the anchor links collapse into a hamburger dropdown (`MobileMenu`);
 * from `sm` up they render inline.
 */
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-[22px] sm:px-10">
        <a
          href={nav.brand.href}
          className="text-[15px] font-extrabold tracking-[-0.01em] text-ink"
        >
          {nav.brand.text}
          <span className="text-accent">{nav.brand.accent}</span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-4 text-[14px] font-semibold sm:gap-[30px]">
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
            className="hidden rounded-[8px] bg-btn-bg px-5 py-[10px] text-[13.5px] font-bold text-btn-fg transition-transform hover:-translate-y-0.5 min-[400px]:inline-block"
          >
            {nav.cv.label}
          </a>

          <MobileMenu links={nav.links} />
        </nav>
      </div>
    </header>
  );
}
