"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2, Edit3, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Editor } from "@/components/admin/editor";
import { Preview } from "@/components/admin/preview";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Distributed Systems",
  "Graphics",
  "Architecture",
  "Web Development",
  "DevOps",
  "Machine Learning",
  "General",
];

export default function NewJournalPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<"edit" | "preview">("edit");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "General",
    readingTime: "5 min",
    content: "",
    author: "Author",
    published: false,
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

  async function handleSubmit() {
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/journals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/journals");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create post");
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
              href="/admin/journals"
              className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-amber-300 transition-colors mb-6 group"
            >
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </Link>
            <h1 className="text-4xl md:text-6xl font-black tracking-[-0.04em] uppercase">
              New Journal
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
          {/* Left Column: Form Fields */}
          <div
            className={cn(
              "space-y-12 transition-all duration-700",
              view === "edit"
                ? "lg:col-span-12"
                : "lg:col-span-12 hidden lg:block"
            )}
          >
            {view === "edit" ? (
              <div className="space-y-12">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Meta Section */}
                  <div className="space-y-8">
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300/60 border-b border-white/[0.05] pb-4">
                      Post Information
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
                            placeholder="Entry Title"
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
                            className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 outline-none transition-all font-mono text-[10px] text-white placeholder:text-white/30"
                            placeholder="entry-slug"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                          Journal Excerpt
                        </label>
                        <textarea
                          value={form.excerpt}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, excerpt: e.target.value }))
                          }
                          className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 outline-none transition-all font-light min-h-[100px] resize-none text-white placeholder:text-white/30"
                          placeholder="A concise summary for the index page..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Attributes */}
                  <div className="space-y-8">
                    <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300/60 border-b border-white/[0.05] pb-4">
                      Metadata & Flow
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                            Category
                          </label>
                          <select
                            value={form.category}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                category: e.target.value,
                              }))
                            }
                            className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 transition-all font-light outline-none text-white"
                          >
                            {CATEGORIES.map((cat) => (
                              <option key={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                            Read Time
                          </label>
                          <input
                            type="text"
                            value={form.readingTime}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                readingTime: e.target.value,
                              }))
                            }
                            className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 outline-none transition-all font-light text-white placeholder:text-white/30"
                            placeholder="5 min"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 ml-1">
                          Author Name
                        </label>
                        <input
                          type="text"
                          value={form.author}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, author: e.target.value }))
                          }
                          className="w-full px-5 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] focus:border-amber-300/30 outline-none transition-all font-light text-white placeholder:text-white/30"
                          placeholder="Your Name"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-4">
                        <input
                          type="checkbox"
                          id="published"
                          checked={form.published}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              published: e.target.checked,
                            }))
                          }
                          className="size-4 rounded border-white/10 bg-white/[0.05] text-amber-400 focus:ring-amber-300/20"
                        />
                        <label
                          htmlFor="published"
                          className="text-[10px] font-mono uppercase tracking-widest text-white/50"
                        >
                          Publish Immediately
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editor Section */}
                <div className="space-y-8">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-300/60 border-b border-white/[0.05] pb-4">
                    Journal Content
                  </h3>
                  <Editor
                    content={form.content}
                    onChange={(content) => setForm((p) => ({ ...p, content }))}
                    placeholder="Share your architectural insights, technical logs, or engineering explorations..."
                  />
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Preview data={form} type="post" />
              </div>
            )}
          </div>
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
