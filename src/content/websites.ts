/**
 * Content for `/websites`, the page linked from cold emails to small and
 * medium businesses. The home page stays the employer portfolio; this page
 * talks to a business owner reading on their phone, so the copy is about what
 * each site does for the business and the tech is one small line per project.
 *
 * Nothing here links back into the job-hunting material (CV, builds index,
 * day job). The home page links here, not the other way round.
 */

import { contact } from "@/content/site";

export const websitesMeta = {
  title: "Websites for Birmingham businesses · Juber Ahmed",
  description:
    "Hand-built websites for gyms, clubs, consultants and local firms in Birmingham. Fast on phones, with enquiry and booking forms that reach you straight away.",
  path: "/websites/",
} as const;

export const reach = {
  email: contact.email,
  /** Prefilled subject so enquiries are easy to spot in the inbox. */
  mailto: `mailto:${contact.email}?subject=${encodeURIComponent("Website enquiry")}`,
  /**
   * International format, digits only (e.g. "447700900123"). Empty hides the
   * WhatsApp buttons; set it and they appear in the hero and the close.
   */
  whatsapp: "",
} as const;

export const whatsappHref = reach.whatsapp
  ? `https://wa.me/${reach.whatsapp}?text=${encodeURIComponent("Hi Juber, I'd like to talk about a website.")}`
  : null;

export const websitesHero = {
  name: "Juber Ahmed",
  role: "Web developer in Birmingham",
  headingLead: "Websites for Birmingham businesses,",
  headingTail: "built by hand.",
  sub: "I build fast, good-looking sites for gyms, clubs, consultants and local firms, with booking and enquiry forms that land straight in your inbox or WhatsApp.",
  seeWork: "See the sites I've built",
} as const;

// ── Work ─────────────────────────────────────────────────────────────────────

export type ClientSite = {
  name: string;
  who: string;
  url: string;
  host: string;
  summary: string;
  /** What the site does for the business, in the owner's terms. */
  points: string[];
  /** One plain line for anyone curious how it's built. */
  tech: string;
  shots: { phone: string; desktop: string; alt: string };
};

export const work = {
  heading: "Recent sites.",
  intro: "Every one of these is live and was built for a paying client. Open them on your phone and have a look around.",
};

export const clientSites: ClientSite[] = [
  {
    name: "UMMA BJJ",
    who: "Jiu-Jitsu and MMA gym, Sparkhill",
    url: "https://ummabjj.com/",
    host: "ummabjj.com",
    summary:
      "The gym was on a GoDaddy template, with its timetable posted as a picture you had to zoom into. The new site is six pages that load quickly on a phone. The timetable lives in one place, so a change to a class shows up everywhere, and the free-trial form opens WhatsApp with the message already written to the coaches.",
    points: [
      "Trial requests arrive in WhatsApp",
      "A timetable you can read on any phone",
      "Six pages, quick on a phone signal",
      "No ads or trackers slowing it down",
    ],
    tech: "Hand-coded HTML, CSS and JavaScript on Cloudflare",
    shots: {
      phone: "/shots/umma-bjj/mobile-full.webp",
      desktop: "/shots/umma-bjj/desktop.webp",
      alt: "ummabjj.com on a phone, from the “Learn real self-defence” hero down through reviews, classes and the week's timetable",
    },
  },
  {
    name: "Yoosuf Zaman",
    who: "Business coach and setup consultant",
    url: "https://yoosufzaman.com/",
    host: "yoosufzaman.com",
    summary:
      "A personal-brand site for a consultant who helps people launch their businesses. The home page shows the companies he's helped build, and a separate booking page sends each consultation request straight to his inbox.",
    points: [
      "Consultation requests emailed to him",
      "No monthly form-service fee",
      "Set up to be found on Google",
      "Room for each new business he helps launch",
    ],
    tech: "HTML, CSS and JavaScript, with a Cloudflare Worker behind the form",
    shots: {
      phone: "/shots/yoosuf-zaman/mobile-full.webp",
      desktop: "/shots/yoosuf-zaman/desktop.webp",
      alt: "yoosufzaman.com on a phone, from the “Stop building projects” hero down through the businesses he has built and his services",
    },
  },
  {
    name: "Al-Ilm Martial Arts",
    who: "Boxing, kickboxing and Muay Thai club",
    url: "https://alilmmartialarts.co.uk/",
    host: "alilmmartialarts.co.uk",
    summary:
      "A single page that tells parents and adults what the club teaches and who it's for, with two waiting-list forms. Each sign-up goes straight to the club's inbox, so nobody has to log in to a separate form tool.",
    points: [
      "Waiting-list sign-ups emailed to the club",
      "Forms still work if a browser blocks scripts",
      "Enquiries aren't passed to a form company",
      "One page, quick to load on a phone",
    ],
    tech: "HTML, CSS and JavaScript on a Cloudflare Worker",
    shots: {
      phone: "/shots/al-ilm/mobile-full.webp",
      desktop: "/shots/al-ilm/desktop.webp",
      alt: "alilmmartialarts.co.uk on a phone, from the “Al-Ilm means the knowledge” hero down through the three disciplines",
    },
  },
  {
    name: "Stratemize",
    who: "Marketing agency",
    url: "https://stratemize.co.uk/",
    host: "stratemize.co.uk",
    summary:
      "An agency site with its own consultation booker. Visitors book a free call on the page, the booking is saved to the agency's own database, and the owner gets an email straight away. It also runs the agency's blog and waiting list.",
    points: [
      "Free consultations booked on the site",
      "An email to the owner for every booking",
      "A blog the agency can keep adding to",
      "Tracks which visits turn into bookings",
    ],
    tech: "React and TypeScript on Cloudflare Workers, with a D1 database",
    shots: {
      phone: "/shots/stratemize/mobile-full.webp",
      desktop: "/shots/stratemize/desktop.webp",
      alt: "stratemize.co.uk on a phone, from the “Words that move markets forward” hero down through its services",
    },
  },
];

// ── What clients say ─────────────────────────────────────────────────────────

export type Quote = { text: string; name: string; role: string; business: string };

/**
 * Quotes are being collected from Stratemize, Yoosuf Zaman and UMMA BJJ. The
 * section stays hidden until at least one is in here; never put a placeholder
 * or an invented quote in this list.
 */
export const quotes: Quote[] = [];

// ── Services ─────────────────────────────────────────────────────────────────

export const services = {
  heading: "What I can build for you.",
  items: [
    {
      title: "A new website",
      body: "For a business that doesn't have one yet, or wants to start again properly.",
    },
    {
      title: "A rebuild of your current site",
      body: "Moving you off a Wix, GoDaddy or Squarespace template onto something quicker that looks like your business.",
    },
    {
      title: "Booking and enquiry forms",
      body: "Class trials, consultations, quote requests and waiting lists, sent to your email or WhatsApp.",
    },
    {
      title: "Web apps",
      body: "Booking systems, client portals and internal tools. If it needs logins and a database, I can build that too.",
    },
  ],
};

// ── Process ──────────────────────────────────────────────────────────────────

export const howItWorks = {
  heading: "How it works.",
  steps: [
    { label: "Call", body: "A short chat about your business and what the site needs to do." },
    { label: "Plan", body: "I send a short plan with the pages, the price and a date, before any work starts." },
    { label: "Build", body: "You see it on your phone as it comes together and tell me what to change." },
    { label: "Live", body: "I put it on your domain, connect the forms and show you how it all works. After that I'm a message away." },
  ],
};

// ── Apps ─────────────────────────────────────────────────────────────────────

export const apps = {
  heading: "I build apps too.",
  body: "Websites are most of what I do for clients, but I also build full products. Jembatan is my own Android keyboard: you speak, and it writes the message the way a native speaker would text it, running on a server I built and look after myself. If your business needs more than a website, I can take it further.",
  still: { src: "/film/still-sent.webp", alt: "The Jembatan keyboard in WhatsApp, with the translated message sent" },
  link: { label: "See how I built it", href: "/work/jembatan/" },
};

// ── About ────────────────────────────────────────────────────────────────────

export const about = {
  heading: "Who you're working with.",
  body: "I'm Juber, a developer based in Birmingham. Alongside client work I've spent the last few years on Wolseley's e-commerce site, where trade customers order plumbing and heating supplies, so I'm used to sites that have to work for a lot of people at once. Your site gets the same care: tested on real phones, quick to load, and easy to find.",
};

// ── Close ────────────────────────────────────────────────────────────────────

export const close = {
  heading: "Tell me about your business.",
  sub: "A short message is enough. Tell me what you do and what you'd like the site to do, and I'll come back with ideas and a price.",
  footer: "© 2026 Juber Ahmed · Birmingham",
};
