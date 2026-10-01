/**
 * Single source of truth for the site's content.
 *
 * Every string and project on the site lives here, typed, so copy never lives
 * inline in a component. The home page reads top to bottom in the order the
 * exports appear: hero, film, Jembatan, demo, clients, builds, day job,
 * contact. Case studies are keyed by slug further down.
 */

// ── Nav ──────────────────────────────────────────────────────────────────────

export type NavLink = { label: string; href: string };

/**
 * The nav carries the wordmark and the CV button and nothing else (DESIGN.md:
 * Hallmark N9, edge-aligned minimal). The section anchors moved into the hero —
 * see `jumpLinks` below.
 */
export const nav = {
  /** Logo splits so `.dev` can take the accent colour. */
  brand: { text: "juberahmed", accent: ".dev", href: "#top" },
  /**
   * Real CV PDF lives at public/cv.pdf. `shortLabel` is what the button shows
   * below 375px — the full label plus the wordmark and toggle needs 349px of
   * bar, so under that it pushes past the right padding and off the screen,
   * and it stays cramped against the wordmark until ~375px. The accessible
   * name stays "Download CV" at every width.
   */
  cv: { label: "Download CV", shortLabel: "CV", href: "/cv.pdf" },
} as const;

// ── Hero ─────────────────────────────────────────────────────────────────────

export type Translation = {
  /** BCP 47 tag, set on the element so screen readers switch voice. */
  lang: string;
  label: string;
  text: string;
  dir?: "rtl";
};

export const hero = {
  name: "Mohammed Juber Ahmed",
  /** The H1 is a claim, so the role has to be said plainly right above it. */
  role: "Frontend developer, Birmingham",
  /** Rendered as one H1; split so the desktop break lands on the comma. */
  headingLead: "I build web products,",
  headingTail: "front to back.",
  /**
   * The same sentence in the languages the keyboard below speaks. Bengali
   * leads: it is the reason the app exists. Drafted by hand, not by the app.
   * Owner to check the wording. No captions: the button's label already says
   * which language is showing next.
   */
  translations: [
    { lang: "bn", label: "Bengali", text: "আমি ওয়েব প্রোডাক্ট বানাই, শুরু থেকে শেষ পর্যন্ত।" },
    { lang: "id", label: "Indonesian", text: "Aku bikin produk web, dari frontend sampai backend." },
    { lang: "ar", label: "Arabic", text: "أبني منتجات ويب، من الواجهة إلى الخلفية.", dir: "rtl" },
    { lang: "es", label: "Spanish", text: "Construyo productos web, de principio a fin." },
  ] satisfies Translation[],
  /** The role line already says "frontend developer", so this one doesn't. */
  sub: "Building Wolseley's high-traffic B2B e-commerce storefront since 2022. In the evenings I ship my own products.",
} as const;

// ── The film (Jembatan, under scroll) ────────────────────────────────────────

export type FilmStep = {
  /** Second in the clip where this beat starts. */
  at: number;
  title: string;
  body: string;
};

export const film = {
  /** Says what the film is, on screen, before the first beat. */
  label: { name: "Jembatan", rest: "the Android keyboard I built" },
  /** Scrub-encoded (keyframe every 8 frames). Both are 720 wide, so text stays
      sharp on a 3x phone; phones get the 15fps cut (729 KB), desktop 20fps. */
  src: { small: "/film/jembatan-phone.mp4", large: "/film/jembatan-720.mp4" },
  poster: "/film/jembatan-poster.webp",
  alt: "The Jembatan keyboard in WhatsApp: English is spoken, reviewed as Indonesian, then sent into the chat",
  /** The reduced-motion / no-JS version: three stills. */
  stills: [
    { src: "/film/still-speak.webp", alt: "Holding the mic: a live waveform fills the keyboard" },
    { src: "/film/still-review.webp", alt: "Review before sending: what I heard, and the Indonesian translation" },
    { src: "/film/still-sent.webp", alt: "The Indonesian message sent in the WhatsApp thread" },
  ],
  steps: [
    { at: 0, title: "Hold the mic and say it in English.", body: "Speech is recognised on the phone itself." },
    { at: 2.2, title: "Read it back in natural Indonesian.", body: "My Cloudflare Worker rewrites it the way a native speaker would text it, streamed in as it's written." },
    { at: 6.2, title: "Insert it and send.", body: "It all happens inside the keyboard, so you never leave WhatsApp." },
  ] satisfies FilmStep[],
} as const;

// ── Jembatan, the product ────────────────────────────────────────────────────

export const jembatan = {
  name: "Jembatan",
  meaning: "Indonesian for “bridge”",
  status: "Used daily by my family · Google Play closed testing",
  lede: "An Android keyboard that turns what you say into the message a native speaker would send. I built it so I could text my dad, who reads Bengali, without leaving the chat.",
  /** A spec sheet, not a paragraph: the hiring manager's skim path. */
  parts: [
    { k: "App", v: "Kotlin and Jetpack Compose, a custom Android keyboard with swipe typing and bilingual autocorrect" },
    { k: "API", v: "A Cloudflare Worker at POST /api/v1/translate. It streams tokens over SSE, so the translation appears as it's written, and never stores message text" },
    { k: "Model", v: "gpt-5-mini, with my instructions and the speech kept in separate roles, so a stray “ignore the above” can't hijack a translation" },
    { k: "Product", v: "Onboarding built around Android's two scariest prompts, billing through RevenueCat, the brand and the marketing site" },
  ],
  links: [
    { label: "Visit the site", href: "https://jembatan.juberahmed.dev/", external: true },
    { label: "Read the case study", href: "/work/jembatan/" },
  ],
} as const;

// ── The demo ─────────────────────────────────────────────────────────────────

export type DemoTarget = { code: "bn" | "id" | "ar" | "es"; label: string; dir?: "rtl" };

export const demo = {
  /**
   * `false` until the demo proxy on the Jembatan landing Worker is deployed
   * (design-reference/plans, session 2). Canned mode plays the samples below
   * through the same streaming UI and says so on screen.
   */
  live: false,
  /**
   * What the panel calls itself in each mode. The canned note sits right under
   * the title, not in a footnote: if someone is told "try it" and asks "is
   * that real?", the panel has already answered.
   */
  copy: {
    live: {
      title: "Try the keyboard",
      badge: "live · on the app's Worker",
      note: "Runs on the same Worker the app uses, capped per visitor. Nothing you type is stored.",
    },
    canned: {
      title: "How it reads",
      badge: "samples",
      note: "Sample messages, with translations written by hand to show the review step. Not live output from the app.",
    },
  },
  endpoint: "https://jembatan.juberahmed.dev/api/demo/translate",
  maxChars: 140,
  targets: [
    { code: "bn", label: "Bengali" },
    { code: "id", label: "Indonesian" },
    { code: "ar", label: "Arabic", dir: "rtl" },
    { code: "es", label: "Spanish" },
  ] satisfies DemoTarget[],
  /** Drafted by hand to show the flow; replaced by real Worker output once live. */
  samples: [
    {
      en: "Running ten minutes late, save me a seat.",
      out: {
        bn: "দশ মিনিট দেরি হবে, আমার জন্য একটা সিট রেখো।",
        id: "Telat sepuluh menit nih, simpenin kursi buat aku ya.",
        ar: "متأخر عشر دقائق، احجز لي مكان.",
        es: "Llego diez minutos tarde, guárdame un sitio.",
      },
    },
    {
      en: "Have you eaten yet? I can bring something back.",
      out: {
        bn: "খেয়েছ? আসার সময় কিছু নিয়ে আসতে পারি।",
        id: "Udah makan belum? Aku bisa bawain sesuatu.",
        ar: "أكلت؟ أقدر أجيب لك شي وأنا راجع.",
        es: "¿Ya comiste? Te puedo llevar algo.",
      },
    },
    {
      en: "Call me when you land, no rush.",
      out: {
        bn: "নামার পর ফোন দিও, তাড়া নেই।",
        id: "Kabarin aku kalau udah mendarat ya, santai aja.",
        ar: "كلمني لما توصل، على راحتك.",
        es: "Llámame cuando aterrices, sin prisa.",
      },
    },
  ],
} as const;

// ── Client sites ─────────────────────────────────────────────────────────────

export type Client = {
  name: string;
  /** Who it's for, plainly. */
  who: string;
  url: string;
  host: string;
  summary: string;
  /** Four facts a developer would ask about. */
  facts: string[];
  shots: { phone: string; desktop: string; alt: string };
};

/**
 * Paid, signed-off work for real businesses, shown with the owners'
 * permission. One live link each: no code link (client repos) and no
 * case-study page.
 */
export const clients: Client[] = [
  {
    name: "UMMA BJJ",
    who: "Jiu-Jitsu and MMA gym, Sparkhill",
    url: "https://ummabjj.com/",
    host: "ummabjj.com",
    summary: "The gym was on a GoDaddy template with its timetable posted as a JPEG. I rebuilt it as six hand-coded pages: the timetable renders from one data block, and the free-trial form writes the WhatsApp message to the coaches for you.",
    facts: ["6 pages, no build step", "Timetable from one data block", "AVIF photos from Cloudflare's edge", "No third-party scripts"],
    shots: {
      phone: "/shots/umma-bjj/mobile-full.webp",
      desktop: "/shots/umma-bjj/desktop.webp",
      alt: "ummabjj.com on a phone, from the “Learn real self-defence” hero down through reviews, classes and the week's timetable",
    },
  },
  {
    name: "Al-Ilm Martial Arts",
    who: "Boxing, kickboxing and Muay Thai club",
    url: "https://alilmmartialarts.co.uk/",
    host: "alilmmartialarts.co.uk",
    summary: "A one-pager served from a Cloudflare Worker that also runs its own enquiry endpoint. Both waiting-list forms mail the club through a send_email binding, post natively, and still work with JavaScript switched off.",
    facts: ["One Worker, static + API", "POST /api/enquiry", "Works without JavaScript", "No visitor data leaves Cloudflare"],
    shots: {
      phone: "/shots/al-ilm/mobile-full.webp",
      desktop: "/shots/al-ilm/desktop.webp",
      alt: "alilmmartialarts.co.uk on a phone, from the “Al-Ilm means the knowledge” hero down through the three disciplines",
    },
  },
];

// ── More builds ──────────────────────────────────────────────────────────────

export type Build = {
  name: string;
  what: string;
  stack: string;
  /** Month it started. Every build here is from 2026, so the month is the signal. */
  started: string;
  status: "live" | "building";
  links: { label: string; href: string; external?: boolean }[];
};

/**
 * Everything else with something to click, strongest first. Rows without a
 * public link stay off: a row you can't open is a dead end, and so is a
 * sentence about private work. Thin builds (a one-day calculator) stay off
 * too; each row should be worth an interview question.
 */
export const builds: Build[] = [
  {
    name: "Stratemize",
    what: "Client site for a marketing agency, with a live consultation booker on a tRPC API and D1",
    stack: "React 19 · TypeScript · Workers · D1",
    started: "Jul 2026",
    status: "live",
    links: [{ label: "Live site", href: "https://stratemize.co.uk/", external: true }],
  },
  {
    name: "Mission to Abs",
    what: "The fitness PWA I use every day: animated progress, live charts, smart-scale sync",
    stack: "React · Zustand · Recharts · Framer Motion",
    started: "May 2026",
    status: "live",
    links: [
      { label: "Case study", href: "/work/mission-to-abs/" },
      { label: "Code", href: "https://github.com/Juber-Ahmed98/mission_to_abs_app", external: true },
    ],
  },
  {
    name: "E-commerce store",
    what: "A storefront with an Express and Postgres backend, built to learn the half my day job doesn't touch",
    stack: "React 19 · Express · Postgres · JWT",
    started: "May 2026",
    status: "live",
    links: [
      { label: "Case study", href: "/work/ecommerce-store/" },
      { label: "Code", href: "https://github.com/Juber-Ahmed98/ecommerce_store", external: true },
    ],
  },
  {
    name: "Yoosuf Zaman",
    what: "Client site for a business-setup consultant, with a Worker-backed booking form",
    stack: "HTML · CSS · JavaScript · Workers",
    started: "Jul 2026",
    status: "live",
    links: [{ label: "Live site", href: "https://yoosufzaman.com/", external: true }],
  },
  {
    name: "Habit tracker",
    // Repo is spelled "habbit_tracker" on GitHub; the row keeps the right spelling.
    what: "An installable PWA shell with strict TypeScript and dual themes. The features come next",
    stack: "Next.js 16 · React 19 · Tailwind 4",
    started: "May 2026",
    status: "building",
    links: [{ label: "Code", href: "https://github.com/Juber-Ahmed98/habbit_tracker", external: true }],
  },
  {
    name: "Qibla Compass",
    what: "A browser qibla finder driven by the phone's orientation sensors, in about 8 KB",
    stack: "HTML · CSS · JavaScript",
    started: "Jan 2026",
    status: "live",
    links: [
      { label: "Live site", href: "https://juber-ahmed98.github.io/Qibla_Compass/", external: true },
      { label: "Code", href: "https://github.com/Juber-Ahmed98/Qibla_Compass", external: true },
    ],
  },
];


// ── Day job ──────────────────────────────────────────────────────────────────

export type Role = { dates: string; title: string; desc: string };

export const dayJob = {
  heading: "By day, Wolseley.",
  lede: "Since December 2022 I've worked on Wolseley's B2B e-commerce site, a high-traffic storefront where trade customers order plumbing and heating supplies.",
  roles: [
    {
      dates: "Aug 2024 – now",
      title: "Digital Developer",
      desc: "Responsive, accessible pages, shipped through A/B and multivariate tests in Monetate: merchandising badges, promotions, seasonal lightboxes. Each change goes out as a test, and only the winners stay.",
    },
    {
      dates: "Dec 2022 – Aug 2024",
      title: "Apprentice Merchandiser and Developer",
      desc: "Shipped to production while earning the Level 3 Software Development Technician qualification with QA.",
    },
  ] satisfies Role[],
  tools: [
    { k: "At work", v: "HTML, SCSS, JavaScript, Monetate, Bloomreach, Yext, Jira" },
    { k: "On my own", v: "React, Next.js, TypeScript, Kotlin, Cloudflare Workers and D1" },
  ],
} as const;

// ── Contact ──────────────────────────────────────────────────────────────────

export type ContactLink = { label: string; href: string; external?: boolean };

export const contact = {
  heading: "Let's build the next one.",
  sub: "A frontend role, a site for your business, or a product idea: email is the quickest way to reach me.",
  email: "mohammed.juber.ahmed@gmail.com",
  cv: { label: "Download CV", href: "/cv.pdf" },
  links: [
    { label: "GitHub", href: "https://github.com/Juber-Ahmed98", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-juber-ahmed/", external: true },
  ] satisfies ContactLink[],
  colophon: "Built with Next.js and Tailwind, set in Mona Sans, served from Cloudflare's edge.",
  footer: "© 2026 Mohammed Juber Ahmed · Birmingham",
} as const;


// ── Case studies ─────────────────────────────────────────────────────────────
// Drives the `/work/[slug]/` routes (CP5). One entry per featured project, keyed
// by slug. This is the CP5 *template* content — honest starter drafts; the deep
// narratives land in CP6 (Jembatan) and CP7 (Mission to Abs, E-commerce).
//
// Links reuse the home-page values; a live link of "#" means "not public yet" and
// is skipped rather than faked (the "don't fake it" rule).

export type CaseStudyBlock = {
  /** Mono sub-heading, e.g. "the problem". */
  heading: string;
  /** One or more paragraphs of body copy. */
  body: string[];
};

export type CaseStudyLink = { label: string; href: string; external?: boolean };

export type CaseStudyShot = {
  /** Mono caption under the frame. Names what the capture shows, plainly. */
  label: string;
  /** Real capture. Without one the frame falls back to a caption-only tile. */
  src?: string;
  alt?: string;
};

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
  /**
   * What the captures are of — decides the frame aspect and how many sit in a
   * row. Phone captures stand four across at device aspect; web captures run
   * two across at 16:10. Mixing shapes in one grid is what makes a case study
   * read as a folder of PNGs.
   */
  shotShape: "phone" | "web";
  screenshots: CaseStudyShot[];
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
        heading: "the website",
        body: [
          "Jembatan has its own site at jembatan.juberahmed.dev, and I built it to do the one thing the app does: cross a language barrier in front of you. A site-wide language picker re-renders the entire page in your chosen language on the spot, so a visitor sees the product make its own case in their own words instead of reading about it.",
          "The rest is motion built around that idea: a calm, staged reveal down the page, the same terracotta accent the app uses, and transitions that only fire to show state. It's the quickest way to feel what the keyboard does without installing anything, so it's the first thing I point people to.",
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
    shotShape: "phone",
    /* All four are captures of the shipping app on a real device — the first
       three from one session, so they read as one shoot rather than a folder
       of PNGs. The conversation in them is the demo thread from the launch
       capture, not anyone's real messages. */
    screenshots: [
      {
        label: "keyboard translating in WhatsApp",
        src: "/work/jembatan/01-keyboard.webp",
        alt: "WhatsApp with the Jembatan keyboard: the translated Indonesian sits in the composer, ready to send",
      },
      {
        label: "hold-to-talk voice",
        src: "/work/jembatan/02-voice.webp",
        alt: "Hold-to-talk recording in progress, a live waveform filling the keyboard area",
      },
      {
        label: "review & edit strip",
        src: "/work/jembatan/03-review.webp",
        alt: "Review before sending: what I heard, the Indonesian translation, and discard, verify or insert",
      },
      {
        label: "in-person mode",
        src: "/work/jembatan/04-in-person.webp",
        alt: "In-person mode: English and Indonesian mic buttons for a two-way spoken conversation",
      },
    ],
    // Code link deliberately absent — the repo is permanently private.
    links: [
      { label: "Visit the site", href: "https://jembatan.juberahmed.dev/", external: true },
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
          "It's also a deliberate portfolio piece. A CV can claim “strong React and animation skills”; an app you can open and poke at proves it. Nothing in it is faked. It's the tool I use every day with my own data, not a demo wired to sample JSON.",
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
          "Synced readings then flow through the same merge path as a manual CSV import, with a “manual wins” rule so a hand-typed weight is never silently overwritten by a sync. The bug that ate the most time was timezone drift: Renpho's wall-clock field sits ahead of the device, which tipped an evening weigh-in onto the next calendar day, landing one day late on the home screen and one day early on the chart. Dating each reading from its true UTC timestamp fixed both.",
        ],
      },
      {
        heading: "offline-first & state",
        body: [
          "State is a single, schema-versioned Zustand store. Entries and settings live in localStorage and photo blobs in IndexedDB, so the whole app works with no connection, which a daily habit tool has to. It's an installable PWA with a self-hosted font (no third-party CDN on first paint) and lazy-split routes to stay inside a tight bundle budget.",
          "A top-level error boundary catches anything that throws and shows a reload button plus a one-tap “export my data” escape hatch, because silently losing 15 weeks of logs was never an acceptable failure mode.",
        ],
      },
    ],
    shotShape: "phone",
    screenshots: [
      {
        label: "daily dashboard · day 47",
        src: "/work/mission-to-abs/01-dashboard.webp",
        alt: "Day 47 dashboard: today's diet and exercise cards, XP level, weight and body-fat readings",
      },
      {
        label: "the 105-day journey",
        src: "/work/mission-to-abs/02-journey.webp",
        alt: "The 105-day journey map, five stages from foundation to reveal with the current day marked",
      },
      {
        label: "weight & body-fat charts",
        src: "/work/mission-to-abs/03-progress.webp",
        alt: "Progress tab: weight down 2.8kg and waist down 2.7cm, with a weight trend chart and adherence score",
      },
      {
        label: "weekly progress photos",
        src: "/work/mission-to-abs/04-photos.webp",
        alt: "Weekly photo ritual: the week's prompt and a grid of six past weeks, each labelled with its weight",
      },
    ],
    links: [
      { label: "Live demo", href: "#", external: true },
      { label: "Code", href: "https://github.com/Juber-Ahmed98/mission_to_abs_app", external: true },
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
    shotShape: "web",
    screenshots: [
      {
        label: "product grid",
        src: "/work/ecommerce/01-grid.webp",
        alt: "Shop products: three supplement cards with prices and inline quantity steppers",
      },
      {
        label: "product detail",
        src: "/work/ecommerce/02-detail.webp",
        alt: "Whey Protein Isolate detail page: large product shot, price and specification",
      },
      {
        label: "basket & quantities",
        src: "/work/ecommerce/03-basket.webp",
        alt: "Basket with three line items, per-line quantity controls and a running total",
      },
      {
        label: "checkout",
        src: "/work/ecommerce/04-checkout.webp",
        alt: "Checkout: shipping details form beside an order summary totalling £149.96",
      },
    ],
    links: [
      { label: "Live demo", href: "#", external: true },
      { label: "Code", href: "https://github.com/Juber-Ahmed98/ecommerce_store", external: true },
    ],
  },
};

