// app/projects/[id]/page.tsx
import type { Metadata } from "next";
import { projectDetails } from "@/app/data/projectDetailsData";
import ProjectDetailClient from "./ProjectDetailClient";
import Link from "next/link";

interface Params {
  id: string;
}

export const dynamicParams = false;

// static params for SSG:
export async function generateStaticParams(): Promise<Params[]> {
  return projectDetails.map(({ id }) => ({ id }));
}

// metadata can now await params
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
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
      url: `https://syriatech.co/projects/${params.id}`,
      images: [{ url: logoUrl, width: 800, height: 600, alt: project.name }],
      type: "website",
    },
  };
}

// the page component now receives params directly
export default async function ProjectPage({
  params,
}: {
  params: Params;
}) {
  const { id } = params;
  const project = projectDetails.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">المشروع غير موجود</h2>
        <p className="mb-6">المشروع المطلوب غير متاح.</p>
        <Link
          href="/projects"
          aria-label="العودة إلى المشاريع"
          className="scroll-link border-dark/10 text-dark hover:bg-brand-50"
        >
          <span>⤴ العودة إلى المشاريع</span>
        </Link>
      </div>
    );
  }

  return (
    <main>
      <ProjectDetailClient project={project} />
    </main>
  );
}
