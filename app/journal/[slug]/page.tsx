import { Navigation } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// Import centralized data utilities
import { getPostBySlug, POSTS } from "@/lib/data";
import { notFound } from "next/navigation";

// Generate static params for all posts
export function generateStaticParams() {
  return POSTS.map((post) => ({
    slug: post.slug,
  }));
}

// Add dynamic page props
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Fetch post data from centralized source
  const post = getPostBySlug((await params).slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <Navigation />

      <article className="max-w-3xl mx-auto space-y-12">
        {/* Post Header */}
        <header className="space-y-8 text-center md:text-left">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="size-4" />
            Back to Journal
          </Link>

          <div className="space-y-4">
            <Badge
              variant="outline"
              className="rounded-full px-4 border-border/50 uppercase tracking-widest text-[10px]"
            >
              {/* Use dynamic category */}
              {post.category}
            </Badge>
            {/* Use dynamic title */}
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1]">
              {post.title}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground font-mono">
              {/* Use dynamic date and reading time */}
              <span>{post.date}</span>
              <span>{post.readingTime} read</span>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 bg-transparent"
            >
              <Share2 className="size-3.5" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 bg-transparent"
            >
              <Bookmark className="size-3.5" />
              Save
            </Button>
          </div>
        </header>

        <Separator className="opacity-50" />

        {/* Post Content - Glossy Editorial Style */}
        <div className="space-y-12">
          {/* Main Content / Introduction */}
          <div className="prose dark:prose-invert prose-neutral max-w-none">
            <p className="text-xl leading-relaxed text-muted-foreground first-letter:text-5xl first-letter:font-medium first-letter:mr-3 first-letter:float-left first-letter:text-foreground">
              {post.content}
            </p>
          </div>

          {/* Render Sections dynamically for high customization */}
          {post.sections?.map((section, idx) => (
            <div key={idx} className="space-y-6">
              {section.title && (
                <h3 className="text-2xl font-medium tracking-tight text-foreground">
                  {section.title}
                </h3>
              )}

              {section.type === "text" && (
                <div className="prose dark:prose-invert prose-neutral max-w-none">
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                </div>
              )}

              {section.type === "callout" && (
                <div className="bg-primary/5 border-l-2 border-primary p-8 rounded-r-2xl italic text-lg leading-relaxed text-foreground">
                  {section.content}
                </div>
              )}

              {section.type === "code" && (
                <div className="bg-secondary/30 border border-border/50 rounded-2xl p-8 font-mono text-sm overflow-hidden relative group">
                  <div className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-muted-foreground opacity-50 font-mono">
                    {section.language || "code"}
                  </div>
                  <div className="flex items-center gap-2 mb-4 opacity-50">
                    <div className="size-2 rounded-full bg-red-500/50" />
                    <div className="size-2 rounded-full bg-amber-500/50" />
                    <div className="size-2 rounded-full bg-green-500/50" />
                  </div>
                  <code className="block whitespace-pre text-foreground/90 overflow-x-auto">
                    {section.content}
                  </code>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer info */}
        <footer className="pt-20 pb-10">
          <div className="glass rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                Written By
              </p>
              <h4 className="text-xl font-medium">
                {post.author || "Technical Architect"}
              </h4>
            </div>
            <Button className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 transition-all">
              Join the Conversation
            </Button>
          </div>
        </footer>
      </article>
    </main>
  );
}
