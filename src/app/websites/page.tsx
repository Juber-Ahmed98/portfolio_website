import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { About, Apps, HowItWorks, Quotes, Services, WebsitesHero, Work } from "@/components/websites-sections";
import { WebsitesClose } from "@/components/websites-close";
import { websitesHero, websitesMeta } from "@/content/websites";

/**
 * `/websites`: the page linked from cold emails to small and medium
 * businesses. Separate from the home page (the employer portfolio) and never
 * links back to it. Copy lives in `src/content/websites.ts`.
 */

export const metadata: Metadata = {
  title: { absolute: websitesMeta.title },
  description: websitesMeta.description,
  alternates: { canonical: websitesMeta.path },
  openGraph: {
    url: websitesMeta.path,
    siteName: "Juber Ahmed",
    title: websitesMeta.title,
    description: websitesMeta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: websitesMeta.title,
    description: websitesMeta.description,
  },
};

export default function WebsitesPage() {
  return (
    <>
      <SiteHeader
        brand={{ text: websitesHero.name, href: "#top" }}
        action={{ label: "Get in touch", href: "#contact" }}
        themeToggle={false}
      />
      <main>
        <WebsitesHero />
        <Work />
        <Quotes />
        <Services />
        <HowItWorks />
        <Apps />
        <About />
        <WebsitesClose />
      </main>
    </>
  );
}
