// app/projects/[id]/ProjectDetailClient.tsx
"use client";
import React, { useRef, useCallback } from "react";
import Image from "next/image";
import Script from "next/script";
import gsap from "gsap";
import styles from "@/styles/ProjectDetail.module.scss";
import TeamMemberCard from "@/components/TeamMemberCard";
import useGSAP, { SelectorFn } from "@/hooks/useGSAP";
import type { ProjectDetail, ContentItem } from "@/app/data/projectDetailsData";

interface ProjectDetailClientProps {
  project: ProjectDetail;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const projectDetailRef = useRef<HTMLDivElement | null>(null);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Animation callback for GSAP
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

  // Initialize GSAP animations
  useGSAP(prefersReducedMotion ? () => {} : animationCallback, projectDetailRef);

  // Base URL for assets
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const logoSrc = project.logo.startsWith("http")
    ? project.logo
    : `${baseUrl}${project.logo}`;

  return (
    <>
      {/* Structured Data for SEO */}
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

      {/* Main Project Detail Container */}
      <div className={styles.projectDetailContainer} ref={projectDetailRef}>
        <div className={styles.projectDetail}>
          {/* Project Name */}
          <h1 className={`${styles.projectName} animate`}>{project.name}</h1>

          {/* Logo and Description */}
          <div className={styles.logoAndDescription}>
            <Image
              src={logoSrc}
              alt={`${project.name} Logo`}
              width={200}
              height={200}
              className={styles.projectLogo}
              priority
            />
            <p className={`${styles.projectDescription} animate`}>
              {project.fullDescription}
            </p>
          </div>

          {/* Project Sections */}
          {project.sections.map((section, index) => (
            <div key={`${section.title}-${index}`} className={styles.projectSection}>
              <h2 className={`${styles.sectionTitle} animate`}>{section.title}</h2>
              {Array.isArray(section.content) ? (
                <ul className={styles.sectionList}>
                  {section.content
                    .filter((item: ContentItem) => item.value.trim() !== "")
                    .map((item: ContentItem, idx: number) => {
                      if (item.type === "subheading") {
                        return (
                          <h3
                            key={`${item.value}-${idx}`}
                            className={`${styles.subHeading} animate`}
                          >
                            {item.value}
                          </h3>
                        );
                      } else {
                        return (
                          <li key={`${item.value}-${idx}`} className="animate">
                            {item.value}
                          </li>
                        );
                      }
                    })}
                </ul>
              ) : (
                <p className={`${styles.sectionContent} animate`}>
                  {(section.content as ContentItem).value}
                </p>
              )}
            </div>
          ))}

          {/* Team Section */}
          {project.team && project.team.length > 0 && (
            <div className={styles.teamSection}>
              <h2 className={`${styles.sectionTitle} animate`}>فريق العمل</h2>
              <div className={styles.teamGrid}>
                {project.team.map((member) => (
                  <TeamMemberCard key={member.id} member={member} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}