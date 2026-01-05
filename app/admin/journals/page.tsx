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
  Eye,
  EyeOff,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Post {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: string;
  published: boolean;
}

export default function AdminJournalsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/journals");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setDeleting(slug);
    try {
      const res = await fetch(`/api/journals/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p.slug !== slug));
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeleting(null);
    }
  }

  async function togglePublished(slug: string, currentStatus: boolean) {
    try {
      const res = await fetch(`/api/journals/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentStatus }),
      });
      if (res.ok) {
        setPosts(
          posts.map((p) =>
            p.slug === slug ? { ...p, published: !currentStatus } : p
          )
        );
      }
    } catch (error) {
      console.error("Error updating post:", error);
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
              Journal
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {posts.length} post{posts.length !== 1 ? "s" : ""} •{" "}
              {posts.filter((p) => p.published).length} published
            </p>
          </div>
          <Button
            asChild
            className="rounded-full h-16 px-10 bg-foreground text-background hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 font-medium"
          >
            <Link href="/admin/journals/new">
              <Plus className="mr-3 size-5" />
              New Post
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
      {!loading && posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <p className="text-muted-foreground mb-6">
            No posts yet. Write your first one!
          </p>
          <Button asChild className="rounded-full">
            <Link href="/admin/journals/new">
              <Plus className="mr-2 size-4" />
              Create Post
            </Link>
          </Button>
        </motion.div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Card className="bento-item border-0">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-serif truncate">
                        {post.title}
                      </h3>
                      <Badge
                        variant={post.published ? "default" : "secondary"}
                        className="rounded-full text-xs"
                      >
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{post.date}</span>
                      <span>•</span>
                      <Badge variant="outline" className="rounded-md text-xs">
                        {post.category}
                      </Badge>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-primary/10"
                      onClick={() => togglePublished(post.slug, post.published)}
                      title={post.published ? "Unpublish" : "Publish"}
                    >
                      {post.published ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </Button>
                    {post.published && (
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="rounded-full hover:bg-primary/10"
                      >
                        <Link href={`/journal/${post.slug}`} target="_blank">
                          <ExternalLink className="size-4" />
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="rounded-full hover:bg-primary/10"
                    >
                      <Link href={`/admin/journals/${post.slug}/edit`}>
                        <Pencil className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(post.slug)}
                      disabled={deleting === post.slug}
                    >
                      {deleting === post.slug ? (
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
