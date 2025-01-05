// components/GSAPAnimations.tsx

"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GSAPAnimations = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Example GSAP animation targeting elements with the class 'animate-me'
    const animation = gsap.from(".animate-me", {
      scrollTrigger: {
        trigger: ".animate-me",
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Cleanup function to kill only this specific ScrollTrigger
    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default GSAPAnimations;
