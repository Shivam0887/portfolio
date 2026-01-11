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
    <main className="bg-[#0a0a0a] text-white min-h-screen selection:bg-amber-300/20 selection:text-amber-100 relative">
      {/* Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient Glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/[0.025] blur-[150px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto pt-24 pb-20 px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-amber-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-[-0.04em] uppercase leading-[0.9] mb-4">
                Journal
              </h1>
              <p className="text-lg text-white/40 font-light">
                {posts.length} post{posts.length !== 1 ? "s" : ""} •{" "}
                {posts.filter((p) => p.published).length} published
              </p>
            </div>
            <Link
              href="/admin/journals/new"
              className="flex items-center gap-3 h-14 px-8 bg-white text-black font-bold text-sm uppercase tracking-tight hover:bg-amber-300 transition-colors"
            >
              <Plus className="size-5" />
              New Post
            </Link>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="size-8 border-2 border-white/10 border-t-amber-300/50 rounded-full"
            />
          </div>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-white/40 mb-6">
              No posts yet. Write your first one!
            </p>
            <Link
              href="/admin/journals/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm uppercase tracking-tight hover:bg-amber-300 transition-colors"
            >
              <Plus className="size-4" />
              Create Post
            </Link>
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
              <div className="group border border-white/[0.05] bg-white/[0.02] p-6 hover:border-amber-300/20 transition-all duration-500">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-black uppercase tracking-tight truncate group-hover:text-amber-300 transition-colors">
                        {post.title}
                      </h3>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-[0.15em] px-2 py-1 border ${
                          post.published
                            ? "text-green-400/80 border-green-400/20 bg-green-400/[0.05]"
                            : "text-white/40 border-white/[0.06]"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </div>
                    <p className="text-white/40 line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] font-mono text-white/25">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="text-amber-300/60">{post.category}</span>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => togglePublished(post.slug, post.published)}
                      title={post.published ? "Unpublish" : "Publish"}
                      className="size-10 flex items-center justify-center text-white/30 hover:text-amber-300 hover:bg-amber-300/10 transition-colors"
                    >
                      {post.published ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </button>
                    {post.published && (
                      <Link
                        href={`/journal/${post.slug}`}
                        target="_blank"
                        className="size-10 flex items-center justify-center text-white/30 hover:text-amber-300 hover:bg-amber-300/10 transition-colors"
                      >
                        <ExternalLink className="size-4" />
                      </Link>
                    )}
                    <Link
                      href={`/admin/journals/${post.slug}/edit`}
                      className="size-10 flex items-center justify-center text-white/30 hover:text-amber-300 hover:bg-amber-300/10 transition-colors"
                    >
                      <Pencil className="size-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      disabled={deleting === post.slug}
                      className="size-10 flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-50"
                    >
                      {deleting === post.slug ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
