/**
 * Single source of truth for the site's content.
 *
 * Extracted from `design-reference/home-mockup.html` (the approved mockup) and
 * `CLAUDE.md` (the brief). Sections render from this module so copy never lives
 * inline in components. CP1 wires up `nav` + `hero`; the remaining exports are
 * consumed as later checkpoints build out their sections.
 */

// ── Nav ──────────────────────────────────────────────────────────────────────

export type NavLink = { label: string; href: string };

export const nav = {
  /** Logo splits so `.dev` can take the accent colour. */
  brand: { text: "juberahmed", accent: ".dev", href: "#top" },
  links: [
    { label: "Work", href: "#work" },
    { label: "Wall", href: "#wall" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavLink[],
  /** Real CV PDF lives at public/cv.pdf. */
  cv: { label: "Download CV", href: "/cv.pdf" },
} as const;

// ── Hero ─────────────────────────────────────────────────────────────────────

export type HeroStat = { value: string; label: string };

export const hero = {
  eyebrow: "Mohammed Juber Ahmed — frontend developer, Birmingham UK",
  /** H1 renders as `${headingLead} <highlight>${headingHighlight}</highlight>`. */
  headingLead: "I build web products —",
  headingHighlight: "front to back.",
  sub: "Three years shipping Wolseley's high-traffic B2B e-commerce frontend by day. By night I ship my own — a live AI translation keyboard with its own API, and counting.",
  /** Gated behind the Hero `showStats` prop (DESIGN.md). */
  stats: [
    { value: "3+", label: "yrs shipping at scale" },
    { value: "6", label: "builds on the wall" },
    { value: "1", label: "API in production" },
  ] satisfies HeroStat[],
  cta: { label: "See the work ↓", href: "#work" },
} as const;

// ── Section headers ──────────────────────────────────────────────────────────
// Mono index + H2 pairs shown at the top of each section (DESIGN.md pattern).

export const sections = {
  featured: { index: "01", title: "Featured work" },
  wall: {
    index: "02",
    title: "The wall — 6 builds and counting",
    sub: "Every real build, big or small. The habit, not just the highlights.",
  },
  experience: { index: "03", title: "Experience" },
  /** Contact's H2 lives in `contact.heading`; only the mono index is shared here. */
  contact: { index: "04" },
} as const;

// ── Featured work ────────────────────────────────────────────────────────────

export type FeaturedLink = { label: string; href: string; external?: boolean };

export type FeaturedProject = {
  index: string; // "/01"
  name: string;
  slug: string; // case-study route: `/work/${slug}/`
  blurb: string;
  stack: string; // mono stack line
  links: FeaturedLink[];
  screenshotLabel: string;
};

/** The dark hero card. Kept separate from the two rows — it has its own layout. */
export const flagship = {
  index: "/01 · flagship",
  badge: "live in production",
  name: "Jembatan",
  /** Case-study route: `/work/${slug}/`. */
  slug: "jembatan",
  blurb:
    "Android IME keyboard for high-quality, natural-tone translation — text, voice, and clipboard messages — powered by gpt-5-mini on its own Cloudflare Worker API, with on-device speech. Not just a UI: the whole product — backend, onboarding UX, branding, roadmap.",
  stack: "kotlin · cloudflare-workers · openai-api",
  links: [
    { label: "Live demo ↗", href: "https://jembatan.juberahmed.dev/", external: true },
    { label: "Case study →", href: "/work/jembatan/" },
    { label: "Code ↗", href: "https://github.com/Juber-Ahmed98/Jembatan-app", external: true },
  ],
  screenshotLabel: "jembatan app screenshot",
} as const;

export const featured: FeaturedProject[] = [
  {
    index: "/02",
    name: "Mission to Abs",
    slug: "mission-to-abs",
    blurb:
      "The frontend work you're actually hiring for — motion design, live charts, lean state — in a demo you can open right now.",
    stack: "react · framer-motion · recharts · zustand",
    links: [
      { label: "Live demo ↗", href: "#", external: true },
      { label: "Case study →", href: "/work/mission-to-abs/" },
      { label: "Code ↗", href: "https://github.com/Juber-Ahmed98/mission_to_abs_app", external: true },
    ],
    screenshotLabel: "charts screenshot",
  },
  {
    index: "/03",
    name: "E-commerce Store",
    slug: "ecommerce-store",
    blurb:
      "A standalone store I built front to back — React UI plus a real Express + Postgres backend — teaching myself the backend my frontend day job doesn't touch.",
    stack: "react · tailwind · react-router",
    links: [
      { label: "Live demo ↗", href: "#", external: true },
      { label: "Case study →", href: "/work/ecommerce-store/" },
      { label: "Code ↗", href: "https://github.com/Juber-Ahmed98/ecommerce_store", external: true },
    ],
    screenshotLabel: "storefront screenshot",
  },
];

// ── Case studies ─────────────────────────────────────────────────────────────
// Drives the `/work/[slug]/` routes (CP5). One entry per featured project, keyed
// by slug. This is the CP5 *template* content — honest starter drafts; the deep
// narratives land in CP6 (Jembatan) and CP7 (Mission to Abs, E-commerce).
//
// Screenshots are placeholder tile labels until real captures arrive at CP8.
// Links reuse the home-page values; a live link of "#" means "not public yet" and
// is skipped rather than faked (the "don't fake it" rule).

export type CaseStudyBlock = {
  /** Mono sub-heading, e.g. "the problem". */
  heading: string;
  /** One or more paragraphs of body copy. */
  body: string[];
};

export type CaseStudyLink = { label: string; href: string; external?: boolean };

export type CaseStudy = {
  slug: string;
  /** Mono eyebrow above the title, e.g. "case study · flagship". */
  eyebrow: string;
  name: string;
  /** One-line summary under the title. */
  tagline: string;
  /** Lead paragraph. */
  intro: string;
  stack: string; // mono stack line (mirrors the featured card)
  stackChips: string[]; // toolbox-style pills
  /** Narrative blocks rendered in order: problem → approach → … */
  blocks: CaseStudyBlock[];
  /** Placeholder screenshot tile labels (real captures at CP8). */
  screenshots: string[];
  /** Live + code links. Live entries with href "#" are skipped (not yet public). */
  links: CaseStudyLink[];
};

/** Build order — also drives `generateStaticParams` for the static export. */
export const caseStudyOrder = ["jembatan", "mission-to-abs", "ecommerce-store"] as const;

export const caseStudies: Record<string, CaseStudy> = {
  jembatan: {
    slug: "jembatan",
    eyebrow: "case study · flagship",
    name: "Jembatan",
    tagline: "An Android translation keyboard with its own production API.",
    intro:
      "Jembatan is a native Android keyboard that turns what you say into a natural, colloquial message in someone else's language — and drops it straight into WhatsApp. Hold the mic and speak, on-device speech recognition catches it, a Cloudflare Worker cleans it up and translates it, and the result lands in the field you're already typing in. It's the whole product: the Kotlin app, the backend, the AI prompt, onboarding, branding, billing, and a roadmap.",
    stack: "kotlin · cloudflare-workers · openai-api",
    stackChips: [
      "Kotlin",
      "Jetpack Compose",
      "Android IME",
      "Cloudflare Workers",
      "OpenAI gpt-5-mini",
      "On-device STT",
      "RevenueCat",
    ],
    blocks: [
      {
        heading: "the problem",
        body: [
          "I'm marrying into a family that doesn't speak my language. Every message to my fiancée's family in Indonesia meant leaving WhatsApp, pasting into Google Translate, copying the stiff word-for-word result back, and hoping it didn't read as cold or clumsy. Doing that mid-conversation, every day, kills the conversation.",
          "The fix had to live where you already type. So Jembatan is an Android keyboard: hold the mic, say it in English, and a natural, colloquial Indonesian version drops into the field you're in — ready to send.",
        ],
      },
      {
        heading: "the loop",
        body: [
          "The core loop is one gesture. Hold the keyboard's mic and speak → on-device speech recognition → the text goes to my Cloudflare Worker, which translates and cleans it up → the result streams back into a review strip you can edit → tap to insert, then hit the app's own send. It works in any app's text box — WhatsApp first — with nothing to integrate on their end.",
          "Two-way falls out for free: both people install it, and each phone only ever translates its own outgoing speech — English out on mine, Indonesian out on theirs. Typing and clipboard text translate the same way, and there's an in-person mode for talking face to face. Translation is free up to a daily cap; a Pro tier adds cloud speech recognition and more languages.",
        ],
      },
      {
        heading: "the backend",
        body: [
          "The whole thing runs on a single Cloudflare Worker exposing `POST /api/v1/translate`. The model API key lives only as a Worker secret — never in the APK, never in the repo — so the app can't leak it and I control cost and abuse centrally: input capped around 2,000 characters, output bounded, per-IP rate limits, no message text ever stored.",
          "It's built around swappable seams. The translation model (OpenAI `gpt-5-mini` today) is one config file plus a thin adapter; the speech engine (on-device now, server-side transcription for Pro) swaps the same way; adding a language is a registry entry, not surgery.",
        ],
      },
      {
        heading: "the translation",
        body: [
          "The part that makes it not-Google-Translate is the prompt. Jembatan treats your speech as messy spoken intent — filler words, false starts, run-ons — and rewrites it into a message that reads exactly as a native speaker would text their own family: everyday register, natural particles, the speaker's own tone kept intact (blunt stays blunt, affectionate stays affectionate), never stiff textbook grammar.",
          "The system prompt is kept byte-stable so the provider prefix-caches it. And because the input is untrusted speech-to-text, the instructions and the message ride in separate roles — so a stray “ignore the above” in what someone says can't hijack the translation. Register (casual / neutral / formal) is tuned per language.",
        ],
      },
      {
        heading: "making it feel instant",
        body: [
          "Speed is the product. The biggest win already shipped is streaming: the translation lands token-by-token in the review strip as the model writes it, so you're reading the answer before it's finished instead of watching a spinner.",
          "Behind that, I measured real first-token latency across the model's reasoning-effort settings — sub-second at the lowest, climbing steeply as effort rises — to pick the setting where colloquial quality holds without the wait. Shaving the rest (warming the recognizer, preconnecting to the edge before you finish speaking) is the current focus.",
        ],
      },
      {
        heading: "the keyboard",
        body: [
          "A translating keyboard is worthless if it's a bad keyboard, and keyboard quality stays free. Several build waves put in a genuinely full stack: a custom-drawn QWERTY with per-key press feedback, a geometric swipe decoder, bilingual spatial-plus-context autocorrect and prediction, and an offline accuracy harness to measure it.",
          "It's also where trust is won or lost. Android warns that any keyboard “can collect all the text you type, including passwords.” Jembatan's answer is in the code: it detects password and card fields and switches off learning, suggestions, and buffering entirely — it only ever sends the text you explicitly ask it to translate.",
        ],
      },
      {
        heading: "earning trust",
        body: [
          "The hardest problems weren't the translation — they were the product edges. A keyboard can't even raise its own microphone permission, and enabling it trips Android's scariest-sounding warning. So I built the onboarding around exactly those cliffs: a magic-first “Playground” lets you feel the speak-clean-translate loop inside the app before any scary ask, and a just-in-time coach highlights the mic and translate keys the first time the keyboard appears in a real chat.",
          "The privacy stance is concrete, not a promise: message text is never stored and never used to train anything, and logs hold non-content metadata only.",
        ],
      },
      {
        heading: "design & brand",
        body: [
          "Jembatan means “bridge” in Indonesian, and the whole identity serves one feeling — a calm, trustworthy line to someone you love on the other side of a language. The surface is quiet: around 90% warm neutrals (paper and clay-charcoal) with a single terracotta accent that only shows up where it means something — the mic, the primary action, active states.",
          "The typeface is Plus Jakarta Sans, Jakarta's officially commissioned typeface — a deliberate nod to the Indonesian side of the bridge. The app icon is a “two voices” mark, and motion only ever communicates state: a live waveform while listening, a gold sweep while translating. Fully light- and dark-themed.",
        ],
      },
      {
        heading: "where it is now",
        body: [
          "The Worker is deployed and the app is code-complete through the monetization wave: on-device and cloud translation, five languages (English, Indonesian, Bengali, Arabic, Spanish), and Pro billing wired through RevenueCat and the Play Console. It's in real daily use by exactly the people it was built for, running in a closed Play test.",
          "Ahead: a final keyboard-craft polish pass, a public soft launch, and iOS once its keyboard-extension limits are validated. It's deliberately paced — I'd rather ship it right for the family already using it than rush it to a store.",
        ],
      },
    ],
    screenshots: [
      "keyboard translating in WhatsApp",
      "hold-to-talk voice",
      "review & edit strip",
      "in-person mode",
    ],
    links: [
      { label: "Live demo ↗", href: "https://jembatan.juberahmed.dev/", external: true },
      { label: "Code ↗", href: "https://github.com/Juber-Ahmed98/Jembatan-app", external: true },
    ],
  },
  "mission-to-abs": {
    slug: "mission-to-abs",
    eyebrow: "case study",
    name: "Mission to Abs",
    tagline: "A body-recomposition PWA I use daily — motion, live charts, and one genuinely hard integration.",
    intro:
      "Mission to Abs is a private, offline-first PWA I built to run my own 15-week body-recomposition mission: open it daily, log weight, diet, and exercise, take a weekly photo and waist measurement, and watch progress walk along a 105-day path. It's in real daily use — and it doubles as the clearest proof of the frontend work hiring managers actually care about: purposeful motion, live data-viz, lean state, and one integration that was much harder than it looks — syncing a Bluetooth smart scale through a backend proxy.",
    stack: "react · framer-motion · recharts · zustand",
    stackChips: [
      "React 18",
      "TypeScript",
      "Vite",
      "Zustand",
      "Recharts",
      "Framer Motion",
      "IndexedDB",
      "PWA (offline)",
    ],
    blocks: [
      {
        heading: "the problem",
        body: [
          "Most fitness apps are either a spreadsheet or a hype machine. I wanted the opposite: a calm daily ritual for a fixed 15-week mission — bright but never loud, a moment you look forward to rather than a chore. It ships zero workouts and zero diet rules on purpose. The app is the witness, not the coach: you bring the plan, it keeps you honest.",
          "It's also a deliberate portfolio piece. A CV can claim \"strong React and animation skills\" — an app you can open and poke at proves it. So none of it is faked: it's the tool I actually use every day, with my own data, not a demo wired to sample JSON.",
        ],
      },
      {
        heading: "the daily loop",
        body: [
          "The loop is one screen: today's weight, diet, and exercise, each logged with a slide-to-confirm that only fires on release. Marking a failure is exactly as easy as marking a win — the app rewards accuracy, not just green days — and a planned rest day counts without penalty. Every action is reversible: each confirm drops an undo toast, and anything destructive is two-step.",
          "That symmetry matters more than it looks. Honest logging is what makes everything downstream mean anything, so the daily loop is built to remove every reason to fudge it.",
        ],
      },
      {
        heading: "progress as a journey",
        body: [
          "Instead of a heatmap of squares, progress is a walk along a 105-day path split into five named stages — Foundation, Build, Push, Refine, Reveal. Logging earns XP and levels, a streak builds, and crossing a stage boundary plays a deliberate transition. The gamification is generous but quiet: earned satisfaction from motion and visible XP, never confetti or exclamation marks.",
          "Recharts renders the weight trend, clipped to the mission window so pre-start synced days don't drag the line sideways. Weekly waist measurements and progress photos capture the change a scale misses, and Framer Motion carries the level-ups and page transitions — used to communicate state, not to decorate.",
        ],
      },
      {
        heading: "syncing a real smart scale",
        body: [
          "The feature I'm proudest of is the least visible. I weigh in on a Renpho Bluetooth scale, and the app pulls those readings automatically. The catch: there's no official API, and a scale password can never touch a static frontend. So the PWA talks to a small serverless backend proxy that holds the credentials — the client only ever sends a user-pasted sync token as a header.",
          "Synced readings then flow through the exact same merge path as a manual CSV import, with a \"manual wins\" rule so a hand-typed weight is never silently overwritten by a sync. The bug that ate the most time was timezone drift: Renpho's wall-clock field sits ahead of the device, which tipped an evening weigh-in onto the next calendar day — landing one day late on the home screen and one day early on the chart. Dating each reading from its true UTC timestamp instead fixed both at the boundary.",
        ],
      },
      {
        heading: "offline-first & state",
        body: [
          "State is a single, schema-versioned Zustand store: entries and settings live in localStorage, photo blobs in IndexedDB, so the whole app is usable with no connection — which a daily-habit tool has to be. It's an installable PWA with a self-hosted font (no third-party CDN on first paint) and lazy-split routes to stay inside a tight bundle budget.",
          "There's also a top-level error boundary that, if anything throws, shows a reload button and a one-tap \"export my data\" escape hatch. Silently losing someone's 15 weeks of logs was never an acceptable failure mode.",
        ],
      },
    ],
    screenshots: [
      "daily dashboard — day N",
      "the 105-day journey",
      "weight & body-fat charts",
      "weekly progress photos",
    ],
    links: [
      { label: "Live demo ↗", href: "#", external: true },
      { label: "Code ↗", href: "https://github.com/Juber-Ahmed98/mission_to_abs_app", external: true },
    ],
  },
  "ecommerce-store": {
    slug: "ecommerce-store",
    eyebrow: "case study",
    name: "E-commerce Store",
    tagline: "A standalone storefront I built front to back — to teach myself the backend my day job doesn't touch.",
    intro:
      "A complete e-commerce store I built from scratch and entirely on my own — a React frontend with a real Express + PostgreSQL backend behind it. My role at Wolseley is frontend-only, so I built this to learn the other half: how a product catalogue, user accounts, and authentication actually fit together end to end. E-commerce is the domain I know best from the day job, which made it the natural thing to build front to back — but every line here is my own.",
    stack: "react · tailwind · react-router",
    stackChips: [
      "React 19",
      "Tailwind CSS v4",
      "React Router v7",
      "Context API",
      "Express",
      "PostgreSQL",
      "JWT auth",
    ],
    blocks: [
      {
        heading: "the problem",
        body: [
          "My day job at Wolseley is frontend-only. I ship and A/B-test a high-traffic B2B storefront, but I don't touch what happens once a request leaves the browser — and I wanted to close that gap. So I built a complete store of my own, front to back: browse products, open a detail page, add to a basket, register, sign in, check out, with a backend I wrote myself behind all of it.",
        ],
      },
      {
        heading: "the storefront",
        body: [
          "A responsive product grid that reflows from mobile to desktop, product-detail pages, and client-side routing with React Router. It's React 19 and Tailwind v4 — the current versions — so the setup mirrors what a modern frontend team actually ships, not a tutorial from a few years ago.",
        ],
      },
      {
        heading: "the cart",
        body: [
          "The basket is a React Context that persists to localStorage, so a refresh never loses it. Add, remove, and per-item quantities are all handled in one place, with the basket count wired into the nav and a checkout flow on the far end.",
        ],
      },
      {
        heading: "going full-stack",
        body: [
          "It didn't stop at the frontend. Behind it sits a small Express + PostgreSQL backend that serves the product catalogue and handles accounts — registration and login with bcrypt-hashed passwords and JWT sessions. It isn't a production e-commerce platform and I don't pretend it is; it's a from-scratch build that walks the full request path, from a React form to a hashed row in Postgres and back.",
        ],
      },
      {
        heading: "why it's here",
        body: [
          "This is where I push past the day job. Wolseley gave me the frontend instincts — responsive layout, sensible component structure, state that stays predictable as pages grow — and this project is me teaching myself the backend to match, on my own time. It's honest about what it is: a personal learning build, not a production platform. But it's a complete one, and it's entirely mine.",
        ],
      },
    ],
    screenshots: [
      "product grid",
      "product detail",
      "basket & quantities",
      "checkout & sign-in",
    ],
    links: [
      { label: "Live demo ↗", href: "#", external: true },
      { label: "Code ↗", href: "https://github.com/Juber-Ahmed98/ecommerce_store", external: true },
    ],
  },
};

// ── The Wall ─────────────────────────────────────────────────────────────────

export type WallProject = {
  name: string;
  badge: string; // "live ↗" | "building"
  live: boolean; // controls badge colour: accent vs --wip
  desc: string;
  tags: string;
  link: string;
};

export const wall: WallProject[] = [
  { name: "Jembatan-app", badge: "live ↗", live: true, desc: "AI translation keyboard + Worker API", tags: "kotlin · workers", link: "https://github.com/Juber-Ahmed98/Jembatan-app" },
  { name: "mission_to_abs_app", badge: "live ↗", live: true, desc: "Animated fitness tracker + data-viz", tags: "react · zustand", link: "https://github.com/Juber-Ahmed98/mission_to_abs_app" },
  { name: "ecommerce_store", badge: "live ↗", live: true, desc: "Full-stack storefront — React UI, Express + Postgres backend", tags: "react · express · postgres", link: "https://github.com/Juber-Ahmed98/ecommerce_store" },
  { name: "habit_tracker", badge: "building", live: false, desc: "Modern-stack PWA shell", tags: "next16 · react19 · ts", link: "https://github.com/Juber-Ahmed98/habit_tracker" },
  { name: "quran-just-one-verse", badge: "building", live: false, desc: "One verse a day", tags: "js", link: "https://github.com/Juber-Ahmed98/quran-just-one-verse" },
  { name: "Qibla_Compass", badge: "building", live: false, desc: "Sensor-driven qibla finder", tags: "js · sensors", link: "https://github.com/Juber-Ahmed98/Qibla_Compass" },
];

/** The dashed "currently building" strip beneath the wall. */
export const currentlyBuilding = {
  label: "currently building →",
  name: "habit_tracker",
  desc: "architecture-first PWA — Next.js 16, React 19, strict TS, Tailwind v4, installable, dual-theme. Features landing next. No demo button until it earns one.",
} as const;

// ── Experience ───────────────────────────────────────────────────────────────

export type Role = { date: string; title: string; desc: string };

export const experience: Role[] = [
  {
    date: "2024.08 — now",
    title: "Digital Developer · Wolseley",
    desc: "High-traffic B2B e-commerce frontend. Responsive, accessible pages shipped through A/B and multivariate tests — merchandising badges, promos, seasonal lightboxes — keeping what moved the numbers and killing what didn't.",
  },
  {
    date: "2022.12 — 2024.08",
    title: "Apprentice Developer · Wolseley",
    desc: "Earned the L3 Software Development Technician qualification (QA) while shipping to production.",
  },
];

export const toolbox: string[] = [
  "html/css/sass",
  "javascript",
  "react",
  "typescript",
  "a/b testing",
  "monetate",
  "python",
  "c#",
  "sql",
  "cloudflare",
];

// ── Contact ──────────────────────────────────────────────────────────────────

export type ContactLink = { label: string; href: string; external?: boolean };

export const contact = {
  heading: ["Next on the wall:", "your product."], // rendered on two lines
  cv: { label: "Download CV (PDF)", href: "/cv.pdf" }, // real CV at public/cv.pdf
  links: [
    { label: "Email", href: "mailto:mohammed.juber.ahmed@gmail.com" },
    { label: "GitHub ↗", href: "https://github.com/Juber-Ahmed98", external: true },
    { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/mohammed-juber-ahmed/", external: true },
  ] satisfies ContactLink[],
  footer: {
    left: "© 2026 mohammed juber ahmed",
    right: "birmingham, uk · juberahmed.dev",
  },
} as const;
