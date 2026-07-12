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
  eyebrow: "Mohammed Juber Ahmed · frontend developer, Birmingham UK",
  /** H1 renders as `${headingLead} <highlight>${headingHighlight}</highlight>`. */
  headingLead: "I build web products,",
  headingHighlight: "front to back.",
  sub: "Three years shipping Wolseley's high-traffic B2B e-commerce frontend by day. On my own time I build and ship my own products, including a live AI translation keyboard with its own API.",
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
    title: "The wall: 6 builds and counting",
    sub: "Every real build, big or small, from finished products to works in progress.",
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
    "An Android keyboard that translates text, voice, and clipboard messages into natural, colloquial language, powered by gpt-5-mini on its own Cloudflare Worker API with on-device speech. I built the whole product: the app, the backend, onboarding, branding, and the roadmap.",
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
      "Motion design, live charts, and lean state management in a polished React app you can open and try right now.",
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
      "A store I built front to back: a React UI on top of an Express and Postgres backend I wrote to teach myself the server side my day job doesn't cover.",
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
      "Jembatan is a native Android keyboard that turns what you say into a natural, colloquial message in someone else's language and drops it straight into WhatsApp. Hold the mic and speak. On-device speech recognition catches it, a Cloudflare Worker cleans it up and translates it, and the result lands in the field you're already typing in. I built every part of it: the Kotlin app, the backend, the AI prompt, onboarding, branding, billing, and the roadmap.",
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
          "My dad doesn't read or speak English well, so every message I send him has to be in Bengali. I can't type Bengali comfortably, which left me with voice notes or a clunky workaround: leave WhatsApp, paste into Google Translate, fix the stiff output, copy it back. Doing that in the middle of a conversation every day meant most conversations just didn't happen.",
          "The fix had to live where you already type. So Jembatan is an Android keyboard. Hold the mic, say it in English, and a natural, colloquial Bengali version drops into the field you're in, ready to send.",
        ],
      },
      {
        heading: "the loop",
        body: [
          "The core loop is one gesture. Hold the keyboard's mic and speak. On-device speech recognition picks it up, the text goes to my Cloudflare Worker for cleanup and translation, and the result streams back into a review strip you can edit before tapping to insert. It works in any app's text box, WhatsApp first, with nothing to integrate on their end.",
          "Two-way conversation needs no extra machinery: both people install it, and each phone only ever translates its own outgoing speech. English out on mine, Bengali out on his. Typed and clipboard text translate the same way, and there's an in-person mode for talking face to face. Translation is free up to a daily cap, and a Pro tier adds cloud speech recognition and more languages.",
        ],
      },
      {
        heading: "the backend",
        body: [
          "The whole thing runs on a single Cloudflare Worker exposing `POST /api/v1/translate`. The model API key lives only as a Worker secret, never in the APK or the repo, so the app can't leak it and I control cost and abuse centrally: input capped around 2,000 characters, output bounded, per-IP rate limits, and no message text ever stored.",
          "It's built around swappable seams. The translation model (OpenAI `gpt-5-mini` today) is one config file plus a thin adapter. The speech engine swaps the same way, on-device now with server-side transcription for Pro. Adding a language is a registry entry.",
        ],
      },
      {
        heading: "the translation",
        body: [
          "What separates it from Google Translate is the prompt. Jembatan treats your speech as messy spoken intent, full of filler words, false starts, and run-ons, and rewrites it into the message a native speaker would text their own family: everyday register, natural particles, and the speaker's tone kept intact. Blunt stays blunt and affectionate stays affectionate, with no stiff textbook grammar.",
          "The system prompt is kept byte-stable so the provider can prefix-cache it. And because the input is untrusted speech-to-text, the instructions and the message travel in separate roles, so a stray “ignore the above” in what someone says can't hijack the translation. Register (casual, neutral, or formal) is tuned per language.",
        ],
      },
      {
        heading: "making it feel instant",
        body: [
          "Latency decides whether the keyboard feels usable, so it gets constant attention. The biggest win so far is streaming: the translation lands token by token in the review strip as the model writes it, so you're reading the answer before it's finished instead of watching a spinner.",
          "Behind that, I measured real first-token latency across the model's reasoning-effort settings, sub-second at the lowest and climbing steeply as effort rises, and picked the setting where colloquial quality holds without the wait. The current focus is shaving the rest: warming the recognizer and preconnecting to the edge before you finish speaking.",
        ],
      },
      {
        heading: "the keyboard",
        body: [
          "A translating keyboard still has to be a good keyboard, and the core typing features are free. Several build waves went into making it a full one: a custom-drawn QWERTY with per-key press feedback, a geometric swipe decoder, bilingual autocorrect and prediction that combine key geometry with context, and an offline accuracy harness to measure it all.",
          "Trust matters more for a keyboard than almost any other kind of app. Android warns that any keyboard “can collect all the text you type, including passwords.” Jembatan answers that in code: it detects password and card fields and switches off learning, suggestions, and buffering entirely, and it only ever sends the text you explicitly ask it to translate.",
        ],
      },
      {
        heading: "earning trust",
        body: [
          "The hardest problems turned out to be the product edges rather than the translation itself. A keyboard can't raise its own microphone permission, and enabling one trips Android's scariest warning. So the onboarding is built around those two moments: a “Playground” inside the app lets you try the full speak, clean up, translate loop before any permission ask, and a just-in-time coach highlights the mic and translate keys the first time the keyboard appears in a real chat.",
          "The privacy stance is specific: message text is never stored and never used to train anything, and logs hold only metadata, never content.",
        ],
      },
      {
        heading: "design & brand",
        body: [
          "Jembatan means “bridge” in Indonesian, and the design aims for calm over flash: this is an app for talking to family, so it should feel trustworthy and quiet. The surface is around 90% warm neutrals (paper and clay charcoal) with a single terracotta accent that only appears where it carries meaning: the mic, the primary action, active states.",
          "The typeface is Plus Jakarta Sans, the typeface Jakarta commissioned for the city, a nod to the Indonesian side of the bridge. The app icon is a “two voices” mark, and motion is used only to communicate state: a live waveform while listening, a gold sweep while translating. Fully themed for light and dark.",
        ],
      },
      {
        heading: "where it is now",
        body: [
          "The Worker is deployed and the app is code-complete through the monetization wave: on-device and cloud translation, five languages (English, Indonesian, Bengali, Arabic, Spanish), and Pro billing wired through RevenueCat and the Play Console. It's in daily use by the people it was built for, running in a closed Play test.",
          "Next up: a final polish pass on the keyboard itself, a public soft launch, and iOS once its keyboard extension limits are validated. I'd rather ship it right for the family already using it than rush it to a store.",
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
    tagline: "A body recomposition PWA I use every day, with motion design, live charts, and one hard integration.",
    intro:
      "Mission to Abs is a private, offline-first PWA I built to run my own 15-week body recomposition mission: open it daily, log weight, diet, and exercise, take a weekly photo and waist measurement, and watch progress move along a 105-day path. I use it every day with my own data, and it shows the frontend work I care most about: purposeful motion, live data visualisation, lean state, and one integration that was harder than it looks, syncing a Bluetooth smart scale through a backend proxy.",
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
          "Most fitness apps are either a spreadsheet or a hype machine. I wanted a calm daily ritual for a fixed 15-week mission, bright but never loud, something to look forward to rather than a chore. It ships zero workouts and zero diet rules on purpose: you bring the plan, the app keeps you honest.",
          "It's also a deliberate portfolio piece. A CV can claim \"strong React and animation skills\"; an app you can open and poke at proves it. Nothing in it is faked. It's the tool I use every day with my own data, not a demo wired to sample JSON.",
        ],
      },
      {
        heading: "the daily loop",
        body: [
          "The loop is one screen: today's weight, diet, and exercise, each logged with a slide-to-confirm that only fires on release. Marking a failure is just as easy as marking a win, and a planned rest day counts without penalty. Every action is reversible: each confirm drops an undo toast, and anything destructive takes two steps.",
          "That matters because honest logging is what makes everything downstream mean anything, so the daily loop is built to remove every reason to fudge it.",
        ],
      },
      {
        heading: "progress as a journey",
        body: [
          "Instead of a heatmap of squares, progress moves along a 105-day path split into five named stages: Foundation, Build, Push, Refine, Reveal. Logging earns XP and levels, a streak builds, and crossing a stage boundary plays a deliberate transition. The gamification is generous but quiet, built on motion and visible XP rather than confetti and exclamation marks.",
          "Recharts renders the weight trend, clipped to the mission window so synced days from before the start don't drag the line sideways. Weekly waist measurements and progress photos capture the change a scale misses, and Framer Motion carries the level-ups and page transitions, always to communicate state.",
        ],
      },
      {
        heading: "syncing a real smart scale",
        body: [
          "The least visible feature took the most work. I weigh in on a Renpho Bluetooth scale, and the app pulls those readings automatically. The catch is that there's no official API, and a scale password can never touch a static frontend. So the PWA talks to a small serverless backend proxy that holds the credentials, and the client only ever sends a user-pasted sync token as a header.",
          "Synced readings then flow through the same merge path as a manual CSV import, with a \"manual wins\" rule so a hand-typed weight is never silently overwritten by a sync. The bug that ate the most time was timezone drift: Renpho's wall-clock field sits ahead of the device, which tipped an evening weigh-in onto the next calendar day, landing one day late on the home screen and one day early on the chart. Dating each reading from its true UTC timestamp fixed both.",
        ],
      },
      {
        heading: "offline-first & state",
        body: [
          "State is a single, schema-versioned Zustand store. Entries and settings live in localStorage and photo blobs in IndexedDB, so the whole app works with no connection, which a daily habit tool has to. It's an installable PWA with a self-hosted font (no third-party CDN on first paint) and lazy-split routes to stay inside a tight bundle budget.",
          "A top-level error boundary catches anything that throws and shows a reload button plus a one-tap \"export my data\" escape hatch, because silently losing 15 weeks of logs was never an acceptable failure mode.",
        ],
      },
    ],
    screenshots: [
      "daily dashboard · day N",
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
    tagline: "A storefront I built front to back to teach myself the backend my day job doesn't touch.",
    intro:
      "A complete e-commerce store I built from scratch on my own: a React frontend with an Express and PostgreSQL backend behind it. My role at Wolseley is frontend only, so I built this to learn the other half: how a product catalogue, user accounts, and authentication fit together end to end. E-commerce is the domain I know best from the day job, which made it the natural thing to build, and every line here is my own.",
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
          "My day job at Wolseley is frontend only. I ship and A/B test a high-traffic B2B storefront, but I don't touch what happens once a request leaves the browser, and I wanted to close that gap. So I built a complete store of my own: browse products, open a detail page, add to a basket, register, sign in, and check out, with a backend I wrote myself behind all of it.",
        ],
      },
      {
        heading: "the storefront",
        body: [
          "A responsive product grid that reflows from mobile to desktop, product detail pages, and client-side routing with React Router. It's built on React 19 and Tailwind v4, the current versions, so the setup mirrors what a modern frontend team ships today.",
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
          "Behind the frontend sits a small Express and PostgreSQL backend that serves the product catalogue and handles accounts: registration and login with bcrypt-hashed passwords and JWT sessions. It isn't a production e-commerce platform and I don't claim it is. It's a from-scratch build that walks the full request path, from a React form to a hashed row in Postgres and back.",
        ],
      },
      {
        heading: "why it's here",
        body: [
          "This is where I push past the day job. Wolseley gave me the frontend instincts: responsive layout, sensible component structure, state that stays predictable as pages grow. This project is me teaching myself the backend to match, on my own time. It's a personal learning build, but it's a complete one, and it's entirely mine.",
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
  { name: "ecommerce_store", badge: "live ↗", live: true, desc: "Full-stack storefront: React UI, Express + Postgres backend", tags: "react · express · postgres", link: "https://github.com/Juber-Ahmed98/ecommerce_store" },
  { name: "habit_tracker", badge: "building", live: false, desc: "Modern-stack PWA shell", tags: "next16 · react19 · ts", link: "https://github.com/Juber-Ahmed98/habit_tracker" },
  { name: "quran-just-one-verse", badge: "building", live: false, desc: "One verse a day", tags: "js", link: "https://github.com/Juber-Ahmed98/quran-just-one-verse" },
  { name: "Qibla_Compass", badge: "building", live: false, desc: "Sensor-driven qibla finder", tags: "js · sensors", link: "https://github.com/Juber-Ahmed98/Qibla_Compass" },
];

/** The dashed "currently building" strip beneath the wall. */
export const currentlyBuilding = {
  label: "currently building →",
  name: "habit_tracker",
  desc: "architecture-first PWA: Next.js 16, React 19, strict TS, Tailwind v4, installable, dual theme. Features landing next. No demo button until it earns one.",
} as const;

// ── Experience ───────────────────────────────────────────────────────────────

export type Role = { date: string; title: string; desc: string };

export const experience: Role[] = [
  {
    date: "2024.08 — now",
    title: "Digital Developer · Wolseley",
    desc: "High-traffic B2B e-commerce frontend. Responsive, accessible pages shipped through A/B and multivariate tests: merchandising badges, promos, seasonal lightboxes. Kept what moved the numbers and dropped what didn't.",
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
