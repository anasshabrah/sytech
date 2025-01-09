// hooks/useGSAP.ts
import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGSAP = (
  animationCallback: (self: gsap.Context) => void,
  scopeRef: RefObject<HTMLElement>
) => {
  useEffect(() => {
    if (typeof window !== "undefined" && scopeRef.current) {
      const context = gsap.context((self) => {
        animationCallback(self);
      }, scopeRef.current);
      
      // Cleanup function to revert animations on component unmount
      return () => context.revert();
    }
  }, [animationCallback, scopeRef]);
};

export default useGSAP;
