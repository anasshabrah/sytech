// app/projects/[id]/page.tsx

import { projectDetails, ProjectDetail } from "@/app/data/projectDetailsData";
import ProjectHeader from "@/components/ProjectHeader";
import styles from "@/styles/ProjectDetail.module.scss";
import ProjectDetailClient from "./ProjectDetailClient";
import Link from "next/link";

interface PageProps {
  // Note: In some Next.js versions, params might be a promise.
  params: { id: string } | Promise<{ id: string }>;
}

export async function generateMetadata(ctx: PageProps) {
  const { params } = ctx;
  // Await params in case it is a promise
  const { id } = await params;

  const project = projectDetails.find((proj) => proj.id === id);

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

// Marking the page component as async
export default async function ProjectDetailPage(ctx: PageProps) {
  const { params } = ctx;
  // Await params before using its properties
  const { id } = await params;

  const project: ProjectDetail | undefined = projectDetails.find(
    (proj) => proj.id === id
  );

  if (!project) {
    return (
      <>
        <ProjectHeader showNavigation={false} />
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
      <ProjectHeader showNavigation={false} />

      <svg
        className={styles.bgGradient}
        preserveAspectRatio="xMidYMid slice"
        viewBox="10 10 80 80"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        {/* ... SVG paths ... */}
      </svg>

      <main className={styles.mainContainer}>
        <ProjectDetailClient project={project} />
      </main>
    </>
  );
}
