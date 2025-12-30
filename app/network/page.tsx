"use client"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Github, Twitter, Linkedin, Send } from "lucide-react"
import { motion } from "framer-motion"

export default function NetworkPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <Navigation />

      <div className="grid lg:grid-cols-2 gap-20">
        {/* About / Philosophy Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-medium tracking-tight">Philosophy</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              I believe in tools that augment human intelligence rather than replace it. My work lives at the
              intersection of technical rigor and editorial clarity.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-sm font-mono uppercase tracking-widest text-primary">Technical Focus</h2>
              <div className="flex flex-wrap gap-2">
                {["Distributed Systems", "Visual Programming", "Wasm Runtimes", "Performance Engineering"].map(
                  (focus, i) => (
                    <motion.div
                      key={focus}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <Badge variant="secondary" className="rounded-full px-4 bg-secondary/50 shimmer">
                        {focus}
                      </Badge>
                    </motion.div>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-mono uppercase tracking-widest text-primary">Elsewhere</h2>
              <div className="flex flex-col gap-4">
                {[
                  { name: "GitHub", icon: <Github className="size-4" />, handle: "@username", link: "#" },
                  { name: "Twitter", icon: <Twitter className="size-4" />, handle: "@username", link: "#" },
                  { name: "LinkedIn", icon: <Linkedin className="size-4" />, handle: "Name", link: "#" },
                  { name: "Email", icon: <Mail className="size-4" />, handle: "hello@domain.com", link: "#" },
                ].map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-2xl border border-border/50 hover:bg-secondary/30 transition-all group glow-hover"
                  >
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-full bg-background flex items-center justify-center border border-border/50 group-hover:scale-110 transition-transform">
                        {social.icon}
                      </div>
                      <span className="font-medium">{social.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass gradient-border rounded-3xl p-8 md:p-12 space-y-8 h-fit glow"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-medium">Start a Conversation</h2>
            <p className="text-muted-foreground">
              Interested in collaboration, architectural consulting, or just sharing ideas? Reach out below.
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground ml-1">Name</label>
                  <Input
                    placeholder="Jane Doe"
                    className="rounded-xl bg-background/50 border-border/50 h-12 focus:glow transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground ml-1">Email</label>
                  <Input
                    type="email"
                    placeholder="jane@example.com"
                    className="rounded-xl bg-background/50 border-border/50 h-12 focus:glow transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground ml-1">Subject</label>
                <Input
                  placeholder="Collaboration Proposal"
                  className="rounded-xl bg-background/50 border-border/50 h-12 focus:glow transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground ml-1">Message</label>
                <Textarea
                  placeholder="How can we work together?"
                  className="rounded-xl bg-background/50 border-border/50 min-h-[150px] p-4 focus:glow transition-all"
                />
              </div>
            </div>

            <Button className="w-full rounded-xl h-12 text-base font-medium group bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.02] active:scale-95 shimmer">
              Send Message
              <Send className="ml-2 size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </form>
        </motion.section>
      </div>
    </main>
  )
}
