import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { getProjectDataBySlug, getProjectsData } from "@/lib/data.server";
import { notFound } from "next/navigation";
import {
  Code2,
  Cpu,
  Globe,
  Sparkles,
  Zap,
  Database,
  Shield,
  Layers,
} from "lucide-react";
import React from "react";
import { MermaidRenderer } from "@/components/ui/mermaid-renderer";

// Icon mapping for dynamic icon resolution
const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="size-6" />,
  Code2: <Code2 className="size-6" />,
  Globe: <Globe className="size-6" />,
  Sparkles: <Sparkles className="size-6" />,
  Zap: <Zap className="size-6" />,
  Database: <Database className="size-6" />,
  Shield: <Shield className="size-6" />,
  Layers: <Layers className="size-6" />,
};

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

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <article className="max-w-3xl mx-auto space-y-12">
        {/* Project Header */}
        <header className="space-y-8 text-center md:text-left">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="size-4" />
            Back to Work
          </Link>

          <div className="space-y-8">
            <h1 className="text-6xl md:text-9xl font-serif font-medium tracking-tighter leading-[0.8] text-balance">
              {projectData.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-[1.2] font-normal text-pretty">
              {projectData.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {projectData.tags.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="font-mono text-[10px] uppercase tracking-wider bg-secondary/50 border-border/10"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-8">
              {projectData.liveUrl && (
                <Button
                  size="lg"
                  className="rounded-full px-10 h-12 bg-foreground text-background hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 font-medium"
                >
                  <ExternalLink className="size-5 mr-3" />
                  View Live
                </Button>
              )}
              {projectData.githubUrl && (
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-10 h-12 border-black/10 hover:bg-black/2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 font-light"
                >
                  <Github className="size-5 mr-3" />
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
              {projectData.role || "Technical Lead & Architect"}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              Timeline
            </h3>
            <p className="text-lg">
              {projectData.timeline || "2024 - Present"}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
              Status
            </h3>
            <p className="text-lg">{projectData.status || "In Production"}</p>
          </div>
        </div>

        <Separator className="opacity-30" />

        {/* Project Content - Enhanced for high customization */}
        <div className="space-y-16">
          <div className="prose dark:prose-invert prose-neutral max-w-none">
            <div className="space-y-12">
              {projectData.overview && (
                <section className="space-y-4">
                  <h2 className="text-4xl font-serif font-medium tracking-tight">
                    Overview
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed font-light">
                    {projectData.overview}
                  </p>
                </section>
              )}

              {/* Tiptap Content Rendering */}
              {projectData.content && (
                <MermaidRenderer content={projectData.content} />
              )}

              {projectData.sections?.map((section: any, idx: number) => (
                <div key={idx} className="space-y-6 pt-8">
                  {section.title && (
                    <h3 className="text-3xl font-serif font-medium tracking-tight text-foreground">
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
                    <div className="bg-black/2 border border-black/5 rounded-[2.5rem] p-12 font-mono text-sm overflow-hidden relative group">
                      <div className="absolute top-8 right-10 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-mono">
                        {section.language || "source"}
                      </div>
                      <div className="flex items-center gap-2.5 mb-8 opacity-30">
                        <div className="size-3 rounded-full bg-black/10" />
                        <div className="size-3 rounded-full bg-black/10" />
                        <div className="size-3 rounded-full bg-black/10" />
                      </div>
                      <code className="block whitespace-pre text-foreground/80 overflow-x-auto leading-relaxed">
                        {section.content}
                      </code>
                    </div>
                  )}
                </div>
              ))}

              {projectData.challenge && (
                <section className="space-y-4">
                  <h2 className="text-3xl font-medium tracking-tight">
                    The Challenge
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {projectData.challenge}
                  </p>
                </section>
              )}

              {projectData.solution && (
                <section className="space-y-4">
                  <h2 className="text-3xl font-medium tracking-tight">
                    The Solution
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {projectData.solution}
                  </p>
                </section>
              )}

              {projectData.outcome && (
                <section className="space-y-4">
                  <h2 className="text-3xl font-medium tracking-tight">
                    Results
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {projectData.outcome}
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
