"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  ExternalLink,
  Loader2,
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

interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  icon: string;
  featured?: boolean;
  status?: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeleting(slug);
    try {
      const res = await fetch(`/api/projects/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.slug !== slug));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <main className="relative min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12"
      >
        <Link
          href="/admin"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-serif font-medium tracking-tight mb-4">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {projects.length} project{projects.length !== 1 ? "s" : ""} in
              your portfolio
            </p>
          </div>
          <Button
            asChild
            className="rounded-full h-16 px-10 bg-foreground text-background hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 font-medium"
          >
            <Link href="/admin/projects/new">
              <Plus className="mr-3 size-5" />
              Add Project
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <p className="text-muted-foreground mb-6">
            No projects yet. Create your first one!
          </p>
          <Button asChild className="rounded-full">
            <Link href="/admin/projects/new">
              <Plus className="mr-2 size-4" />
              Create Project
            </Link>
          </Button>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Card className="bento-item border-0">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl font-serif truncate">
                        {project.title}
                      </CardTitle>
                      {project.featured && (
                        <Badge
                          variant="secondary"
                          className="rounded-full text-xs"
                        >
                          Featured
                        </Badge>
                      )}
                      {project.status && (
                        <Badge
                          variant="outline"
                          className="rounded-full text-xs"
                        >
                          {project.status}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2 mb-3">
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 5).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="font-mono text-[10px] uppercase tracking-wider bg-background/60 rounded-md"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="rounded-full hover:bg-primary/10"
                    >
                      <Link href={`/projects/${project.slug}`} target="_blank">
                        <ExternalLink className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="rounded-full hover:bg-primary/10"
                    >
                      <Link href={`/admin/projects/${project.slug}/edit`}>
                        <Pencil className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(project.slug)}
                      disabled={deleting === project.slug}
                    >
                      {deleting === project.slug ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
