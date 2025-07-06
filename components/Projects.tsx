// components/Projects.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "./SectionTitle";
import useGSAP from "@/hooks/useGSAP";
import Wave from "@/components/Wave";

gsap.registerPlugin(ScrollTrigger);

export default function Projects({ projects }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (selector) => {
      gsap.from(selector(".project-card"), {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    },
    ref
  );

  return (
    <section ref={ref} id="our-projects" className="relative py-20 bg-base overflow-hidden">
      {/* Top geometric wave */}
      <Wave variant="geometric" offsetClass="-top-1" />

      {/* Constrained content */}
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle subtitle="تعرف على مشاريعنا" title="مشاريعنا" />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-10">
          {projects.map(({ id, name, logo, shortDescription }) => (
            <Link key={id} href={`/projects/${id}`} className="project-card group">
              <article className="flex h-full flex-col items-center rounded-2xl bg-base p-8 shadow ring-1 ring-brand-100 transition transform hover:-translate-y-1 hover:shadow-lg hover:scale-105 hover:rotate-1">
                <div className="mb-4">
                  <Image
                    src={logo}
                    alt={`${name} Logo`}
                    width={120}
                    height={120}
                    className="h-20 w-20 object-contain transition group-hover:scale-110"
                  />
                </div>
                <h3 className="mb-2 text-center text-lg font-semibold text-primary-dark">
                  {name}
                </h3>
                <p className="text-center text-sm text-primary-dark/70">
                  {shortDescription}
                </p>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="#hero"
            aria-label="العودة للأعلى"
            className="scroll-link border-dark/10 text-primary-dark hover:bg-brand-50"
          >
            <span>⤴ العودة للأعلى</span>
          </Link>
        </div>
      </div>

      {/* Bottom geometric wave */}
      <Wave variant="geometric" top={false} flip offsetClass="-bottom-1" />
    </section>
  );
}
