import { getProjectDataBySlug, getProjectsData } from "@/lib/data.server";
import { notFound } from "next/navigation";
import { ProjectDetailClient } from "./client";

export async function generateStaticParams() {
  const projects = await getProjectsData();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const projectData = await getProjectDataBySlug((await params).slug);

  if (!projectData) {
    notFound();
  }

  return <ProjectDetailClient project={projectData} />;
}
