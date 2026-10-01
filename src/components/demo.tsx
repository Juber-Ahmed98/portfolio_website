"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { demo, type DemoTarget } from "@/content/site";

type Lang = DemoTarget["code"];
type Status = "idle" | "streaming" | "done" | "error";

/** Split into grapheme clusters, so a Bengali conjunct never renders half-built. */
function graphemes(text: string, lang: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const seg = new Intl.Segmenter(lang, { granularity: "grapheme" });
    return Array.from(seg.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

/**
 * The keyboard's review strip, on the page. Pick a message and a language and
 * the translation streams in the way it does in the app.
 *
 * Two modes, one UI:
 * - `demo.live` (session 2, once the landing Worker's demo proxy exists): free
 *   text, POSTed to the proxy with `Accept: text/event-stream`. The proxy
 *   passes the API's own wire straight through: `{"delta"}` frames are shown
 *   as they land, `{"done","translation"}` is authoritative and replaces them,
 *   `{"error"}` ends it.
 * - canned (now): three sample messages played through the same streaming
 *   path, and the panel says plainly that they are samples.
 *
 * It plays once by itself when it first scrolls into view, so someone being
 * shown the site on a phone sees it work without being asked to tap.
 */
export function Demo() {
  const [sample, setSample] = useState(0);
  const [lang, setLang] = useState<Lang>("bn");
  const [text, setText] = useState("");
  const [out, setOut] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const timer = useRef<number | null>(null);
  const abort = useRef<AbortController | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  const target = demo.targets.find((t) => t.code === lang)!;
  const source = demo.live ? text : demo.samples[sample].en;

  const stop = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    abort.current?.abort();
    abort.current = null;
  };

  const playCanned = useCallback((s: number, l: Lang) => {
    stop();
    const full = demo.samples[s].out[l];
    const parts = graphemes(full, l);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setError("");
    if (reduce) {
      setOut(full);
      setStatus("done");
      return;
    }
    setOut("");
    setStatus("streaming");
    let i = 0;
    const step = () => {
      // Two to four clusters a beat, roughly what a token is.
      i = Math.min(parts.length, i + 2 + Math.floor(Math.random() * 3));
      setOut(parts.slice(0, i).join(""));
      if (i < parts.length) timer.current = window.setTimeout(step, 38 + Math.random() * 40);
      else setStatus("done");
    };
    // The beat a real request spends reaching the edge.
    timer.current = window.setTimeout(step, 420);
  }, []);

  const playLive = useCallback(async (input: string, l: Lang) => {
    stop();
    const trimmed = input.trim().slice(0, demo.maxChars);
    if (!trimmed) return;
    const ctrl = new AbortController();
    abort.current = ctrl;
    setOut("");
    setError("");
    setStatus("streaming");
    try {
      const res = await fetch(demo.endpoint, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "text/event-stream" },
        body: JSON.stringify({ text: trimmed, target: l }),
        signal: ctrl.signal,
      });
      if (res.status === 429) throw new Error("That's the demo's limit for now. Try again in a minute.");
      if (!res.ok || !res.body) throw new Error("Couldn't reach the Worker just now.");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let cut: number;
        while ((cut = buf.indexOf("\n\n")) !== -1) {
          const frame = buf.slice(0, cut);
          buf = buf.slice(cut + 2);
          const line = frame.split("\n").find((x) => x.startsWith("data: "));
          if (!line) continue;
          const msg = JSON.parse(line.slice(6));
          if (msg.delta) {
            acc += msg.delta;
            setOut(acc);
          } else if (msg.done) {
            setOut(msg.translation ?? acc);
            setStatus("done");
          } else if (msg.error) {
            throw new Error("The translation stopped part way. Try again.");
          }
        }
      }
      setStatus((s) => (s === "streaming" ? "done" : s));
    } catch (e) {
      if (ctrl.signal.aborted) return;
      setStatus("error");
      setError(e instanceof Error ? e.message : "Something went wrong.");
    }
  }, []);

  // Play the first sample once, the first time the panel is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el || demo.live) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;
          playCanned(0, "bn");
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [playCanned]);

  const run = (s: number, l: Lang) => {
    if (demo.live) void playLive(text, l);
    else playCanned(s, l);
  };

  return (
    <div
      ref={root}
      className="rounded-[26px] border border-night-line bg-night-raise p-4 text-night-ink sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-[650]">Try the keyboard</p>
        <span className="t-data rounded-full border border-night-line px-2.5 py-1 text-[11px] text-night-muted">
          {demo.live ? "live · on the app's Worker" : "sample messages"}
        </span>
      </div>

      {/* What you said */}
      <div className="mt-5">
        <p className="t-data text-[11px] uppercase tracking-[0.08em] text-night-muted">What you said</p>
        {demo.live ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(sample, lang);
            }}
            className="mt-2 flex gap-2"
          >
            <label className="sr-only" htmlFor="demo-input">
              Message in English
            </label>
            <input
              id="demo-input"
              value={text}
              maxLength={demo.maxChars}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message in English"
              className="min-w-0 flex-1 rounded-full border border-night-line bg-night px-4 py-3 text-[16px] text-night-ink placeholder:text-night-muted focus:border-night-accent focus:outline-none"
            />
            <button
              type="submit"
              className="tap rounded-full bg-night-accent px-5 text-[15px] font-[650] text-night"
            >
              Translate
            </button>
          </form>
        ) : (
          <div className="mt-2 flex flex-col gap-2" role="radiogroup" aria-label="Message">
            {demo.samples.map((s, i) => (
              <button
                key={s.en}
                type="button"
                role="radio"
                aria-checked={sample === i}
                onClick={() => {
                  setSample(i);
                  run(i, lang);
                }}
                className={`tap rounded-[14px] border px-4 py-3 text-left text-[15.5px] leading-[1.4] ${
                  sample === i
                    ? "border-night-accent bg-night text-night-ink"
                    : "border-night-line text-night-body hover:border-night-muted"
                }`}
              >
                {s.en}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Target language */}
      <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Translate into">
        {demo.targets.map((t) => (
          <button
            key={t.code}
            type="button"
            role="radio"
            aria-checked={lang === t.code}
            onClick={() => {
              setLang(t.code);
              run(sample, t.code);
            }}
            className={`tap rounded-full px-3.5 py-2 text-[14px] font-[600] ${
              lang === t.code
                ? "bg-night-ink text-night"
                : "border border-night-line text-night-body hover:border-night-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* The review strip, as the app labels it */}
      <div className="mt-5 rounded-[18px] bg-night p-4 sm:p-5" aria-live="polite" aria-busy={status === "streaming"}>
        <p className="t-data text-[11px] font-[600] uppercase tracking-[0.1em] text-night-accent">
          {status === "streaming" ? "Translating" : "Review before sending"}
        </p>
        <p className="mt-1.5 text-[13.5px] text-night-muted">
          <span className="sr-only">Original: </span>
          {source || "…"}
        </p>
        <p
          lang={lang}
          dir={target.dir}
          className={`mt-3 min-h-[2.6em] text-[clamp(21px,5.4vw,26px)] font-[600] leading-[1.3] text-night-ink ${
            lang === "bn" ? "font-bangla" : ""
          }`}
        >
          {status === "error" ? (
            <span className="text-[16px] font-[500] text-night-body">{error}</span>
          ) : (
            <>
              {out}
              {status === "streaming" && (
                <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-night-accent" />
              )}
            </>
          )}
        </p>
      </div>

      <p className="mt-4 text-[13px] leading-[1.5] text-night-muted">
        {demo.live
          ? "Runs on the same Worker the app uses, capped per visitor. Nothing you type is stored."
          : "Sample messages written to show the flow. The live version, on the same Worker the app uses, is on its way."}
      </p>
    </div>
  );
}
