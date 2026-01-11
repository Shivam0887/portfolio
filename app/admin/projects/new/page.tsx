"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2, Plus, X, Eye, Edit3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Editor } from "@/components/admin/editor";
import { Preview } from "@/components/admin/preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [view, setView] = useState<"edit" | "preview">("edit");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    tags: [] as string[],
    icon: "Sparkles",
    featured: false,
    liveUrl: "",
    githubUrl: "",
    role: "",
    timeline: "",
    status: "Completed",
    content: "",
    overview: "",
    challenge: "",
    solution: "",
    outcome: "",
  });

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  }

  function addTag() {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/projects");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create project");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSaving(false);
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

      <div className="relative max-w-7xl mx-auto pt-24 pb-20 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-amber-300 transition-colors mb-6 group"
            >
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
            <h1 className="text-4xl md:text-6xl font-black tracking-[-0.04em] uppercase">
              New Project
            </h1>
          </motion.div>

          <div className="flex items-center gap-3">
            <Tabs
              value={view}
              onValueChange={(v) => setView(v as any)}
              className="bg-white/[0.03] p-1 rounded-full border border-white/[0.05]"
            >
              <TabsList className="bg-transparent border-none">
                <TabsTrigger
                  value="edit"
                  className="rounded-full text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white"
                >
                  <Edit3 className="size-4 mr-2" />
                  Edit
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="rounded-full text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white"
                >
                  <Eye className="size-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              onClick={handleSubmit}
              disabled={saving || !form.title || !form.slug}
              className="px-8 h-12 bg-white text-black font-bold uppercase text-sm tracking-tight hover:bg-amber-300 transition-colors rounded-none"
            >
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <Save className="mr-2 size-4" />
                  Publish
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Form Fields - Hidden in preview mode */}
          {view === "edit" && (
            <div className="lg:col-span-12 space-y-12 animate-in fade-in duration-500">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Meta Section */}
                <div className="space-y-8">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300/60 border-b border-white/[0.05] pb-4">
                    General Details
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={form.title}
                          onChange={handleTitleChange}
                          className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 focus:bg-white/[0.08] outline-none transition-all font-light text-white placeholder:text-white/30"
                          placeholder="Project Name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                          Slug
                        </label>
                        <input
                          type="text"
                          value={form.slug}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, slug: e.target.value }))
                          }
                          className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 focus:bg-white/[0.08] outline-none transition-all font-mono text-[10px] text-white placeholder:text-white/30"
                          placeholder="project-slug"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                        Brief Description
                      </label>
                      <textarea
                        value={form.description}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                        className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 focus:bg-white/[0.08] outline-none transition-all font-light text-white placeholder:text-white/30 min-h-[100px] resize-none"
                        placeholder="Short elevator pitch..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                          Status
                        </label>
                        <input
                          type="text"
                          value={form.status}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, status: e.target.value }))
                          }
                          className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 focus:bg-white/[0.08] outline-none transition-all font-light text-white placeholder:text-white/30"
                          placeholder="In Production"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                          Timeline
                        </label>
                        <input
                          type="text"
                          value={form.timeline}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, timeline: e.target.value }))
                          }
                          className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 focus:bg-white/[0.08] outline-none transition-all font-light text-white placeholder:text-white/30"
                          placeholder="2024 - 2025"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Links & Attributes */}
                <div className="space-y-8">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300/60 border-b border-white/[0.05] pb-4">
                    Attributes & Links
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                        Tags (Comma separated or Enter)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && (e.preventDefault(), addTag())
                          }
                          className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 outline-none transition-all font-light text-white placeholder:text-white/30"
                          placeholder="React, Next.js..."
                        />
                        <Button
                          onClick={addTag}
                          variant="outline"
                          className="rounded-xl size-[54px] border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-white/60"
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {form.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="rounded-full pl-3 pr-1 py-1.5 bg-white/[0.05] border border-white/[0.08] text-[9px] font-mono tracking-widest uppercase text-white/60"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-red-400 text-white/40"
                            >
                              <X className="size-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                          Live Demo
                        </label>
                        <input
                          type="url"
                          value={form.liveUrl}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, liveUrl: e.target.value }))
                          }
                          className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 transition-all font-light text-sm text-white placeholder:text-white/30"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                          Source Code
                        </label>
                        <input
                          type="url"
                          value={form.githubUrl}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              githubUrl: e.target.value,
                            }))
                          }
                          className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 transition-all font-light text-sm text-white placeholder:text-white/30"
                          placeholder="https://github..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={form.featured}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, featured: e.target.checked }))
                        }
                        className="size-4 rounded border-white/10 bg-white/[0.05] text-amber-400 focus:ring-amber-300/20"
                      />
                      <label
                        htmlFor="featured"
                        className="text-[10px] font-mono uppercase tracking-widest text-white/50"
                      >
                        Feature on homepage
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editor Section */}
              <div className="space-y-8">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300/60 border-b border-white/[0.05] pb-4">
                  Detailed Case Study Content
                </h3>
                <Editor
                  content={form.content}
                  onChange={(content) => setForm((p) => ({ ...p, content }))}
                  placeholder="Tell the story of this project - the challenge, the architectural choices, and the final impact..."
                />
              </div>
            </div>
          )}

          {/* Right Column: Preview (Conditional) */}
          {view === "preview" && (
            <div className="lg:col-span-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Preview data={form} type="project" />
            </div>
          )}
        </div>

        {error && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 p-4 bg-red-500/90 text-white text-sm shadow-xl flex items-center gap-3 z-[60]">
            <X className="size-4" />
            {error}
          </div>
        )}
      </div>
    </main>
  );
}
