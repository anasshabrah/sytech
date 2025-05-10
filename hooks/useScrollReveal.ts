import { useEffect, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook to reveal elements with a scroll-triggered animation
 * Prevents initial hiding by disabling immediateRender on from tweens
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  selector: string
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const els = element.querySelectorAll(selector);
    if (els.length === 0) return;

    // Animate from opacity 0 and y-offset when the section scrolls into view
    const tween = gsap.from(els, {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      // Clean up the ScrollTrigger and tween on unmount
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
    };
  }, [ref, selector]);
}
