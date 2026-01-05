"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderKanban,
  BookOpen,
  Plus,
  ArrowRight,
  Sparkles,
  LayoutGrid,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverIcon } from "@/components/premium-icons";

export default function AdminDashboard() {
  return (
    <main className="relative min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <Badge
          variant="secondary"
          className="rounded-full px-5 py-2 bg-black/3 border-black/5 text-primary font-mono text-[10px] uppercase tracking-[0.2em] mb-8"
        >
          <Sparkles className="mr-3 size-3.5 opacity-60" />
          System Administrator
        </Badge>
        <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight mb-6">
          Management
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl font-light leading-relaxed">
          The central hub for your high-performance portfolio. Refine your
          projects and journal with editorial precision.
        </p>
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Projects Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Card className="bento-item border-0 cursor-default">
            <CardHeader className="p-8">
              <div className="size-14 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/20 mb-6 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-500">
                <HoverIcon
                  icon={FolderKanban}
                  animation="bounce"
                  className="size-7"
                />
              </div>
              <CardTitle className="text-2xl font-serif mb-2">
                Projects
              </CardTitle>
              <CardDescription className="text-base">
                Showcase your work with detailed project pages
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-4 border border-border/50">
              <div className="flex gap-3">
                <Button
                  asChild
                  className="flex-1 rounded-full h-12 hover:bg-foreground/90 border-0 group/btn"
                >
                  <Link href="/admin/projects">
                    <LayoutGrid className="mr-2 size-4" />
                    View All
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="flex-1 rounded-full h-12 hover:bg-foreground/90"
                >
                  <Link href="/admin/projects/new">
                    <Plus className="mr-2 size-4" />
                    Add New
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Journal Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bento-item border-0 cursor-default">
            <CardHeader className="p-8">
              <div className="size-14 rounded-2xl bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/20 mb-6 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-500">
                <HoverIcon
                  icon={BookOpen}
                  animation="ring"
                  className="size-7"
                />
              </div>
              <CardTitle className="text-2xl font-serif mb-2">
                Journal
              </CardTitle>
              <CardDescription className="text-base">
                Share your thoughts, tutorials, and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-4 border border-border/50">
              <div className="flex gap-3">
                <Button
                  asChild
                  className="flex-1 rounded-full h-12 hover:bg-foreground/90 border-0 group/btn"
                >
                  <Link href="/admin/journals">
                    <LayoutGrid className="mr-2 size-4" />
                    View All
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  className="flex-1 rounded-full h-12 hover:bg-foreground/90 border-0 group/btn"
                >
                  <Link href="/admin/journals/new">
                    <Plus className="mr-2 size-4" />
                    Add New
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Back to Site */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center"
      >
        <Button asChild variant="ghost" className="rounded-full px-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back to Site
          </Link>
        </Button>
      </motion.div>
    </main>
  );
}
