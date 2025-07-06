// app/projects/[id]/ProjectDetailClient.tsx
'use client';

import React, { useRef, useCallback } from "react";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import gsap from "gsap";
import useGSAP, { SelectorFn } from "@/hooks/useGSAP";
import { ChevronDown } from "lucide-react";
import type { ProjectDetail, ContentItem } from "@/app/data/projectDetailsData";
import TeamMemberCard from '@/components/TeamMemberCard';
import Wave from '@/components/Wave';

interface ProjectDetailClientProps {
  project: ProjectDetail;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const projectDetailRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animationCallback = useCallback(
    (selector: SelectorFn) => {
      if (!projectDetailRef.current) return;
      gsap.from(selector(".animate"), {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power1.out",
        scrollTrigger: {
          trigger: projectDetailRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    []
  );

  useGSAP(prefersReducedMotion ? () => {} : animationCallback, projectDetailRef);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const logoSrc = project.logo.startsWith("http")
    ? project.logo
    : `${baseUrl}${project.logo}`;

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            description: project.shortDescription,
            url: `${baseUrl}/projects/${project.id}`,
            logo: logoSrc,
          }),
        }}
      />

      <div className="relative bg-neutral-bg overflow-hidden">
        {/* Top wave */}
        <Wave
          viewBox="0 0 1440 80"
          path="M0,32 C360,96 1080,0 1440,32 L1440,0 L0,0 Z"
          height="h-16"
        />

        {/* Background dots */}
        <div className="absolute inset-0 bg-pattern-dots opacity-5 pointer-events-none z-0" />

        {/* Main content */}
        <div ref={projectDetailRef} className="relative z-10 max-w-[800px] mx-auto py-16 px-4">
          <h1 className="animate mb-6 text-center text-3xl font-bold">{project.name}</h1>

          {/* Logo and description */}
          <div className="mb-12 flex flex-col items-center gap-4">
            {project.url ? (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={logoSrc}
                  alt={`${project.name} Logo`}
                  width={200}
                  height={200}
                  className="h-48 w-48 object-contain rounded-full"
                  priority
                />
              </a>
            ) : (
              <Image
                src={logoSrc}
                alt={`${project.name} Logo`}
                width={200}
                height={200}
                className="h-48 w-48 object-contain rounded-full"
                priority
              />
            )}
            <p className="animate text-base leading-7 text-center">
              {project.fullDescription}
            </p>
          </div>

          {/* Sectioned content */}
          {project.sections.map((section, idx) => (
            <details
              key={section.title}
              className="mb-6 group bg-white rounded-xl p-4 shadow"
              open={idx === 0}
            >
              <summary className="flex justify-between cursor-pointer px-2 py-3 text-lg font-semibold animate">
                {section.title}
                <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <div className="mt-2 pl-4 space-y-2 animate">
                {Array.isArray(section.content)
                  ? (section.content as ContentItem[])
                      .filter(item => item.value.trim() !== "")
                      .map((item, i) =>
                        item.type === "subheading" ? (
                          <h3 key={i} className="mt-4 text-base font-semibold">
                            {item.value}
                          </h3>
                        ) : (
                          <p key={i}>{item.value}</p>
                        )
                      )
                  : <p>{(section.content as ContentItem).value}</p>}
              </div>
            </details>
          ))}

          {/* Team members */}
          {project.team?.length ? (
            <div className="mt-16">
              <h2 className="animate mb-4 text-lg font-semibold">فريق العمل</h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {project.team.map(member => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          ) : null}

          {/* Back link */}
          <div className="mt-16 text-center">
            <Link
              href="/projects"
              aria-label="⤴ العودة إلى المشاريع"
              className="scroll-link border-dark/10 text-dark hover:bg-brand-50"
            >
              <span>⤴ العودة إلى المشاريع</span>
            </Link>
          </div>
        </div>

        {/* Bottom wave */}
        <Wave
          viewBox="0 0 1440 80"
          path="M0,32 C360,96 1080,0 1440,32 L1440,0 L0,0 Z"
          height="h-16"
          top={false}
          flip
        />
      </div>
    </>
  );
}
