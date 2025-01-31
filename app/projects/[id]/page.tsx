import type { Metadata } from "next";
import { projectDetails } from "@/app/data/projectDetailsData";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectDetailClient from "./ProjectDetailClient";
import styles from "@/styles/ProjectDetail.module.scss";
import Link from "next/link";

// Force Next to only allow the IDs returned by generateStaticParams
export const dynamicParams = false;

/**
 * 1) Return a Promise<Array<{ id: string }>>.
 *    Ensures Next sees your route IDs as fully static.
 */
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return projectDetails.map((proj) => ({ id: proj.id }));
}

/**
 * 2) Inline the param type for generateMetadata
 */
export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
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
          alt: `${project.name} Logo`
        }
      ],
      type: "website"
    }
  };
}

/**
 * 3) Inline the param type for default Page
 */
export default function Page({ params }: { params: { id: string } }) {
  const project = projectDetails.find((p) => p.id === params.id);

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
      >
        {/* ...your optional svg content */}
      </svg>
      <main className={styles.mainContainer}>
        <ProjectDetailClient project={project} />
      </main>
    </>
  );
}
