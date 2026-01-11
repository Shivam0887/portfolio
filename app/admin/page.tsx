"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Home } from "lucide-react";

export default function AdminDashboard() {
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
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-amber-500/[0.02] blur-[180px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto pt-24 pb-24 px-6">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">
              Authenticated • Admin Session
            </span>
          </div>
        </motion.header>

        {/* Main Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {/* Projects Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/admin/projects" className="block group">
              <div className="border border-white/[0.08] p-10 h-full hover:border-amber-300/30 transition-all duration-500 relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Number */}
                  <span className="text-[120px] font-black text-white/[0.03] absolute -top-8 -right-4 leading-none select-none">
                    01
                  </span>

                  {/* Content */}
                  <div className="relative">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-300/60 mb-4 block">
                      Manage
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-4 group-hover:text-amber-300 transition-colors duration-300">
                      Projects
                    </h2>
                    <p className="text-white/40 mb-8 max-w-sm leading-relaxed">
                      Case studies, technical work, and portfolio pieces.
                    </p>

                    <div className="flex items-center gap-2 text-white/50 group-hover:text-amber-300 transition-colors">
                      <span className="text-sm font-medium uppercase tracking-widest">
                        Enter
                      </span>
                      <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Journal Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link href="/admin/journals" className="block group">
              <div className="border border-white/[0.08] p-10 h-full hover:border-amber-300/30 transition-all duration-500 relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Number */}
                  <span className="text-[120px] font-black text-white/[0.03] absolute -top-8 -right-4 leading-none select-none">
                    02
                  </span>

                  {/* Content */}
                  <div className="relative">
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-300/60 mb-4 block">
                      Write
                    </span>
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-4 group-hover:text-amber-300 transition-colors duration-300">
                      Journal
                    </h2>
                    <p className="text-white/40 mb-8 max-w-sm leading-relaxed">
                      Thoughts, insights, and technical deep-dives.
                    </p>

                    <div className="flex items-center gap-2 text-white/50 group-hover:text-amber-300 transition-colors">
                      <span className="text-sm font-medium uppercase tracking-widest">
                        Enter
                      </span>
                      <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 mb-20"
        >
          <Link
            href="/admin/projects/new"
            className="px-6 py-4 bg-white text-black font-bold text-sm uppercase tracking-tight hover:bg-amber-300 transition-colors flex items-center gap-3"
          >
            New Project
            <ArrowUpRight className="size-4" />
          </Link>
          <Link
            href="/admin/journals/new"
            className="px-6 py-4 border border-white/[0.1] text-white/60 font-medium text-sm uppercase tracking-tight hover:border-amber-300/50 hover:text-amber-300 transition-colors flex items-center gap-3"
          >
            New Journal Entry
            <ArrowUpRight className="size-4" />
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pt-10 border-t border-white/[0.05]"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-white/30 hover:text-amber-300 transition-colors"
          >
            <Home className="size-4" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em]">
              Return to Site
            </span>
          </Link>
        </motion.footer>
      </div>
    </main>
  );
}
