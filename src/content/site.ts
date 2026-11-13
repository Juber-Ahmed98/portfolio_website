/**
 * Single source of truth for the site's content (v4).
 *
 * Every string and project on the home page and the case studies lives here,
 * typed, so copy never lives inline in a page. The home page reads top to
 * bottom: first screen, UMMA BJJ, Al-Ilm, two more client sites, Wolseley,
 * Jembatan, Waystone, "Also", footer. Case studies are keyed by slug further
 * down. `/websites` has its own module, `websites.ts`.
 *
 * Nothing here is invented: no quote, number or claim without a source.
 */

export type Link = { label: string; href: string; external?: boolean };

// ── The person ───────────────────────────────────────────────────────────────

export const person = {
  name: "Juber Ahmed",
  fullName: "Mohammed Juber Ahmed",
  email: "mohammed.juber.ahmed@gmail.com",
  /** The real CV PDF lives at public/cv.pdf. */
  cv: { label: "Download CV", href: "/cv.pdf" },
  github: "https://github.com/Juber-Ahmed98",
  linkedin: "https://www.linkedin.com/in/mohammed-juber-ahmed/",
  /**
   * The cut-out: him without the café behind him, transparent, 1837 × 1290.
   * The 1100 cut is enough on a 1x laptop. On a wide screen it is drawn at 93%
   * of the first screen's height; on a phone at up to 188vw.
   */
  photo: {
    src: "/juber-cut.webp",
    srcset: "/juber-cut-1100.webp 1100w, /juber-cut.webp 1837w",
    sizes: "(min-width: 900px) and (min-aspect-ratio: 11/10) calc((100vh - 44px) * 1.33), 188vw",
    width: 1837,
    height: 1290,
    alt: "Juber Ahmed, in profile, in evening light",
    /** The photo as taken, café and all: for structured data. */
    uncut: "/juber.webp",
  },
} as const;

export const homeMeta = {
  title: "Juber Ahmed · Frontend developer, Birmingham",
  description:
    "Juber Ahmed, a frontend developer in Birmingham. Wolseley’s online store by day, plus client websites and apps of my own.",
} as const;

// ── First screen ─────────────────────────────────────────────────────────────

/**
 * Nothing on the first screen but him and these words, in two steps: `say` is
 * the headline, `rest` the claim under it, and `tail` the quiet end of the
 * claim.
 */
export const hero = {
  say: "I’m Juber, a frontend developer in Birmingham.",
  rest: "I’ve worked on Wolseley’s online store since 2022,",
  tail: "and I build websites and apps of my own.",
} as const;

// ── Client sites ─────────────────────────────────────────────────────────────

export type Client = {
  /** CSS class that carries the room's colour. */
  room: string;
  kind: string;
  name: string;
  lede: string;
  /** Three or four hard facts a developer would ask about. */
  facts: string[];
  link: Link;
  shots: { desktop: string; phone: string; phoneAlt: string };
};

/**
 * Paid, signed-off work for real businesses, shown with the owners'
 * permission. One live link each: no code link (client repos) and no
 * case-study page.
 */
export const clients: Client[] = [
  {
    room: "umma",
    kind: "Paid client website · Sparkhill, Birmingham",
    name: "UMMA BJJ",
    lede: "A jiu-jitsu gym, moved off a GoDaddy template. Six pages, a timetable you can read on a phone, and a free-trial form that opens WhatsApp with the message already written.",
    facts: [
      "Hand-coded, no build step",
      "Timetable from one data block",
      "AVIF photos from Cloudflare’s edge",
      "No third-party scripts",
    ],
    link: { label: "Visit ummabjj.com", href: "https://ummabjj.com/", external: true },
    shots: {
      desktop: "/shots/umma-bjj/desktop.webp",
      phone: "/shots/umma-bjj/phone.webp",
      phoneAlt: "ummabjj.com on a phone: the “Learn real self-defence” hero, with the free-trial button",
    },
  },
  {
    room: "alilm",
    kind: "Paid client website · Birmingham",
    name: "Al-Ilm Martial Arts",
    lede: "One page for a boxing and Muay Thai club, on a server that also runs its waiting-list forms. They still work with JavaScript switched off.",
    facts: [
      "One Cloudflare Worker: the page and its API",
      "Forms post to /api/enquiry and email the club",
      "No visitor data leaves Cloudflare",
    ],
    link: { label: "Visit alilmmartialarts.co.uk", href: "https://alilmmartialarts.co.uk/", external: true },
    shots: {
      desktop: "/shots/al-ilm/desktop.webp",
      phone: "/shots/al-ilm/phone.webp",
      phoneAlt: "alilmmartialarts.co.uk on a phone: the “Al-Ilm means the knowledge” hero",
    },
  },
];

export type MoreClient = {
  name: string;
  what: string;
  stack: string;
  url: string;
  host: string;
  shots: { desktop: string; phone: string };
};

/** The other two client sites, as a matched pair in one room. */
export const moreClients = {
  kind: "Two more client websites",
  heading: "All four sites are live, for paying clients.",
  sites: [
    {
      name: "Yoosuf Zaman",
      what: "A business coach’s site, with a booking form that runs on a Cloudflare Worker.",
      stack: "HTML · CSS · JavaScript · Workers",
      url: "https://yoosufzaman.com/",
      host: "yoosufzaman.com",
      shots: { desktop: "/shots/yoosuf-zaman/desktop.webp", phone: "/shots/yoosuf-zaman/phone.webp" },
    },
    {
      name: "Stratemize",
      what: "A marketing agency’s site, with a live consultation booker on a tRPC API and D1.",
      stack: "React 19 · TypeScript · Workers · D1",
      url: "https://stratemize.co.uk/",
      host: "stratemize.co.uk",
      shots: { desktop: "/shots/stratemize/desktop.webp", phone: "/shots/stratemize/phone.webp" },
    },
  ] satisfies MoreClient[],
} as const;

// ── Day job ──────────────────────────────────────────────────────────────────

export type Role = { dates: string; title: string; desc: string };

/** Wolseley, kept at this level of detail: nothing internal, no numbers. */
export const dayJob = {
  kind: "Day job · since December 2022",
  name: "Wolseley",
  /** `claimLead` is set in the soft grey, `claimTail` in ink. */
  claimLead: "Wolseley’s online store is where trade customers order plumbing and heating supplies.",
  claimTail: "Every change I ship goes out as a test, and only the winners stay.",
  roles: [
    {
      dates: "Aug 2024 – now",
      title: "Digital Developer",
      desc: "Responsive, accessible pages, shipped through A/B and multivariate tests in Monetate: merchandising badges, promotions, seasonal lightboxes.",
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
  cv: { label: "Download my CV", href: "/cv.pdf" },
} as const;

// ── Jembatan ─────────────────────────────────────────────────────────────────

export type Example = {
  /** What was said, as it was said (fillers and all: cleaning them up is the job). */
  said: string;
  lang: "bn" | "id";
  langLabel: string;
  sent: string;
};

export const jembatan = {
  room: "jem",
  kind: "Android app · used daily by my family",
  name: "Jembatan",
  lede: "A keyboard that turns what you say into the message a native speaker would send. I built it so I could text my dad, who reads Bengali.",
  facts: [
    "Kotlin and Compose, a custom Android keyboard",
    "Speech recognised on the phone",
    "A Cloudflare Worker, streamed over SSE",
    "Stores no message text",
  ],
  links: [
    { label: "Read the case study", href: "/work/jembatan/" },
    { label: "Visit the site", href: "https://jembatan.juberahmed.dev/", external: true },
  ] satisfies Link[],
  /**
   * The real recording, muted and looping, played only while it is on screen
   * and never under reduced motion. The phone cut is 720px wide. The poster is
   * the review frame.
   */
  loop: {
    src: "/film/jembatan-phone.mp4",
    poster: "/film/still-review.webp",
    alt: "The Jembatan keyboard in WhatsApp: English is spoken, reviewed as Indonesian, then sent into the chat",
    caption: "The recording: English into Indonesian",
  },
  labels: {
    said: "You say",
    /** Followed by the language: "It sends, in Bengali". */
    sent: "It sends, in",
    note: "Real output, not written by hand.",
    /** The fuller note, on the case study, where all three examples show. */
    noteLong: "Real output, not written by hand. The first is the message in the recording; the others ran through the app’s own prompt and model.",
  },
  /**
   * Real output only. The first pair is on screen in the recording (its review
   * strip). The other two are the most common answer across nine runs of the
   * production prompt and model (`gpt-5.6-luna`, neutral register) in
   * Jembatan's eval sweep (`cpm-neutral.json`, `worker/tools/ttft-sweep.mjs`).
   * Every `said` is the message itself, addressed to the reader: the app
   * translates what you say, it doesn't take instructions.
   *
   * The home page shows `examples[homeExample]`; the case study shows all three.
   */
  examples: [
    {
      said: "Great, I will start getting ready. Let’s meet up in one hour.",
      lang: "id",
      langLabel: "Indonesian",
      sent: "Oke, aku mulai siap-siap. Kita ketemu dalam satu jam, ya.",
    },
    {
      said: "can you uh pick up some rice and eggs on the way home please",
      lang: "bn",
      langLabel: "Bengali",
      sent: "আপনি কি দয়া করে বাড়ি ফেরার পথে কিছু চাল আর ডিম নিয়ে আসবেন?",
    },
    {
      said: "im running a bit late the traffic is crazy right now sorry",
      lang: "bn",
      langLabel: "Bengali",
      sent: "আমার একটু দেরি হয়ে যাচ্ছে, এখন রাস্তায় ভীষণ জ্যাম। দুঃখিত।",
    },
  ] satisfies Example[],
  homeExample: 1,
  /** The three beats of the recording, for the case study. */
  steps: [
    { title: "Hold the mic and say it in English.", body: "Speech is recognised on the phone itself." },
    { title: "Read it back in natural Indonesian.", body: "My Cloudflare Worker rewrites it the way a native speaker would text it, streamed in as it’s written." },
    { title: "Insert it and send.", body: "It all happens inside the keyboard, so you never leave WhatsApp." },
  ],
} as const;

// ── Waystone ─────────────────────────────────────────────────────────────────

export const waystone = {
  room: "way",
  kind: "Android app · in testing on Google Play",
  name: "Waystone",
  lede: "A fitness app that reads my bathroom scale over Bluetooth and keeps weigh-ins, food and training in one record.",
  facts: [
    "Kotlin and Jetpack Compose",
    "Talks to the scale over Bluetooth LE",
    "The record is stored on the phone, in Room",
    "An AI coach that can propose, never write",
  ],
  /** No code link: the repo is private (health data in the docs). */
  links: [
    { label: "Read the case study", href: "/work/waystone/" },
    { label: "Visit the site", href: "https://waystone.juberahmed.dev/", external: true },
  ] satisfies Link[],
  /** The third capture only shows where there is room for it. */
  shots: [
    { src: "/work/waystone/01-today.webp", alt: "Waystone’s Today screen: day 14 of 105, an 18-day streak and today’s record" },
    { src: "/work/waystone/02-body.webp", alt: "Waystone’s Body screen: a trend weight of 82.0 kg and a six-month chart" },
    { src: "/work/waystone/04-training.webp", alt: "" },
  ],
} as const;

// ── Also ─────────────────────────────────────────────────────────────────────

export type Build = { name: string; what: string; stack: string; links: Link[] };

/**
 * Everything else with something to click, strongest first. Rows without a
 * public link stay off: a row you can't open is a dead end, and so is a
 * sentence about private work. Thin builds stay off too; each row should be
 * worth an interview question.
 */
export const also = {
  heading: "Also",
  github: { label: "GitHub", href: person.github, external: true },
  builds: [
    {
      name: "E-commerce store",
      what: "A storefront with an Express and Postgres backend, built to learn the half my day job doesn’t touch.",
      stack: "React 19 · Express · Postgres · JWT",
      links: [
        { label: "Case study", href: "/work/ecommerce-store/" },
        { label: "Code", href: "https://github.com/Juber-Ahmed98/ecommerce_store", external: true },
      ],
    },
    {
      name: "Qibla Compass",
      what: "Finds the qibla from your phone’s sensors, in about 8 KB.",
      stack: "HTML · CSS · JavaScript",
      links: [
        { label: "Live", href: "https://juber-ahmed98.github.io/Qibla_Compass/", external: true },
        { label: "Code", href: "https://github.com/Juber-Ahmed98/Qibla_Compass", external: true },
      ],
    },
    {
      // Repo is spelled "habbit_tracker" on GitHub; the row keeps the right spelling.
      name: "Habit tracker",
      what: "An installable app shell in strict TypeScript, with light and dark themes. In progress.",
      stack: "Next.js 16 · React 19 · Tailwind 4",
      links: [{ label: "Code", href: "https://github.com/Juber-Ahmed98/habbit_tracker", external: true }],
    },
  ] satisfies Build[],
} as const;

// ── Footer ───────────────────────────────────────────────────────────────────

export const contact = {
  heading: "Get in touch",
  sub: "A frontend role, a site for your business, or a product idea: email is the quickest way to reach me.",
  /** One-way door to the client page; `/websites` never links back here. */
  forBusiness: { label: "Need a website for your business? See the sites I build for clients", href: "/websites/" },
  links: [
    { label: "GitHub", href: person.github, external: true },
    { label: "LinkedIn", href: person.linkedin, external: true },
  ] satisfies Link[],
  /** On the case studies, the way back. */
  allWork: { label: "All my work", href: "/" },
  footer: "© 2026 Mohammed Juber Ahmed · Birmingham",
} as const;

// ── Case studies ─────────────────────────────────────────────────────────────
// Drives the `/work/[slug]/` pages. One entry per project, keyed by slug. Each
// page opens in the project's own room (the same colour as on the home page).
//
// A live link of "#" means "not public yet" and is skipped rather than faked.

export type CaseStudyBlock = {
  /** Sub-heading, e.g. "the problem" (the page capitalises it). */
  heading: string;
  /** One or more paragraphs of body copy. */
  body: string[];
};

export type CaseStudyLink = { label: string; href: string; external?: boolean };

export type CaseStudyShot = {
  /** Caption under the frame. Names what the capture shows, plainly. */
  label: string;
  /** Real capture. Without one the frame falls back to a caption-only tile. */
  src?: string;
  alt?: string;
};

export type CaseStudy = {
  slug: string;
  /** CSS class that carries the room's colour. */
  room: string;
  /** The quiet line above the name. */
  kind: string;
  name: string;
  /** One-line summary under the title. */
  tagline: string;
  /** Lead paragraph. */
  intro: string;
  /** Three or four hard facts, the ruled list in the first room. */
  facts: readonly string[];
  /** Everything it's built with, as one line under the intro. */
  stackChips: string[];
  /** Narrative blocks rendered in order: problem → approach → … */
  blocks: CaseStudyBlock[];
  /**
   * What the captures are of: decides the frame and how many sit in a row.
   * Phone captures stand four across in device frames (two on a phone); web
   * captures run two across at 16:10.
   */
  shotShape: "phone" | "web";
  /** The captures' own width / height, so the frames hold their place before the images load. */
  shotRatio: string;
  screenshots: CaseStudyShot[];
  /** Live + code links. Live entries with href "#" are skipped (not yet public). */
  links: CaseStudyLink[];
};

/** Build order: also the list of pages `getStaticPaths` generates. */
export const caseStudyOrder = ["jembatan", "waystone", "ecommerce-store"] as const;

export const caseStudies: Record<string, CaseStudy> = {
  jembatan: {
    slug: "jembatan",
    room: "jem",
    kind: "Case study · Android app",
    name: "Jembatan",
    tagline: "An Android translation keyboard with its own production API.",
    intro:
      "Jembatan is a native Android keyboard that turns what you say into a natural, colloquial message in someone else's language and drops it straight into WhatsApp. Hold the mic and speak. On-device speech recognition catches it, a Cloudflare Worker cleans it up and translates it, and the result lands in the field you're already typing in. I built every part of it: the Kotlin app, the backend, the AI prompt, onboarding, branding, billing, and the roadmap.",
    facts: jembatan.facts,
    stackChips: [
      "Kotlin",
      "Jetpack Compose",
      "Android IME",
      "Cloudflare Workers",
      "OpenAI gpt-5.6-luna",
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
          "It's built around swappable seams. The translation model is one config file plus a thin adapter: when `gpt-5-mini` was scheduled to leave OpenAI's API, the swap to `gpt-5.6-luna` changed that file and nothing in the app. The speech engine swaps the same way, on-device now with server-side transcription for Pro. Adding a language is a registry entry.",
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
          "The Worker is deployed and the app is code-complete through the monetization wave: on-device and cloud translation, five languages (English, Indonesian, Bengali, Arabic, Spanish), and Pro billing wired through RevenueCat and the Play Console. It's in daily use by the people it was built for, and in open testing on Google Play.",
          "Next up: a final polish pass on the keyboard itself, a public soft launch, and iOS once its keyboard extension limits are validated. I'd rather ship it right for the family already using it than rush it to a store.",
        ],
      },
    ],
    shotShape: "phone",
    shotRatio: "540 / 1170",
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
  waystone: {
    slug: "waystone",
    room: "way",
    kind: "Case study · Android app",
    name: "Waystone",
    tagline: "A native Android fitness app: weigh-ins, food and training in one record, with a coach that reads it.",
    intro:
      "Waystone keeps the record of a body recomposition on your phone: a daily weigh-in, what you eat, the sessions you train, and a smoothed trend that frames every number. It started in May as Mission to Abs, a React PWA I used every day for a 15-week cut. The PWA hit the limits of the browser, so I rebuilt it as a native Kotlin app and retired the web version. It's in testing on Google Play by invitation; the code stays private because the docs hold my own health data.",
    facts: waystone.facts,
    stackChips: [
      "Kotlin",
      "Jetpack Compose",
      "Room",
      "Bluetooth LE",
      "CameraX + ML Kit",
      "Firebase Auth + Firestore",
      "OpenAI tool calls",
      "Cloudflare Workers",
    ],
    blocks: [
      {
        heading: "why native",
        body: [
          "Mission to Abs proved the idea: I opened it every day. But it was a witness, not a coach. It shipped no food logging and no workouts on purpose, and reading my Renpho scale meant a serverless proxy holding credentials for Renpho's cloud. The next version had to log food by barcode, run a rest timer that keeps counting with the screen off, and talk to the scale itself.",
          "Camera, background work and Bluetooth are all ordinary features on Android and awkward in a browser. So rather than stretch the web app, I rebuilt it from the data model up, and kept the parts that worked: the 15-week mission as the default frame, the daily record, and levels and streaks that reward logging rather than results.",
        ],
      },
      {
        heading: "three modules, one rule each",
        body: [
          "The engine is pure Kotlin with no Android in it, and it owns the numbers: the weight trend, body fat, energy balance, every metric the app shows is derived there and never stored. The design module holds every colour, size, duration and spring. The app module holds screens and data, and the build fails if it contains a design literal, or any copy on the banned list.",
          "The record is Room. Every row has a UUID v7 id, created and updated timestamps, and a soft delete, so cloud sync can be added later without migrating anyone's history. Each schema version is exported and committed, and the migrations are tested against them.",
        ],
      },
      {
        heading: "talking to the scale directly",
        body: [
          "The PWA read my weigh-ins from Renpho's cloud through a proxy. Waystone speaks the scale's Bluetooth protocol itself: the protocol and session logic sit in the engine with their own tests, so the parsing is checked without a phone. Anyone without a smart scale types the number in, in kg or stones and pounds.",
        ],
      },
      {
        heading: "a coach that can't act",
        body: [
          "The coach is an AI you can ask about your numbers, and it is fenced on purpose. It reads the record only through tool calls (an overview, body data, intake over a range), so every figure it quotes comes from a call with its working shown. It has two propose tools, a calorie target and a training template, and no write tools at all: it never logs, edits or deletes, and nothing changes until you accept its card.",
          "It runs on your own OpenAI key, kept encrypted on the phone with a monthly cap you set. Without a key the app still writes a weekly review of your record, from rules in the engine.",
        ],
      },
      {
        heading: "shipping it",
        body: [
          "It's on Google Play's internal testing track: a signed release published by a Gradle task, with the version code taken from the commit count. The privacy policy and account-deletion page Play requires are served from a Cloudflare Worker at waystone.juberahmed.dev.",
          "The one thing that leaves the phone by choice is weigh-in sharing with one other person, for my brother and me. That runs on Google sign-in and Firestore, with the security rules covered by their own tests, and it's off unless you turn it on.",
        ],
      },
    ],
    shotShape: "phone",
    shotRatio: "540 / 1199",
    screenshots: [
      {
        label: "today · day 14 of 105",
        src: "/work/waystone/01-today.webp",
        alt: "Today screen: day 14 of 105, an 18-day streak, today's record with weigh-in and food logged, and the next training session",
      },
      {
        label: "body · the weight trend",
        src: "/work/waystone/02-body.webp",
        alt: "Body screen: a trend weight of 82.0 kg, body fat with its error band, and a six-month chart with the projected path",
      },
      {
        label: "food · macros against target",
        src: "/work/waystone/03-food.webp",
        alt: "Food screen: 1,130 of 2,100 kcal eaten, and a macros table of protein, carbs, fat and fibre against their targets",
      },
      {
        label: "training · logging a set",
        src: "/work/waystone/04-training.webp",
        alt: "Training screen: bench press with last time's numbers beside each set, and steppers for weight and reps",
      },
    ],
    links: [
      { label: "Visit the site", href: "https://waystone.juberahmed.dev/", external: true },
    ],
  },
  "ecommerce-store": {
    slug: "ecommerce-store",
    room: "shop",
    kind: "Case study · Personal build",
    name: "E-commerce store",
    tagline: "A storefront I built front to back to teach myself the backend my day job doesn't touch.",
    intro:
      "A complete e-commerce store I built from scratch on my own: a React frontend with an Express and PostgreSQL backend behind it. My role at Wolseley is frontend only, so I built this to learn the other half: how a product catalogue, user accounts, and authentication fit together end to end. E-commerce is the domain I know best from the day job, which made it the natural thing to build, and every line here is my own.",
    facts: [
      "React 19 and Tailwind 4",
      "React Router 7, basket in Context",
      "Express and PostgreSQL",
      "bcrypt passwords, JWT sessions",
    ],
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
    shotRatio: "16 / 10",
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

