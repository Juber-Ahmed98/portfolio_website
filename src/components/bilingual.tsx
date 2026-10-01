"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import { hero } from "@/content/site";

/**
 * The H1, again, in the languages Jembatan translates into. Bengali first.
 * One button steps through the rest. It never cycles by itself: a line that
 * changed on a timer would be motion the visitor didn't ask for, and a moving
 * target for anyone reading it.
 */
export function Bilingual() {
  const [i, setI] = useState(0);
  const list = hero.translations;
  const t = list[i];
  const next = list[(i + 1) % list.length];
  const isBangla = t.lang === "bn";
  const dir = "dir" in t ? t.dir : undefined;

  return (
    <div>
      <p
        key={t.lang}
        lang={t.lang}
        dir={dir}
        aria-live="polite"
        className={`swap-in text-accent [text-wrap:balance] ${
          isBangla
            ? "font-bangla text-[clamp(21px,5.4vw,34px)] leading-[1.3]"
            : "t-head text-[clamp(26px,6.4vw,40px)] font-[750] leading-[1.02]"
        }`}
      >
        {t.text}
      </p>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[14px] text-muted">
        <span>
          {t.label}, one of {hero.translationNote}
        </span>
        <button
          type="button"
          onClick={() => setI((v) => (v + 1) % list.length)}
          className="tap inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 font-[600] text-ink hover:border-ink"
        >
          <Languages size={15} aria-hidden />
          <span>
            <span className="sr-only">Show it in </span>
            {next.label}
          </span>
        </button>
      </div>
    </div>
  );
}
