import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";

/**
 * Home page. Assembled from section components that render from the typed
 * content module (`src/content/site.ts`). CP1 ships Nav + Hero; Featured, Wall,
 * Experience and Contact land in CP2–CP3.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
