"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MermaidRenderer } from "@/components/ui/mermaid-renderer";

interface ProjectDetailClientProps {
  project: any;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen selection:bg-amber-300/20 selection:text-amber-100 relative">
      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient Glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/[0.025] blur-[150px] pointer-events-none" />

      <article className="relative max-w-4xl mx-auto pt-40 pb-32 px-6 md:px-12">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-amber-300 transition-colors mb-16 group"
          >
            <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 mb-16"
        >
          <div className="flex flex-wrap gap-3 mb-6">
            {project.tags.map((tag: string, i: number) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30 px-3 py-1.5 border border-white/[0.06]"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase leading-[0.9]">
            {project.title}
          </h1>

          <p className="text-xl md:text-2xl text-white/40 leading-relaxed max-w-2xl font-light">
            {project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-8">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase text-sm tracking-tight hover:bg-amber-300 transition-colors"
              >
                <ExternalLink className="size-4" />
                View Live
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/10 text-white/60 font-medium uppercase text-sm tracking-tight hover:border-amber-300/50 hover:text-amber-300 transition-colors"
              >
                <Github className="size-4" />
                Source Code
              </motion.a>
            )}
          </div>
        </motion.header>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent origin-left mb-16"
        />

        {/* Meta Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-12 mb-16"
        >
          <div className="space-y-2">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25">
              Role
            </h3>
            <p className="text-lg text-white/80">
              {project.role || "Technical Lead"}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25">
              Timeline
            </h3>
            <p className="text-lg text-white/80">
              {project.timeline || "2024"}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25">
              Status
            </h3>
            <p className="text-lg text-white/80">
              {project.status || "In Production"}
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/[0.03] mb-16" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-16"
        >
          {project.overview && (
            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black tracking-[-0.02em] uppercase">
                Overview
              </h2>
              <p className="text-lg md:text-xl text-white/40 leading-relaxed">
                {project.overview}
              </p>
            </section>
          )}

          {/* Rich Content */}
          {project.content && (
            <div className="prose-dark">
              <MermaidRenderer content={project.content} />
            </div>
          )}

          {project.sections?.map((section: any, idx: number) => (
            <section key={idx} className="space-y-6">
              {section.title && (
                <h3 className="text-2xl md:text-3xl font-black tracking-[-0.02em] uppercase text-white/90">
                  {section.title}
                </h3>
              )}

              {section.type === "text" && (
                <p className="text-lg text-white/40 leading-relaxed">
                  {section.content}
                </p>
              )}

              {section.type === "callout" && (
                <div className="border-l-2 border-amber-400/50 bg-amber-400/[0.03] pl-8 py-6 pr-6 text-lg text-white/60 italic leading-relaxed">
                  {section.content}
                </div>
              )}

              {section.type === "code" && (
                <div className="bg-white/[0.02] border border-white/[0.04] p-8 overflow-hidden relative">
                  <div className="absolute top-4 right-6 text-[10px] uppercase tracking-[0.2em] text-white/20 font-mono">
                    {section.language || "code"}
                  </div>
                  <div className="flex items-center gap-2 mb-6 opacity-30">
                    <div className="size-2.5 rounded-full bg-white/20" />
                    <div className="size-2.5 rounded-full bg-white/20" />
                    <div className="size-2.5 rounded-full bg-white/20" />
                  </div>
                  <code className="block whitespace-pre text-sm text-white/70 overflow-x-auto font-mono leading-relaxed">
                    {section.content}
                  </code>
                </div>
              )}
            </section>
          ))}

          {project.challenge && (
            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-[-0.02em] uppercase">
                The Challenge
              </h2>
              <p className="text-lg text-white/40 leading-relaxed">
                {project.challenge}
              </p>
            </section>
          )}

          {project.solution && (
            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-[-0.02em] uppercase">
                The Solution
              </h2>
              <p className="text-lg text-white/40 leading-relaxed">
                {project.solution}
              </p>
            </section>
          )}

          {project.outcome && (
            <section className="space-y-6">
              <h2 className="text-3xl font-black tracking-[-0.02em] uppercase">
                Results
              </h2>
              <p className="text-lg text-white/40 leading-relaxed">
                {project.outcome}
              </p>
            </section>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-32 pt-16 border-t border-white/[0.03]"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-4 text-white/40 hover:text-amber-300 transition-colors"
          >
            <ChevronLeft className="size-5 group-hover:-translate-x-2 transition-transform" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
              Back to all projects
            </span>
          </Link>
        </motion.div>
      </article>
    </main>
  );
}
