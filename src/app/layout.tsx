import type { Metadata } from "next";
import {
  Instrument_Serif,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Display face — headings only, and roman only. The family ships a single 400
 * weight, so headings never take a bold utility (the browser would synthesise
 * it), and never an italic one (see DESIGN.md).
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

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
  title: "Mohammed Juber Ahmed — Frontend Developer, Birmingham",
  description:
    "Frontend developer in Birmingham, UK. 3+ years shipping and A/B-testing Wolseley's high-traffic B2B e-commerce frontend, plus live self-built products — including an AI-powered Android translator with its own Cloudflare Workers API.",
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
      className={`${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body>
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
