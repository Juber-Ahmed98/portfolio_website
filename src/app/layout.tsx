import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Display + body face. Plus Jakarta is a variable font, so 400–800 are all
 * available without a `weight` array. Headings drive hierarchy with weight
 * (700/800) + tight tracking; body stays 400/500 (see DESIGN.md).
 */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
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
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
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
