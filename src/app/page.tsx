import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Featured } from "@/components/featured";
import { Wall } from "@/components/wall";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";

/**
 * Home page. Assembled from section components that render from the typed
 * content module (`src/content/site.ts`). CP1 ships Nav + Hero; CP2 adds
 * Featured + Wall; CP3 completes the page with Experience + Contact.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Featured />
        <Wall />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
