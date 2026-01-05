"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Github, Twitter, Linkedin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function NetworkPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-24">
        {/* About / Philosophy Section */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-16"
        >
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight">
              Philosophy
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              I believe in tools that augment human intelligence rather than
              replace it. My work lives at the intersection of technical rigor
              and editorial clarity.
            </p>
          </div>

          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/60">
                Technical Focus
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "Distributed Systems",
                  "Visual Programming",
                  "Wasm Runtimes",
                  "Performance Engineering",
                ].map((focus, i) => (
                  <motion.div
                    key={focus}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Badge
                      variant="secondary"
                      className="rounded-full px-5 py-1.5 bg-black/2 border-black/5 text-primary text-[10px] font-mono uppercase tracking-widest"
                    >
                      {focus}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/60">
                Elsewhere
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  {
                    name: "GitHub",
                    icon: <Github className="size-4" />,
                    handle: "@username",
                    link: "#",
                  },
                  {
                    name: "Twitter",
                    icon: <Twitter className="size-4" />,
                    handle: "@username",
                    link: "#",
                  },
                  {
                    name: "LinkedIn",
                    icon: <Linkedin className="size-4" />,
                    handle: "Name",
                    link: "#",
                  },
                  {
                    name: "Email",
                    icon: <Mail className="size-4" />,
                    handle: "hello@domain.com",
                    link: "#",
                  },
                ].map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center justify-between p-5 rounded-2xl border border-black/5 bg-white/40 backdrop-blur-sm hover:bg-white/80 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-xl bg-black/3 flex items-center justify-center border border-black/5 group-hover:scale-105 transition-transform duration-500">
                        {social.icon}
                      </div>
                      <span className="font-medium text-sm">{social.name}</span>
                    </div>
                    <span className="text-xs font-mono tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                      {social.handle}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Network / Contact Form */}
        <motion.section
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-black/5 h-fit shadow-2xl shadow-black/2"
        >
          <div className="space-y-4 mb-10">
            <h2 className="text-3xl font-serif font-medium">
              Start a Conversation
            </h2>
            <p className="text-muted-foreground font-light leading-relaxed">
              Interested in collaboration, architectural consulting, or just
              sharing ideas? Reach out below.
            </p>
          </div>

          <form className="space-y-8">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">
                    Name
                  </label>
                  <Input
                    placeholder="Jane Doe"
                    className="rounded-xl bg-black/2 border-black/5 h-14 focus:bg-white/80 transition-all font-light"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="jane@example.com"
                    className="rounded-xl bg-black/2 border-black/5 h-14 focus:bg-white/80 transition-all font-light"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">
                  Subject
                </label>
                <Input
                  placeholder="Collaboration Proposal"
                  className="rounded-xl bg-black/2 border-black/5 h-14 focus:bg-white/80 transition-all font-light"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground ml-1">
                  Message
                </label>
                <Textarea
                  placeholder="How can we work together?"
                  className="rounded-xl bg-black/2 border-black/5 min-h-[160px] p-5 focus:bg-white/80 transition-all font-light resize-none"
                />
              </div>
            </div>

            <Button className="w-full rounded-2xl h-14 text-sm font-medium group bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.01] active:scale-[0.99]">
              Send Message
              <Send className="ml-3 size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </form>
        </motion.section>
      </div>
    </main>
  );
}
