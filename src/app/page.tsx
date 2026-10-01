import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Film } from "@/components/film";
import { Jembatan } from "@/components/jembatan";
import { Clients } from "@/components/clients";
import { Builds } from "@/components/builds";
import { DayJob } from "@/components/day-job";
import { Contact } from "@/components/contact";

/**
 * Home: one story, top to bottom. The claim (hero), the proof in your hand
 * (the film, then the product and its demo, in the dark room), paid work for
 * real businesses, the day job (the job being applied for, so it comes before
 * the side projects, not after), everything else, and how to get in touch.
 * Every string comes from `src/content/site.ts`.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Film />
        <Jembatan />
        <Clients />
        <DayJob />
        <Builds />
        <Contact />
      </main>
    </>
  );
}
