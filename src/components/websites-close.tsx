"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { ReachButtons } from "@/components/websites-sections";
import { close, reach } from "@/content/websites";

/**
 * The close of `/websites`, in the same dark room as the home page's. The
 * address is big with a copy button, for owners who'd rather paste it into
 * their own mail app. No CV, GitHub or LinkedIn here.
 */
export function WebsitesClose() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(reach.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = reach.mailto;
    }
  };

  const [user, domain] = reach.email.split("@");

  return (
    <section id="contact" data-night aria-labelledby="close-title" className="scroll-mt-16 bg-night text-night-ink">
      <div className="mx-auto w-full max-w-[1240px] px-5 pb-10 pt-20 sm:px-10 sm:pt-28 xl:px-16">
        <h2 id="close-title" className="t-poster max-w-[11ch] text-[clamp(52px,14vw,128px)]">
          {close.heading}
        </h2>
        <p className="mt-6 max-w-[44ch] text-[18px] leading-[1.6] text-night-body">{close.sub}</p>

        <div className="mt-12 border-y border-night-line py-8">
          <a
            href={reach.mailto}
            className="t-head block break-words text-[clamp(30px,8.6vw,76px)] text-night-ink hover:text-night-accent"
          >
            {user}
            <wbr />
            <span className="text-night-accent">@{domain}</span>
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <ReachButtons tone="night" />
            <button
              type="button"
              onClick={copy}
              className="tap inline-flex items-center gap-2 rounded-full border border-night-line px-5 py-3 text-[15px] font-[650] hover:border-night-muted"
            >
              {copied ? <Check size={17} aria-hidden /> : <Copy size={17} aria-hidden />}
              <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
            </button>
          </div>
        </div>

        <footer className="mt-10 text-[13.5px] text-night-muted">
          <p>{close.footer}</p>
        </footer>
      </div>
    </section>
  );
}
