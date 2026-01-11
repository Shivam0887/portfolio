"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Github,
  Twitter,
  Linkedin,
  Send,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion, useMotionValue } from "framer-motion";
import { useState, useRef } from "react";
import { PremiumNavbar } from "@/components/premium-navbar";

export default function NetworkPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (formRef.current) {
      const rect = formRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const socials = [
    {
      name: "GitHub",
      icon: Github,
      handle: "@shivam0887",
      link: "https://github.com/Shivam0887",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      handle: "@shivam0887",
      link: "https://www.linkedin.com/in/shivamsharma0887",
    },
    {
      name: "Email",
      icon: Mail,
      handle: "shivamsharma0887@gmail.com",
      link: "mailto:shivamsharma0887@gmail.com",
    },
  ];

  const focuses = [
    "Distributed Systems",
    "Mobile Apps",
    "Web Development",
    "Generative AI",
    "Backend Development",
  ];

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
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/2.5 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[400px] bg-blue-500/2 blur-[120px] pointer-events-none" />

      {/* Header Section */}
      <section className="relative pt-40 pb-24 px-6 md:px-12 lg:px-24 border-b border-white/2">
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
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                Let&apos;s Build Together
              </span>
            </motion.div>

            <div className="flex items-end gap-6">
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-[-0.05em] uppercase leading-[0.8]">
                Connect
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
                network
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
          </motion.div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="relative px-6 md:px-12 lg:px-24 py-24 lg:py-32">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-24 lg:gap-32">
          {/* Left Column - Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-20"
          >
            {/* Philosophy */}
            <div className="space-y-8">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] uppercase"
              >
                Philosophy
              </motion.h2>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl lg:text-3xl text-white/40 leading-[1.4] font-light">
                  I believe in{" "}
                  <span className="text-white/90 font-medium">
                    tools that augment
                  </span>{" "}
                  human intelligence rather than replace it.
                </p>
                <p className="text-base md:text-lg text-white/50 leading-relaxed">
                  My work lives at the intersection of technical rigor and
                  editorial clarity.
                </p>
              </div>
            </div>

            {/* Technical Focus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                Technical Focus
              </span>
              <div className="flex flex-wrap gap-3 mt-2">
                {focuses.map((focus, i) => (
                  <motion.span
                    key={focus}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{
                      borderColor: "rgba(251, 191, 36, 0.4)",
                      color: "rgba(251, 191, 36, 0.9)",
                      backgroundColor: "rgba(251, 191, 36, 0.05)",
                    }}
                    className="px-5 py-2.5 text-xs font-mono uppercase tracking-[0.15em] text-white/40 border border-white/6 cursor-default transition-all duration-300"
                  >
                    {focus}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50">
                Elsewhere
              </span>
              <div className="divide-y divide-white/30">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="group flex items-center justify-between py-5 transition-colors duration-500"
                  >
                    <div className="flex items-center gap-5">
                      <motion.div
                        whileHover={{
                          scale: 1.15,
                          backgroundColor: "rgba(251, 191, 36, 0.1)",
                        }}
                        className="size-12 rounded-full bg-white/2 border border-white/4 flex items-center justify-center group-hover:border-amber-300/30 transition-all duration-500"
                      >
                        <social.icon className="size-4 text-white/30 group-hover:text-amber-300 transition-colors duration-500" />
                      </motion.div>
                      <span className="text-sm text-white/50 group-hover:text-white transition-colors duration-300">
                        {social.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono tracking-[0.15em] text-white/50 group-hover:text-amber-300/60 transition-colors duration-300">
                        {social.handle}
                      </span>
                      <ArrowUpRight className="size-4 text-white/10 group-hover:text-amber-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            ref={formRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:border-l lg:border-white/3 lg:pl-24 relative"
          >
            {/* Spotlight Effect */}
            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none hidden lg:block"
              style={{
                background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(251, 191, 36, 0.03), transparent 50%)`,
              }}
            />

            <div className="space-y-8 mb-16 relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 mb-4"
              >
                <Sparkles className="size-4 text-amber-400/50" />
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                  Get in Touch
                </span>
              </motion.div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] uppercase">
                Start a{" "}
                <span className="text-amber-300/90 italic font-serif normal-case">
                  Conversation
                </span>
              </h2>
              <p className="text-base md:text-lg text-white/50 leading-relaxed">
                Interested in collaboration, architectural consulting, or just
                sharing ideas?
              </p>
            </div>

            <form className="space-y-10 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3 relative">
                  <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">
                    Name
                  </label>
                  <Input
                    placeholder="Jane Doe"
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-transparent border-0 border-b border-white/6 rounded-none h-14 text-white placeholder:text-white/15 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 transition-colors text-base"
                  />
                  <motion.div
                    className="absolute bottom-3 left-0 h-px bg-linear-to-r from-amber-400/80 to-amber-400/20"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === "name" ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originX: 0, width: "100%" }}
                  />
                </div>
                <div className="space-y-3 relative">
                  <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="jane@example.com"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="bg-transparent border-0 border-b border-white/6 rounded-none h-14 text-white placeholder:text-white/15 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 transition-colors text-base"
                  />
                  <motion.div
                    className="absolute bottom-3 left-0 h-px bg-linear-to-r from-amber-400/80 to-amber-400/20"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === "email" ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originX: 0, width: "100%" }}
                  />
                </div>
              </div>

              <div className="space-y-3 relative">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">
                  Subject
                </label>
                <Input
                  placeholder="Collaboration Proposal"
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-transparent border-0 border-b border-white/6 rounded-none h-14 text-white placeholder:text-white/15 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 transition-colors text-base"
                />
                <motion.div
                  className="absolute bottom-3 left-0 h-px bg-linear-to-r from-amber-400/80 to-amber-400/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === "subject" ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0, width: "100%" }}
                />
              </div>

              <div className="space-y-3 relative">
                <label className="text-xs font-mono uppercase tracking-[0.2em] text-white/50">
                  Message
                </label>
                <Textarea
                  placeholder="How can we work together?"
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="bg-transparent border-0 border-b border-white/6 rounded-none min-h-[180px] text-white placeholder:text-white/15 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 resize-none transition-colors text-base"
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-linear-to-r from-amber-400/80 to-amber-400/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === "message" ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0, width: "100%" }}
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="submit"
                  className="w-full h-16 bg-white text-black hover:bg-amber-300 font-black tracking-[-0.02em] uppercase text-sm transition-all duration-500 group relative overflow-hidden rounded-none"
                >
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-amber-300 to-amber-400"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Send Message
                    <Send className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer Spacer */}
      <div className="h-32" />
    </main>
  );
}
