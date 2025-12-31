"use client" // added use client for interactive mouse tracking
import Link from "next/link"
import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion" // added motion hooks
import { getFeaturedProjects } from "@/lib/data" // moved projects to centralized data file
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"
import { useState } from "react" // Added state for interactive hero

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const rotateX = useTransform(y, [0, 500], [5, -5])
  const rotateY = useTransform(x, [0, 1000], [-5, 5])

  const featuredProjects = getFeaturedProjects()

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <main
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden selection:bg-primary/30"
    >
      <Navigation />

      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background: useTransform(
            [x, y],
            ([latestX, latestY]) =>
              `radial-gradient(800px circle at ${latestX}px ${latestY}px, rgba(115, 115, 115, 0.12), transparent 70%)`,
          ),
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 mb-48 space-y-12">
        <motion.div
          style={{ perspective: 1000, rotateX, rotateY }}
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
              className="rounded-full px-5 py-2 glass-subtle shimmer border-primary/30 text-primary font-mono text-xs tracking-wider"
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="mr-2 size-2 rounded-full bg-primary glow"
              />
              Available for Projects
            </Badge>
          </motion.div>

          <h1 className="text-7xl md:text-[9rem] font-serif font-bold tracking-tighter leading-[0.85] text-balance">
            Building systems <br />
            <span className="text-gradient italic font-light">that scale.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-light text-pretty pl-1"
        >
          Senior UI/UX Engineer specializing in <span className="text-foreground font-medium">distributed systems</span>
          , design tooling, and high-performance infrastructure that powers the next generation of digital products.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-6 pl-1"
        >
          <Button
            size="lg"
            className="rounded-full px-10 h-14 bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-black/20 font-medium"
          >
            <Sparkles className="mr-2 size-4" />
            Explore Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-10 h-14 group glass-subtle hover:glass transition-all hover:scale-105 active:scale-95 font-medium bg-transparent"
          >
            Read Journal
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 space-y-16">
        <div className="flex items-end justify-between border-b pb-8 border-border/20">
          <div className="space-y-3">
            <h2 className="text-5xl font-serif font-bold tracking-tight">Selected Works</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[280px]">
          {featuredProjects.map((project, i) => {
            const sizes = [
              "md:col-span-6 lg:col-span-7 md:row-span-2",
              "md:col-span-3 lg:col-span-5 md:row-span-1",
              "md:col-span-3 lg:col-span-5 md:row-span-1",
            ]
            const size = sizes[i % sizes.length]

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={size}
              >
                <Card className="group relative h-full flex flex-col overflow-hidden border-border/20 glass-subtle hover:glass-strong transition-all duration-700 hover:border-border/50 hover:shadow-2xl hover:shadow-primary/10 rounded-3xl">
                  <CardHeader className="p-8 lg:p-10 flex-1 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="size-16 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/20 shadow-sm mb-6 group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-500"
                    >
                      <span className="text-2xl group-hover:text-primary transition-colors">{project.icon}</span>
                    </motion.div>
                    <CardTitle className="text-3xl lg:text-4xl mb-4 font-serif font-bold tracking-tight group-hover:text-gradient transition-all duration-500">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground/90 leading-relaxed font-light line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 lg:px-10 pb-8 lg:pb-10 relative z-10">
                    <div className="flex flex-wrap gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                      {project.tags.slice(0, 4).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="font-mono text-[10px] uppercase tracking-wider bg-background/60 backdrop-blur-sm text-foreground border-border/20 rounded-lg px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <Link href={`/projects/${project.slug}`} className="absolute inset-0 focus:outline-none z-20">
                    <span className="sr-only">View {project.title}</span>
                  </Link>
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute -bottom-32 -right-32 size-64 bg-primary/15 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay" />
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
