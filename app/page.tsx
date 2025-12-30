"use client" // added use client for interactive mouse tracking
import Link from "next/link"
import type React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion" // added motion hooks
import { getFeaturedProjects } from "@/lib/data" // moved projects to centralized data file
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
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
      className="relative min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto overflow-hidden selection:bg-primary/30"
    >
      <Navigation />

      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{
          background: useTransform(
            [x, y],
            ([latestX, latestY]) =>
              `radial-gradient(1000px circle at ${latestX}px ${latestY}px, rgba(var(--primary-rgb), 0.15), transparent 80%)`,
          ),
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 mb-40 space-y-12">
        <motion.div
          style={{ perspective: 1000, rotateX, rotateY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <Badge
              variant="secondary"
              className="rounded-full px-4 border border-primary/20 bg-primary/5 text-primary backdrop-blur-sm"
            >
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="mr-2 size-2 rounded-full bg-primary"
              />
              Available for Q3 Projects
            </Badge>
          </motion.div>

          <h1 className="text-6xl md:text-[7rem] font-sans font-medium tracking-tighter leading-[0.85] text-balance">
            Engineering tools <br />
            <span className="text-gradient-subtle">for the future.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light text-pretty"
        >
          Technical architect specializing in{" "}
          <span className="text-foreground font-normal italic">distributed systems</span>, visual programming, and
          high-performance web infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-6"
        >
          <Button
            size="lg"
            className="rounded-full px-10 h-14 bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10"
          >
            Explore Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-10 h-14 group border-border/60 hover:bg-secondary/40 transition-all hover:scale-105 active:scale-95 bg-transparent backdrop-blur-md"
          >
            Read Journal
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="relative z-10 space-y-16">
        <div className="flex items-end justify-between border-b pb-8 border-border/10">
          <div className="space-y-2">
            <h2 className="text-4xl font-medium tracking-tight">Selected Works</h2>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em]">Archive 2023—2025</p>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all flex items-center group pb-1 border-b border-transparent hover:border-foreground"
          >
            All Projects
            <ArrowRight className="ml-2 size-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="group relative h-[450px] flex flex-col overflow-hidden border-border/10 bg-secondary/5 hover:bg-secondary/10 transition-all duration-700 hover:border-border/40 hover:shadow-2xl hover:shadow-primary/5 rounded-[2rem]">
                <CardHeader className="p-10 flex-1">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="size-14 rounded-2xl bg-background flex items-center justify-center border border-border/10 shadow-sm mb-8 group-hover:border-primary/20 transition-all duration-500"
                  >
                    <span className="text-foreground group-hover:text-primary transition-colors">{project.icon}</span>
                  </motion.div>
                  <CardTitle className="text-3xl mb-4 font-medium tracking-tight group-hover:text-primary transition-colors duration-500">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground/80 leading-relaxed font-light line-clamp-4">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-10">
                  <div className="flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-[10px] uppercase tracking-tighter bg-background/50 text-foreground border-border/10 rounded-lg px-2"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <Link href={`/projects/${project.slug}`} className="absolute inset-0 focus:outline-none z-20">
                  <span className="sr-only">View {project.title}</span>
                </Link>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="absolute -bottom-20 -right-20 size-40 bg-primary/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
