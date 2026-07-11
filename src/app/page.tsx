import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Featured } from "@/components/featured";
import { Wall } from "@/components/wall";

/**
 * Home page. Assembled from section components that render from the typed
 * content module (`src/content/site.ts`). CP1 ships Nav + Hero; CP2 adds
 * Featured + Wall; Experience and Contact land in CP3.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Featured />
        <Wall />
      </main>
    </>
  );
}
