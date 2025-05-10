"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/app/types";
import styles from "@/styles/Projects.module.scss";
import SectionTitle from "./SectionTitle";
import useGSAP from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    (selector) => {
      const projectCards = selector(`.${styles.projectCard}`);
      if (projectCards.length > 0) {
        gsap.from(projectCards, {
          stagger: 0.2,
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="our-projects" className={styles.projectsSection}>
      <SectionTitle subtitle="تعرف على مشاريعنا" title="مشاريعنا" />
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className={styles.projectLink}
          >
            <div className={styles.projectCard}>
              <div className={styles.projectImageWrapper}>
                <Image
                  src={project.logo}
                  alt={`${project.name} Logo`}
                  width={150}
                  height={150}
                  className={styles.projectLogo}
                />
              </div>
              <h3 className={styles.projectName}>{project.name}</h3>
              <p className={styles.projectDescription}>
                {project.shortDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Projects;
