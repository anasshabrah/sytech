// hooks/useRevealOnScroll.ts
import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface RevealOptions {
  selector?: string;
  stagger?: number;
  opacityFrom?: number;
  yFrom?: number;
  duration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  toggleActions?: string;
}

/**
 * Hook to reveal elements within a container on scroll.
 */
export function useRevealOnScroll(
  ref: RefObject<HTMLElement>,
  {
    selector = ".animate",
    stagger = 0.1,
    opacityFrom = 0,
    yFrom = 50,
    duration = 0.8,
    ease = "power2.out",
    scrollStart = "top 80%",
    scrollEnd,
    toggleActions = "play none none reverse",
  }: RevealOptions = {}
) {
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = ref.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    const tween = gsap.from(elements, {
      opacity: opacityFrom,
      y: yFrom,
      stagger,
      duration,
      ease,
      scrollTrigger: {
        trigger: ref.current,
        start: scrollStart,
        ...(scrollEnd ? { end: scrollEnd } : {}),
        toggleActions,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, selector, stagger, opacityFrom, yFrom, duration, ease, scrollStart, scrollEnd, toggleActions]);
}