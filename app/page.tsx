import { getProjectsData } from "@/lib/data.server";
import HomeClient from "./HomeClient";

export default async function Home() {
  const allProjects = await getProjectsData();
  const featuredProjects = allProjects.filter((p) => p.featured);

  return <HomeClient featuredProjects={featuredProjects} />;
}
