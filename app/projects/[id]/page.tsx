// app/projects/[id]/page.tsx
import type { Metadata } from "next";
import { projectDetails } from "@/app/data/projectDetailsData";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectDetailClient from "./ProjectDetailClient";
import styles from "@/styles/ProjectDetail.module.scss";
import Link from "next/link";

/** Route params shape */
interface PageProps {
  params: {
    id: string;
  };
}

export const dynamicParams = false;

/* ---------- STATIC PARAMS ---------- */
export function generateStaticParams(): PageProps["params"][] {
  return projectDetails.map(({ id }) => ({ id }));
}

/* ---------- PAGE METADATA ---------- */
export function generateMetadata({ params }: PageProps): Metadata {
  const project = projectDetails.find((p) => p.id === params.id);

  if (!project) {
    return {
      title: "المشروع غير موجود",
      description: "المشروع المطلوب غير متاح.",
      openGraph: {
        title: "المشروع غير موجود",
        description: "المشروع المطلوب غير متاح.",
      },
    };
  }

  const logoUrl = project.logo.startsWith("http")
    ? project.logo
    : `https://syriatech.co${project.logo}`;

  return {
    title: `${project.name} - سيرياتك`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.name} - سيرياتك`,
      description: project.shortDescription,
      url: `https://syriatech.co/projects/${project.id}`,
      images: [
        {
          url: logoUrl,
          width: 800,
          height: 600,
          alt: `${project.name} Logo`,
        },
      ],
      type: "website",
    },
  };
}

/* ---------- PAGE COMPONENT ---------- */
export default function ProjectPage({ params }: PageProps) {
  const project = projectDetails.find((p) => p.id === params.id);

  if (!project) {
    return (
      <>
        <ProjectHeader />
        <div className={styles.projectNotFound}>
          <h1>المشروع غير موجود</h1>
          <p>المشروع المطلوب غير متاح.</p>
          <Link href="/projects">العودة إلى المشاريع</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <ProjectHeader />
      <svg
        className={styles.bgGradient}
        preserveAspectRatio="xMidYMid slice"
        viewBox="10 10 80 80"
      />
      <main className={styles.mainContainer}>
        <ProjectDetailClient project={project} />
      </main>
    </>
  );
}
