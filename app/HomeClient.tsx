"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { iconMap } from "@/lib/utils";
import type { ProjectData } from "@/lib/data.types";

interface HomeClientProps {
  featuredProjects: ProjectData[];
}

export default function HomeClient({ featuredProjects }: HomeClientProps) {
  const router = useRouter();

  return (
    <main className=" relative min-h-screen pt-8 pb-20 px-6 max-w-7xl mx-auto overflow-hidden selection:bg-primary/30">
      {/* Hero Section */}
      <section className="bg-muted-foreground/10 clip-notch relative z-10 p-4 mb-48 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <Badge
              variant="secondary"
              className="rounded-full px-5 py-2.5 bg-black/3 border-black/5 text-primary font-mono text-[10px] uppercase tracking-[0.2em] mb-8"
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="mr-3 size-1.5 rounded-full bg-primary"
              />
              Available for Projects
            </Badge>
          </motion.div>

          <h1 className="text-[clamp(4rem,15vw,10rem)] font-serif font-medium tracking-tighter leading-[0.8] text-balance">
            Building systems <br />
            <span className="italic font-light text-muted-foreground">
              that scale.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-3xl text-muted-foreground max-w-4xl leading-[1.3] font-light text-pretty"
        >
          Software Engineer specializing in{" "}
          <span className="text-foreground">high-performance systems</span>,
          distributed architectures, and experimental developer tools.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4 pt-10"
        >
          <Button
            size="lg"
            onClick={() => router.push("/projects")}
            className="rounded-full px-10 h-16 bg-foreground text-background hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 font-medium"
          >
            Explore Projects
            <ArrowRight className="ml-3 size-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/journal")}
            className="rounded-full px-10 h-16 border-black/10 hover:bg-black/2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 font-light"
          >
            Read Journal
          </Button>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 space-y-16">
        <div className="flex items-end justify-between border-b pb-8 border-border/20">
          <div className="space-y-3">
            <h2 className="text-5xl font-serif font-bold tracking-tight">
              Selected Works
            </h2>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.25em] opacity-60">
              Archive 2023—2025
            </p>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all flex items-center group pb-1 border-b border-transparent hover:border-foreground"
          >
            All Projects
            <ArrowRight className="ml-2 size-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <BentoGrid className="max-w-7xl mx-auto">
          {featuredProjects.map((project, i) => (
            <BentoGridItem
              key={project.slug}
              title={project.title}
              description={project.description}
              header={
                <div className="flex flex-1 w-full h-full min-h-24 rounded-2xl bg-linear-to-br from-black/5 to-transparent border border-black/5 p-4 overflow-hidden relative group/header">
                  <div className="absolute inset-0 bg-grid-black/[0.04] mask-[radial-gradient(white,transparent)]" />
                  <div className="relative z-10 w-full h-full flex items-center justify-center opacity-40 group-hover/bento:opacity-100 transition-opacity duration-700">
                    <span className="text-4xl font-serif text-muted-foreground/40 italic">
                      {project.title.split(" ")[0]}
                    </span>
                  </div>
                </div>
              }
              icon={
                <span className="text-foreground transition-colors duration-500">
                  {iconMap[project.icon] || <Sparkles className="size-6" />}
                </span>
              }
              className={i === 0 || i === 3 ? "md:col-span-2" : ""}
              slug={project.slug}
              tags={project.tags}
            />
          ))}
        </BentoGrid>
      </section>
    </main>
  );
}
