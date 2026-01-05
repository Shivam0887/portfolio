import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowUpRight, Ghost } from "lucide-react";
import { getProjectsData } from "@/lib/data.server";

export default async function ProjectsPage() {
  const projects = await getProjectsData();

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="space-y-6 mb-24">
        <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight">
          Projects
        </h1>
        <p className="text-muted-foreground text-xl max-w-xl leading-relaxed font-light">
          A showcase of systems engineering, distributed architectures, and
          technical artifacts.
        </p>
      </div>

      <div className="space-y-24">
        {projects.length > 0 ? (
          projects.map((project) => (
            <article key={project.slug} className="group relative">
              <Link
                href={`/projects/${project.slug}`}
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">View {project.title}</span>
              </Link>

              <div className="flex flex-col md:flex-row md:items-start gap-12">
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    <Badge
                      variant="secondary"
                      className="bg-black/2 text-primary border-black/5 rounded-full px-4 py-1"
                    >
                      {project.status || "Completed"}
                    </Badge>
                    <span>{project.timeline}</span>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-5xl font-serif font-medium group-hover:text-muted-foreground transition-all duration-500 flex items-center justify-between">
                      {project.title}
                      <ArrowUpRight className="size-6 -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-700 opacity-20 group-hover:opacity-100" />
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light text-balance max-w-3xl">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Separator className="mt-20 group-last:hidden bg-black/10" />
            </article>
          ))
        ) : (
          <div className="py-20 text-center space-y-4">
            <Ghost className="text-6xl mx-auto" />
            <p className="text-muted-foreground font-light text-lg italic">
              New projects are currently in the workshop. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
