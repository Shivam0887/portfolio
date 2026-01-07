import { getProjectsData } from "@/lib/data.server";
import Home from "./home";

export default async function Page() {
  const allProjects = await getProjectsData();
  const featuredProjects = allProjects.filter((p) => p.featured);

  return <Home featuredProjects={featuredProjects} />;
}
