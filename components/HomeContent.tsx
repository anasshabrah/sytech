// components/HomeContent.tsx
import Head from "next/head";
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import Services from "./Services";
import Projects from "./Projects";
import { projects } from "@/app/data/projectsData";

export default function HomeContent({ structuredData }: { structuredData: object }) {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://syriatech.co" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero full-width section */}
      <Hero />

      {/* AboutMe inside container */}
      <main className="container px-4">
        <AboutMe />
      </main>

      {/* Services section full-width */}
      <Services />

      {/* Projects section full-width */}
      <Projects projects={projects} />
    </>
  );
}
