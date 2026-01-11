"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { PremiumNavbar } from "@/components/premium-navbar";

interface ProjectData {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  timeline?: string;
  status?: string;
}

interface ProjectsClientWrapperProps {
  projects: ProjectData[];
}

export function ProjectsClientWrapper({
  projects,
}: ProjectsClientWrapperProps) {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen selection:bg-amber-300/20 selection:text-amber-100 relative">
      <PremiumNavbar />
      {/* Noise Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient Glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/[0.025] blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[400px] bg-blue-500/[0.02] blur-[120px] pointer-events-none" />

      {/* Header Section */}
      <section className="relative pt-40 pb-32 px-6 md:px-12 lg:px-24 border-b border-white/[0.03]">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <div className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">
                Selected Works
              </span>
            </motion.div>

            <div className="flex items-end gap-6">
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-[-0.05em] uppercase leading-[0.8]">
                Projects
              </h1>
              <motion.span
                initial={{ opacity: 0, x: -20, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-amber-300/90 text-2xl md:text-4xl lg:text-5xl font-serif italic tracking-tight mb-4 md:mb-6 lg:mb-8"
              >
                archive
              </motion.span>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.6,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-px bg-linear-to-r from-amber-400/30 via-white/10 to-transparent origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl text-white/40 max-w-2xl leading-relaxed font-light"
            >
              A showcase of{" "}
              <span className="text-white/90 font-medium">
                systems engineering
              </span>
              , distributed architectures, and technical artifacts.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative px-6 md:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          {projects.length > 0 ? (
            <div className="divide-y divide-white/[0.03]">
              {projects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-32" />
    </main>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        ref={cardRef}
        href={`/projects/${project.slug}`}
        onMouseMove={handleMouseMove}
        className="group relative block py-16 md:py-24 lg:py-32 overflow-hidden"
      >
        {/* Spotlight Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(251, 191, 36, 0.03), transparent 40%)`,
          }}
        />

        {/* Hover Line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-px bg-amber-400/60 origin-top"
          initial={{ scaleY: 0 }}
          whileHover={{ scaleY: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 pl-0 group-hover:pl-8 transition-all duration-500">
          <div className="flex items-start gap-8 md:gap-12 lg:gap-16">
            {/* Number */}
            <span className="text-xs font-mono text-white/15 pt-2 group-hover:text-amber-400/60 transition-colors duration-500 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="space-y-6 flex-1">
              {/* Title */}
              <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-[-0.03em] uppercase leading-[0.95]">
                <span className="inline-block group-hover:text-amber-300 group-hover:italic transition-all duration-500">
                  {project.title}
                </span>
              </h2>

              {/* Description */}
              <p className="text-base md:text-lg lg:text-xl text-white/25 max-w-2xl leading-relaxed group-hover:text-white/50 transition-colors duration-500">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 pt-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/15 group-hover:text-amber-300/40 transition-colors"
                    style={{
                      transitionDelay: `${tagIndex * 50}ms`,
                      transitionDuration: "500ms",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex items-center gap-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-8 group-hover:translate-x-0">
            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-300/80 font-medium">
              View Project
            </span>
            <motion.div
              className="size-16 rounded-full border border-amber-300/20 flex items-center justify-center bg-amber-300/5 backdrop-blur-sm"
              whileHover={{
                scale: 1.1,
                rotate: 45,
                borderColor: "rgba(251, 191, 36, 0.5)",
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="size-6 text-amber-300" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="py-48 lg:py-64 flex flex-col items-center justify-center relative"
    >
      {/* Decorative Elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute size-96 border border-dashed border-white/[0.03] rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute size-64 border border-dashed border-white/[0.02] rounded-full"
      />

      <div className="relative text-center space-y-10">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="size-8 text-amber-400/40 mx-auto mb-6" />
        </motion.div>

        <div className="flex items-end justify-center gap-4">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase">
            Coming
          </h2>
          <motion.span
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-amber-300/90 text-3xl md:text-5xl lg:text-6xl font-serif italic tracking-tight mb-2"
          >
            Soon
          </motion.span>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="h-px w-32 md:w-48 bg-linear-to-r from-transparent via-amber-400/30 to-transparent mx-auto"
        />

        <p className="text-white/25 text-lg md:text-xl max-w-md mx-auto font-light leading-relaxed">
          New projects are currently in the workshop.
          <br />
          <span className="text-white/40">Check back soon!</span>
        </p>
      </div>
    </motion.div>
  );
}
