// components/SectionTitle.tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

type Props = { subtitle: string; title: string };

export default function SectionTitle({ subtitle, title }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.from(ref.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      },
    });
  });

  return (
    <div ref={ref} className="section-title mb-12 text-right">
      <h4 className="mb-1 text-sm font-semibold text-brand-500">{subtitle}</h4>
      <h2>{title}</h2>
    </div>
  );
}
