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
    <main className="relative min-h-screen pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            href="/admin/projects"
            className="inline-flex items-center text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 size-3" />
            Back to Projects
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight">
            New Project
          </h1>
        </motion.div>

        <div className="flex items-center gap-3">
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as any)}
            className="bg-black/5 p-1 rounded-full"
          >
            <TabsList className="bg-transparent border-none">
              <TabsTrigger
                value="edit"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Edit3 className="size-4 mr-2" />
                Edit
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <Eye className="size-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            onClick={handleSubmit}
            disabled={saving || !form.title || !form.slug}
            className="rounded-full px-8 h-12 bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {saving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <>
                <Save className="mr-2 size-4" />
                Publish Project
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left Column: Form Fields */}
        <div
          className={cn(
            "space-y-12 transition-all duration-700",
            view === "edit" ? "lg:col-span-12" : "lg:col-span-5 hidden lg:block"
          )}
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Meta Section */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/60 border-b border-black/5 pb-4">
                General Details
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={handleTitleChange}
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white focus:ring-4 focus:ring-black/2 outline-none transition-all font-light"
                      placeholder="Project Name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, slug: e.target.value }))
                      }
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white focus:ring-4 focus:ring-black/2 outline-none transition-all font-mono text-[10px]"
                      placeholder="project-slug"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                    Brief Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white focus:ring-4 focus:ring-black/2 outline-none transition-all font-light min-h-[100px] resize-none"
                    placeholder="Short elevator pitch..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                      Status
                    </label>
                    <input
                      type="text"
                      value={form.status}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, status: e.target.value }))
                      }
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white focus:ring-4 focus:ring-black/2 outline-none transition-all font-light"
                      placeholder="In Production"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                      Timeline
                    </label>
                    <input
                      type="text"
                      value={form.timeline}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, timeline: e.target.value }))
                      }
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white focus:ring-4 focus:ring-black/2 outline-none transition-all font-light"
                      placeholder="2024 - 2025"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Links & Attributes */}
            <div className="space-y-8">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/60 border-b border-black/5 pb-4">
                Attributes & Links
              </h3>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
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
                      className="flex-1 px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white outline-none transition-all font-light"
                      placeholder="React, Next.js..."
                    />
                    <Button
                      onClick={addTag}
                      variant="outline"
                      className="rounded-2xl size-[54px] border-black/5"
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {form.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="rounded-full pl-3 pr-1 py-1.5 bg-black/5 text-[9px] font-mono tracking-widest uppercase"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                      Live Demo
                    </label>
                    <input
                      type="url"
                      value={form.liveUrl}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, liveUrl: e.target.value }))
                      }
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white transition-all font-light text-sm"
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                      Source Code
                    </label>
                    <input
                      type="url"
                      value={form.githubUrl}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, githubUrl: e.target.value }))
                      }
                      className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white transition-all font-light text-sm"
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
                    className="size-4 rounded border-black/10 text-primary focus:ring-primary/20"
                  />
                  <label
                    htmlFor="featured"
                    className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground"
                  >
                    Feature on homepage
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Section */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/60 border-b border-black/5 pb-4">
              Detailed Case Study Content
            </h3>
            <Editor
              content={form.content}
              onChange={(content) => setForm((p) => ({ ...p, content }))}
              placeholder="Tell the story of this project - the challenge, the architectural choices, and the final impact..."
            />
          </div>
        </div>

        {/* Right Column: Preview (Conditional or Sticky) */}
        {view === "preview" && (
          <div className="lg:col-span-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Preview data={form} type="project" />
          </div>
        )}
      </div>

      {error && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 p-4 rounded-full bg-destructive text-destructive-foreground text-sm shadow-xl flex items-center gap-3 z-50">
          <X className="size-4" />
          {error}
        </div>
      )}
    </main>
  );
}
