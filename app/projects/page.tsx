import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProjectsData } from "@/lib/data.server";
import { ProjectsClientWrapper } from "./client";

export default async function ProjectsPage() {
  const projects = await getProjectsData();

  return <ProjectsClientWrapper projects={projects} />;
}
