// lib/utils.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import type { SelectorFn } from "@/hooks/useGSAP";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimConfig {
  selector: string;
  y?: number;
  opacity?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  toggleActions?: string;
  start?: string;
}

/**
 * Creates a GSAP scroll-based animation callback for use with useGSAP.
 * @param ref - Ref to the container element for scroll trigger.
 * @param config - Animation configuration.
 */
export function createScrollAnimationCallback(
  ref: RefObject<Element | null>,
  config: ScrollAnimConfig
): (selectorFn: SelectorFn) => void {
  const {
    selector,
    y = 50,
    opacity = 0,
    stagger = 0.1,
    duration = 1,
    ease = "power2.out",
    toggleActions = "play none none reverse",
    start = "top 80%",
  } = config;

  return (sel) => {
    if (!ref.current) return;
    gsap.from(sel(selector), {
      opacity,
      y,
      stagger,
      duration,
      ease,
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions,
      },
    });
  };
}

/**
 * Resolves a logo URL, prefixing with NEXT_PUBLIC_BASE_URL if needed.
 * @param logo - Original logo path or URL.
 */
export function getLogoSrc(logo: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  return logo.startsWith("http") ? logo : `${baseUrl}${logo}`;
}

/**
 * Returns true if the array has more than 3 elements.
 * @param array - Array to check.
 */
export function shouldLoop<T>(array: T[]): boolean {
  return array.length > 3;
}
