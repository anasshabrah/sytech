// hooks/useSectionReveal.ts
import { useEffect, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveal elements within a container when scrolling into view.
 * @param ref - Ref to the container element
 * @param selector - CSS selector for child elements to animate
 */
export function useSectionReveal(
  ref: RefObject<HTMLElement>,
  selector: string = ".animate"
) {
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll(selector);
    if (els.length === 0) return;

    const tween = gsap.from(els, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, selector]);
}