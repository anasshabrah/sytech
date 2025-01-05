"use client";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Services from "@/components/Services";
import Attainments from "@/components/Attainments";
// import FunFacts from "@/components/FunFacts";
import Experience from "@/components/Experience";
// import Projects from "@/components/Projects";
// import Testimonials from "@/components/Testimonials";
import HowIWork from "@/components/HowIWork";
import Contact from "@/components/Contact";
import { useEffect, useState } from "react";
import TopbarHeader from "@/components/TopbarHeader";
// import Blogs from "@/components/Blogs";

export default function Home() {
  const [navOpen, setNavOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedColor = localStorage.getItem("color");
    if (savedColor) {
      document.documentElement.style.setProperty("--primary", savedColor);
    }
    const savedDir = localStorage.getItem("dir");
    if (savedDir) {
      document.documentElement.dir = savedDir;
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loader-container w-100 d-flex align-items-center justify-content-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <TopbarHeader setNavOpen={setNavOpen} navOpen={navOpen} />

      {/* <!-- main content --> */}
      <main className="container">
        <div className="col-12" data-bs-spy="scroll" data-bs-target="#navigation">
          {/* <!-- hero --> */}
          <Hero />

          {/* <!-- about me --> */}
          <AboutMe />

          {/* <!-- services --> */}
          <Services />

          {/* <!-- attainments --> */}
          <Attainments />

          {/* <!-- fun facts --> */}
          {/* <FunFacts /> */}

          {/* <!-- experience --> */}
          <Experience />

          {/* <!-- projects --> */}
          {/* <Projects /> */}

          {/* <!-- how i work --> */}
          <HowIWork />

          {/* blogs */}
          {/* <Blogs /> */}

          {/* <!-- testimonials --> */}
          {/* <Testimonials /> */}

          {/* <!-- contact --> */}
          <Contact />
        </div>
      </main>
      {/* <!-- color switcher --> */}
    </>
  );
}
