// hooks/useGSAP.ts

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to integrate GSAP animations with React components.
 *
 * @param animationCallback - A callback function that receives the GSAP context.
 * @param scopeRef - A ref to the DOM element that defines the scope of the animation.
 */
const useGSAP = (
  animationCallback: (self: gsap.Context) => void,
  scopeRef: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    if (typeof window !== "undefined" && scopeRef.current) {
      const context = gsap.context((self: gsap.Context) => {
        animationCallback(self);
      }, scopeRef.current);
      
      // Cleanup function to revert animations on component unmount
      return () => context.revert();
    }
  }, [animationCallback, scopeRef]);
};

export default useGSAP;
