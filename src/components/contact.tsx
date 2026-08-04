import { contact } from "@/content/site";

/**
 * Contact — the warm-dark CTA card ("Next on the wall: / your product."),
 * primary Download CV button plus Email / GitHub / LinkedIn, then the mono
 * footer line.
 *
 * Like the flagship card, this card is dark in BOTH themes (DESIGN.md): the
 * shell uses `bg-flag`/`border-flag-line` and its internal colours are the fixed
 * warm-dark hex, not theme tokens. The second heading line takes the terracotta.
 * The footer below the card sits on the page and uses normal tokens.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="mx-auto max-w-[1180px] scroll-mt-6 px-6 pb-10 pt-[70px] sm:px-10 2xl:max-w-[1320px] 2xl:px-16"
    >
      <div className="flex flex-col flex-wrap items-start gap-12 rounded-[18px] border-2 border-flag-line bg-flag px-7 py-12 text-[#f4ead9] shadow-[6px_6px_0_var(--accent)] transition-[transform,box-shadow] duration-200 motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-[3px] motion-safe:hover:shadow-[9px_9px_0_var(--accent)] sm:flex-row sm:items-center sm:justify-between sm:px-14 sm:py-16">
        <h2 className="font-display text-[clamp(30px,3.6vw,46px)] font-extrabold leading-[1.1] tracking-[-0.025em]">
          {contact.heading[0]}
          <br />
          <span className="text-[#e08a5c]">{contact.heading[1]}</span>
        </h2>

        {/* One wrapped row of four buttons beside the H2 (the signed comp's
            balance — not a stacked column). */}
        <div className="flex max-w-[420px] shrink-0 flex-wrap items-center gap-3">
          <a
            href={contact.cv.href}
            className="whitespace-nowrap rounded-[10px] bg-[#e08a5c] px-6 py-3 text-[14px] font-extrabold text-[#201812] transition-transform motion-safe:hover:-translate-x-px motion-safe:hover:-translate-y-0.5"
          >
            {contact.cv.label}
          </a>
          {contact.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="rounded-[10px] border-2 border-[#5c4a38] px-5 py-3 text-[13.5px] font-semibold text-[#f4ead9] transition-colors hover:border-[#e08a5c]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-[26px] flex flex-col gap-2 font-mono text-[12px] text-muted sm:flex-row sm:justify-between">
        <span>{contact.footer.left}</span>
        <span>{contact.footer.right}</span>
      </footer>
    </section>
  );
}
