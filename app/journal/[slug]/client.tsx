"use client";

import { ChevronLeft, Share2, Bookmark, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MermaidRenderer } from "@/components/ui/mermaid-renderer";

interface JournalDetailClientProps {
  post: any;
}

export function JournalDetailClient({ post }: JournalDetailClientProps) {
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
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/2.5 blur-[150px] pointer-events-none" />

      <article className="relative max-w-3xl mx-auto pt-40 pb-32 px-6 md:px-12">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-amber-300 transition-colors mb-16 group"
          >
            <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 mb-16"
        >
          {/* Category Badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-[10px] font-mono uppercase tracking-[0.15em] text-amber-300/70 px-4 py-2 border border-amber-300/20 bg-amber-300/3"
          >
            {post.category}
          </motion.span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] uppercase leading-[0.95]">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-8 text-[11px] font-mono uppercase tracking-[0.15em] text-white/30">
            <span className="flex items-center gap-2">
              <Calendar className="size-3.5 text-white/20" />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="size-3.5 text-white/20" />
              {post.readingTime}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/6 text-white/50 text-[10px] font-mono uppercase tracking-[0.15em] hover:border-amber-300/30 hover:text-amber-300 transition-colors"
            >
              <Share2 className="size-3.5" />
              Share
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/6 text-white/50 text-[10px] font-mono uppercase tracking-[0.15em] hover:border-amber-300/30 hover:text-amber-300 transition-colors"
            >
              <Bookmark className="size-3.5" />
              Save
            </motion.button>
          </div>
        </motion.header>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent origin-left mb-16"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-12"
        >
          {/* Rich Content */}
          {post.content && (
            <div className="prose-dark journal-content">
              <MermaidRenderer content={post.content} />
            </div>
          )}

          {/* Sections */}
          {post.sections?.map((section: any, idx: number) => (
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
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-32 pt-16 border-t border-white/[0.03]"
        >
          <div className="bg-white/[0.02] border border-white/[0.04] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/25">
                Written By
              </p>
              <h4 className="text-xl font-black uppercase tracking-tight">
                {post.author || "Technical Architect"}
              </h4>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white text-black font-black uppercase text-sm tracking-tight hover:bg-amber-300 transition-colors"
            >
              Join the Conversation
            </motion.button>
          </div>

          <Link
            href="/journal"
            className="group inline-flex items-center gap-4 text-white/40 hover:text-amber-300 transition-colors mt-12"
          >
            <ChevronLeft className="size-5 group-hover:-translate-x-2 transition-transform" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
              Back to all articles
            </span>
          </Link>
        </motion.footer>
      </article>
    </main>
  );
}
