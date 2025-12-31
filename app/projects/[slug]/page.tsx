import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { getProjectBySlug, PROJECTS } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProjectBySlug((await params).slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <Navigation />

      <article className="max-w-5xl mx-auto space-y-16">
        {/* Project Header */}
        <header className="space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="size-4" />
            Back to Work
          </Link>

          <div className="space-y-6">
            <div className="size-16 rounded-3xl bg-secondary/30 flex items-center justify-center border border-border/20 shadow-sm">
              <span className="text-primary">{project.icon}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[0.95]">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-mono text-[10px] uppercase tracking-wider bg-secondary/50 border-border/10"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              {project.liveUrl && (
                <Button
                  size="lg"
                  className="rounded-full gap-2 bg-foreground text-background hover:bg-foreground/90"
                >
                  <ExternalLink className="size-4" />
                  View Live
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full gap-2 bg-transparent"
                >
                  <Github className="size-4" />
                  Source Code
                </Button>
              )}
            </div>
          </div>
        </header>

        <Separator className="opacity-30" />

        {/* Project Details Grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-2">
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              Role
            </h3>
            <p className="text-lg">
              {project.role || "Technical Lead & Architect"}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              Timeline
            </h3>
            <p className="text-lg">{project.timeline || "2024 - Present"}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              Status
            </h3>
            <p className="text-lg">{project.status || "In Production"}</p>
          </div>
        </div>

        <Separator className="opacity-30" />

        {/* Project Content - Enhanced for high customization */}
        <div className="space-y-16">
          <div className="prose dark:prose-invert prose-neutral max-w-none">
            <div className="space-y-12">
              {project.overview && (
                <section className="space-y-4">
                  <h2 className="text-3xl font-medium tracking-tight">
                    Overview
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed font-light">
                    {project.overview}
                  </p>
                </section>
              )}

              {project.sections?.map((section, idx) => (
                <div key={idx} className="space-y-6 pt-8">
                  {section.title && (
                    <h3 className="text-2xl font-medium tracking-tight text-foreground">
                      {section.title}
                    </h3>
                  )}

                  {section.type === "text" && (
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  )}

                  {section.type === "callout" && (
                    <div className="bg-primary/5 border-l-2 border-primary p-10 rounded-r-3xl italic text-xl leading-relaxed text-foreground glass">
                      {section.content}
                    </div>
                  )}

                  {section.type === "code" && (
                    <div className="bg-secondary/30 border border-border/50 rounded-[2rem] p-10 font-mono text-sm overflow-hidden relative group glass">
                      <div className="absolute top-6 right-8 text-[10px] uppercase tracking-widest text-muted-foreground opacity-50 font-mono">
                        {section.language || "source"}
                      </div>
                      <div className="flex items-center gap-2 mb-6 opacity-50">
                        <div className="size-2.5 rounded-full bg-red-500/50" />
                        <div className="size-2.5 rounded-full bg-amber-500/50" />
                        <div className="size-2.5 rounded-full bg-green-500/50" />
                      </div>
                      <code className="block whitespace-pre text-foreground/90 overflow-x-auto leading-relaxed">
                        {section.content}
                      </code>
                    </div>
                  )}
                </div>
              ))}

              {project.challenge && (
                <section className="space-y-4">
                  <h2 className="text-3xl font-medium tracking-tight">
                    The Challenge
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.challenge}
                  </p>
                </section>
              )}

              {project.solution && (
                <section className="space-y-4">
                  <h2 className="text-3xl font-medium tracking-tight">
                    The Solution
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.solution}
                  </p>
                </section>
              )}

              {project.outcome && (
                <section className="space-y-4">
                  <h2 className="text-3xl font-medium tracking-tight">
                    Results
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.outcome}
                  </p>
                </section>
              )}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
