import { useEffect, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type SelectorFn = (query: string) => Element[];

const useGSAP = (
  animationCallback: (selector: SelectorFn) => void,
  scopeRef: RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    if (typeof window === "undefined" || !scopeRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const selector: SelectorFn = (query) =>
        Array.from(gsap.utils.selector(scopeRef.current!)(query));

      animationCallback(selector);

      selector(".animate-me").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      });
    }, scopeRef.current);

    return () => {
      context.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [animationCallback, scopeRef]);
};

export default useGSAP;
