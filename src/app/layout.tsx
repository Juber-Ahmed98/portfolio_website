import type { Metadata, Viewport } from "next";
import { Anek_Bangla, JetBrains_Mono, Mona_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Display + body face. Mona Sans is GitHub's open-source variable sans, with a
 * width axis (75–125) as well as weight: the display cut is the condensed end
 * at 900, body runs at the normal width (see DESIGN.md, Type).
 */
const mona = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

/**
 * The hero's Bengali line, and nothing else. One weight, Bengali glyphs only,
 * and not preloaded: it is the line under the H1, never the LCP element.
 */
const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  weight: "600",
  variable: "--font-anek-bangla",
  display: "swap",
  preload: false,
});

/** Data only (dates, stacks, status) and nothing in the first screen uses
 *  it, so it is not preloaded: 40 KB off the critical path. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://juberahmed.dev"),
  title: {
    default: "Mohammed Juber Ahmed — Frontend Developer, Birmingham",
    template: "%s · Mohammed Juber Ahmed",
  },
  description:
    "Frontend developer in Birmingham, UK. 3+ years shipping and A/B-testing Wolseley's high-traffic B2B e-commerce frontend, plus live self-built products — including an AI-powered Android translator with its own Cloudflare Workers API.",
  alternates: { canonical: "/" },
  authors: [{ name: "Mohammed Juber Ahmed", url: "https://juberahmed.dev" }],
  creator: "Mohammed Juber Ahmed",
  keywords: [
    "Mohammed Juber Ahmed", "frontend developer", "Birmingham", "React", "Next.js",
    "TypeScript", "e-commerce frontend", "A/B testing", "Cloudflare",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://juberahmed.dev/",
    siteName: "Mohammed Juber Ahmed",
    title: "Mohammed Juber Ahmed — Frontend Developer, Birmingham",
    description:
      "Frontend developer shipping a high-traffic B2B e-commerce frontend at Wolseley — plus live self-built products in AI, health, and language.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Juber Ahmed — Frontend Developer, Birmingham",
    description:
      "Frontend developer shipping a high-traffic B2B e-commerce frontend — plus live self-built products in AI, health, and language.",
  },
  robots: { index: true, follow: true },
};

/** Browser-chrome colour follows the paper: cream light, espresso dark. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3ede3" },
    { media: "(prefers-color-scheme: dark)", color: "#15110e" },
  ],
};

/** Person entity so search engines tie the site to the named individual. */
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Juber Ahmed",
  url: "https://juberahmed.dev",
  jobTitle: "Frontend Developer",
  email: "mailto:mohammed.juber.ahmed@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Birmingham", addressCountry: "GB" },
  worksFor: { "@type": "Organization", name: "Wolseley" },
  knowsAbout: ["Frontend development", "React", "Next.js", "TypeScript", "E-commerce", "A/B testing", "Cloudflare Workers"],
  sameAs: [
    "https://github.com/Juber-Ahmed98",
    "https://www.linkedin.com/in/mohammed-juber-ahmed/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${mona.variable} ${anekBangla.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Before first paint: lets CSS choose the scroll-driven film over its
            stills fallback without a flash or a layout shift at hydration. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
