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
  /** Placeholder until the real CV PDF lands (CP8). */
  cv: { label: "Download CV", href: "/cv.pdf" },
} as const;

// ── Hero ─────────────────────────────────────────────────────────────────────

export type HeroStat = { value: string; label: string };

export const hero = {
  eyebrow: "Mohammed Juber Ahmed — frontend developer, Birmingham UK",
  /** H1 renders as `${headingLead} <highlight>${headingHighlight}</highlight>`. */
  headingLead: "I build web products —",
  headingHighlight: "front to back.",
  sub: "3 years on Wolseley's high-traffic B2B e-commerce frontend — and a stack of my own products in AI, health, and language on the side.",
  /** Gated behind the Hero `showStats` prop (DESIGN.md). */
  stats: [
    { value: "3+", label: "yrs shipping at scale" },
    { value: "6", label: "builds on the wall" },
    { value: "1", label: "API in production" },
  ] satisfies HeroStat[],
  cta: { label: "See the work ↓", href: "#work" },
} as const;

// ── Featured work ────────────────────────────────────────────────────────────

export type FeaturedLink = { label: string; href: string; external?: boolean };

export type FeaturedProject = {
  index: string; // "/01"
  name: string;
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
  blurb:
    "Android floating-bubble translator with its own Cloudflare Worker API. Not just a UI — the whole product: app, backend, onboarding UX, branding, roadmap.",
  stack: "kotlin · cloudflare-workers · rest-api",
  links: [
    { label: "Live demo ↗", href: "https://jembatan.juberahmed.dev/", external: true },
    { label: "Case study →", href: "#" },
    { label: "Code ↗", href: "https://github.com/Juber-Ahmed98/Jembatan-app", external: true },
  ],
  screenshotLabel: "jembatan app screenshot",
} as const;

export const featured: FeaturedProject[] = [
  {
    index: "/02",
    name: "Mission to Abs",
    blurb:
      "Fitness tracker built for frontend craft — motion design, live charts, lean state management.",
    stack: "react · framer-motion · recharts · zustand",
    links: [
      { label: "Live demo ↗", href: "#", external: true },
      { label: "Case study →", href: "#" },
      { label: "Code ↗", href: "https://github.com/Juber-Ahmed98/mission_to_abs_app", external: true },
    ],
    screenshotLabel: "charts screenshot",
  },
  {
    index: "/03",
    name: "E-commerce Store",
    blurb:
      "A storefront in the same shape as my day job — responsive grids, cart flow, routing done properly.",
    stack: "react · tailwind · react-router",
    links: [
      { label: "Live demo ↗", href: "#", external: true },
      { label: "Case study →", href: "#" },
      { label: "Code ↗", href: "https://github.com/Juber-Ahmed98/ecommerce_store", external: true },
    ],
    screenshotLabel: "storefront screenshot",
  },
];

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
  { name: "Jembatan-app", badge: "live ↗", live: true, desc: "Floating-bubble translator + Worker API", tags: "kotlin · workers", link: "https://github.com/Juber-Ahmed98/Jembatan-app" },
  { name: "mission_to_abs_app", badge: "live ↗", live: true, desc: "Animated fitness tracker + data-viz", tags: "react · zustand", link: "https://github.com/Juber-Ahmed98/mission_to_abs_app" },
  { name: "ecommerce_store", badge: "live ↗", live: true, desc: "Storefront with cart + routing", tags: "react · tailwind", link: "https://github.com/Juber-Ahmed98/ecommerce_store" },
  { name: "habit_tracker", badge: "building", live: false, desc: "Modern-stack PWA shell", tags: "next16 · react19 · ts", link: "https://github.com/Juber-Ahmed98/habit_tracker" },
  { name: "quran-just-one-verse", badge: "building", live: false, desc: "One verse a day, beautifully", tags: "js", link: "https://github.com/Juber-Ahmed98/quran-just-one-verse" },
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
    desc: "High-traffic B2B e-commerce frontend. Responsive + accessible pages, A/B testing, Monetate personalisation, Agile.",
  },
  {
    date: "2022.12 — 2024.08",
    title: "Apprentice Developer · Wolseley",
    desc: "L3 Software Development Technician (QA Apprenticeships) while shipping to production.",
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
  heading: ["Hire someone", "who ships."], // rendered on two lines
  cv: { label: "Download CV (PDF)", href: "/cv.pdf" }, // placeholder until CP8
  links: [
    { label: "Email", href: "mailto:legendkillerj@gmail.com" },
    { label: "GitHub ↗", href: "https://github.com/Juber-Ahmed98", external: true },
    { label: "LinkedIn ↗", href: "#", external: true }, // URL pending (see ROADMAP open questions)
  ] satisfies ContactLink[],
  footer: {
    left: "© 2026 mohammed juber ahmed",
    right: "birmingham, uk · juberahmed.dev",
  },
} as const;
