"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy } from "lucide-react";
import { contact } from "@/content/site";

/**
 * The close, back in the dark room the film played in. The address is the
 * biggest thing here, because copying it into their own mail client is how
 * a lot of recruiters actually get in touch; there is a copy button for
 * exactly that, and the address itself is a mailto link.
 */
export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  const [user, domain] = contact.email.split("@");

  return (
    <section id="contact" data-night aria-labelledby="contact-title" className="bg-night text-night-ink">
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-10 pt-20 sm:px-10 sm:pt-28 xl:px-16">
        <h2 id="contact-title" className="t-poster max-w-[10ch] text-[clamp(56px,16vw,140px)]">
          {contact.heading}
        </h2>
        <p className="mt-6 max-w-[44ch] text-[18px] leading-[1.6] text-night-body">{contact.sub}</p>

        <div className="mt-12 border-y border-night-line py-8">
          <a
            href={`mailto:${contact.email}`}
            className="t-head block break-words text-[clamp(30px,8.6vw,76px)] text-night-ink hover:text-night-accent"
          >
            {user}
            <wbr />
            <span className="text-night-accent">@{domain}</span>
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copy}
              className="tap inline-flex items-center gap-2 rounded-full bg-night-accent px-5 py-3 text-[15px] font-[650] text-night"
            >
              {copied ? <Check size={17} aria-hidden /> : <Copy size={17} aria-hidden />}
              <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
            </button>
            <a
              href={contact.cv.href}
              className="tap inline-flex items-center gap-2 rounded-full border border-night-line px-5 py-3 text-[15px] font-[650] hover:border-night-muted"
            >
              <ArrowDown size={17} aria-hidden />
              {contact.cv.label}
            </a>
            {contact.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="tap inline-flex items-center gap-1.5 rounded-full border border-night-line px-5 py-3 text-[15px] font-[650] hover:border-night-muted"
              >
                {l.label}
                <ArrowUpRight size={16} aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <footer className="mt-10 flex flex-col gap-2 text-[13.5px] text-night-muted sm:flex-row sm:justify-between">
          <p>{contact.footer}</p>
          <p>{contact.colophon}</p>
        </footer>
      </div>
    </section>
  );
}
