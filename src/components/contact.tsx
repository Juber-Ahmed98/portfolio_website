import { contact } from "@/content/site";

/**
 * Contact — the dark CTA card ("Next on the wall: / your product."), primary
 * Download CV button plus Email / GitHub / LinkedIn, then the mono footer line.
 *
 * Like the flagship card, this card is dark in BOTH themes (DESIGN.md): the shell
 * uses `bg-flag`/`border-flag-line` (dark in both) and its internal colours are
 * the fixed dark hex from the mockup, not theme tokens. The footer below the card
 * sits on the page and uses normal tokens.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="mx-auto max-w-[1180px] scroll-mt-6 px-6 pb-10 pt-[70px] sm:px-10"
    >
      <div className="flex flex-col flex-wrap items-start gap-12 rounded-[20px] border border-flag-line bg-flag px-7 py-12 text-[#f2f7f8] sm:flex-row sm:items-center sm:justify-between sm:px-14 sm:py-16">
        <h2 className="font-display text-[36px] leading-[1.12] tracking-[-0.02em] sm:text-[46px]">
          {contact.heading[0]}
          <br />
          {contact.heading[1]}
        </h2>

        <div className="flex shrink-0 flex-col gap-3">
          <a
            href={contact.cv.href}
            className="whitespace-nowrap rounded-[9px] bg-[#22c8e0] px-[30px] py-[15px] text-center text-[15px] font-extrabold text-[#0b1418] transition-transform hover:-translate-y-0.5"
          >
            {contact.cv.label}
          </a>
          <div className="flex flex-wrap gap-[10px]">
            {contact.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="rounded-[9px] border-[1.5px] border-[#2c4148] px-5 py-3 text-[13.5px] font-semibold text-[#f2f7f8] transition-transform hover:-translate-y-0.5"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-[26px] flex flex-col gap-2 font-mono text-[12px] text-muted sm:flex-row sm:justify-between">
        <span>{contact.footer.left}</span>
        <span>{contact.footer.right}</span>
      </footer>
    </section>
  );
}
