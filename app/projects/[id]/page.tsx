import type { Metadata } from "next";
import { projectDetails } from "@/app/data/projectDetailsData";
import ProjectDetailClient from "./ProjectDetailClient";
import Link from "next/link";

export const dynamicParams = false;

export async function generateStaticParams() {
  return projectDetails.map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projectDetails.find((p) => p.id === id);

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
      url: `https://syriatech.co/projects/${id}`,
      images: [{ url: logoUrl, width: 800, height: 600, alt: project.name }],
      type: "website",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectDetails.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">المشروع غير موجود</h2>
        <p className="mb-6">المشروع المطلوب غير متاح.</p>
      </div>
    );
  }

  return (
    <main>
      <ProjectDetailClient project={project} />
    </main>
  );
}
