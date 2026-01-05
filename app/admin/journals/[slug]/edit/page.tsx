"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2, Edit3, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface Props {
  params: Promise<{ slug: string }>;
}

export default function EditJournalPage({ params }: Props) {
  const { slug } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchPost();
  }, [slug]);

  async function fetchPost() {
    try {
      const res = await fetch(`/api/journals/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          category: data.category || "General",
          readingTime: data.readingTime || "5 min",
          content: data.content || "",
          author: data.author || "Author",
          published: data.published || false,
        });
      } else {
        setError("Post not found");
      }
    } catch (err) {
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/journals/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/journals");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update post");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </main>
    );
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
            href="/admin/journals"
            className="inline-flex items-center text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 size-3" />
            Back to Journal
          </Link>
          <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight">
            Edit Journal
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
                Save Changes
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
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/60 border-b border-black/5 pb-4">
                    Post Information
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
                          onChange={(e) =>
                            setForm((p) => ({ ...p, title: e.target.value }))
                          }
                          className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white focus:ring-4 focus:ring-black/2 outline-none transition-all font-light"
                          placeholder="Entry Title"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                          Slug (Read-only)
                        </label>
                        <input
                          type="text"
                          value={form.slug}
                          readOnly
                          className="w-full px-5 py-3.5 rounded-2xl bg-black/5 border border-black/5 outline-none transition-all font-mono text-[10px] text-muted-foreground cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                        Journal Excerpt
                      </label>
                      <textarea
                        value={form.excerpt}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, excerpt: e.target.value }))
                        }
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white outline-none transition-all font-light min-h-[100px] resize-none"
                        placeholder="A concise summary for the index page..."
                      />
                    </div>
                  </div>
                </div>

                {/* Attributes */}
                <div className="space-y-8">
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/60 border-b border-black/5 pb-4">
                    Metadata & Flow
                  </h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                          Category
                        </label>
                        <select
                          value={form.category}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, category: e.target.value }))
                          }
                          className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white transition-all font-light outline-none"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
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
                          className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white outline-none transition-all font-light"
                          placeholder="5 min"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground ml-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={form.author}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, author: e.target.value }))
                        }
                        className="w-full px-5 py-3.5 rounded-2xl bg-white/40 border border-black/5 focus:bg-white outline-none transition-all font-light"
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
                        className="size-4 rounded border-black/10 text-primary focus:ring-primary/20"
                      />
                      <label
                        htmlFor="published"
                        className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground"
                      >
                        Publish Immediately
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editor Section */}
              <div className="space-y-8">
                <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/60 border-b border-black/5 pb-4">
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
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 p-4 rounded-full bg-destructive text-destructive-foreground text-sm shadow-xl flex items-center gap-3 z-50">
          <X className="size-4" />
          {error}
        </div>
      )}
    </main>
  );
}
