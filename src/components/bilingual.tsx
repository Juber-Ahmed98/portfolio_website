"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import { hero, type Translation } from "@/content/site";

const lineClass = (t: Translation) =>
  t.lang === "bn"
    ? "font-bangla text-[clamp(21px,5.4vw,34px)] leading-[1.3]"
    : "t-head text-[clamp(26px,6.4vw,40px)] font-[750] leading-[1.02]";

/**
 * The H1, again, in the languages the keyboard further down translates into.
 * Bengali first. One button steps through the rest. It never cycles by
 * itself: a line that changed on a timer would be motion the visitor didn't
 * ask for, and a moving target for anyone reading it.
 *
 * The line sits in a cell sized by every language at once (invisible copies
 * stacked underneath), so switching never changes the block's height and
 * the button stays under the thumb that just tapped it.
 */
export function Bilingual() {
  const [i, setI] = useState(0);
  const list: readonly Translation[] = hero.translations;
  const t = list[i];
  const next = list[(i + 1) % list.length];

  return (
    <div>
      <div className="grid">
        {list.map((s) => (
          <p
            key={s.lang}
            aria-hidden
            lang={s.lang}
            dir={s.dir}
            className={`invisible [grid-area:1/1] [text-wrap:balance] ${lineClass(s)}`}
          >
            {s.text}
          </p>
        ))}
        <p
          key={t.lang}
          lang={t.lang}
          dir={t.dir}
          aria-live="polite"
          className={`swap-in text-accent [grid-area:1/1] [text-wrap:balance] ${lineClass(t)}`}
        >
          {t.text}
        </p>
      </div>

      <button
        type="button"
        onClick={() => setI((v) => (v + 1) % list.length)}
        className="tap mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-[14.5px] font-[600] text-ink hover:border-ink"
      >
        <Languages size={16} aria-hidden />
        <span>
          <span className="sr-only">Show it in </span>
          {next.label}
        </span>
      </button>
    </div>
  );
}
