// hooks/useGSAP.ts

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Define a type alias for our selector function.
// We return an array of Elements.
export type SelectorFn = (query: string) => Element[];

const useGSAP = (
  animationCallback: (selector: SelectorFn) => void,
  scopeRef: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    if (typeof window === "undefined" || !scopeRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    // Create a context using gsap.context
    const context = gsap.context(() => {
      // Convert the NodeList to an array using Array.from()
      animationCallback((query: string) =>
        Array.from(gsap.utils.selector(scopeRef.current!)(query))
      );
    }, scopeRef.current);

    return () => {
      context.revert();
      // Annotate trigger as any to avoid implicit any error.
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, [animationCallback, scopeRef]);
};

export default useGSAP;
