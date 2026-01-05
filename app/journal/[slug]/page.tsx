import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Share2, Bookmark, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// Import from server-only data module for RSC
import { getPostBySlug, getPosts } from "@/lib/data.server";
import { notFound } from "next/navigation";
import { MermaidRenderer } from "@/components/ui/mermaid-renderer";

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
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
  const post = await getPostBySlug((await params).slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
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
              variant="secondary"
              className="rounded-full px-5 py-2.5 bg-black/3 border-black/5 text-primary font-mono text-[10px] uppercase tracking-[0.2em]"
            >
              {post.category}
            </Badge>
            <h1 className="text-6xl md:text-9xl font-serif font-medium tracking-tighter leading-[0.8] text-balance">
              {post.title}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-8 text-[11px] text-muted-foreground font-mono uppercase tracking-widest pt-4">
              <span className="flex items-center gap-2">
                <Calendar className="size-3.5 opacity-40" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="size-3.5 opacity-40" />
                {post.readingTime}
              </span>
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
          {/* Main Content */}
          {post.content && (
            <div className="journal-content">
              <MermaidRenderer content={post.content} />
            </div>
          )}

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
                  <p className="text-lg leading-relaxed text-muted-foreground font-normal">
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
                <div className="bg-black/2 border border-black/5 rounded-[2.5rem] p-12 font-mono text-sm overflow-hidden relative group">
                  <div className="absolute top-8 right-10 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-mono">
                    {section.language || "code"}
                  </div>
                  <div className="flex items-center gap-2.5 mb-8 opacity-30">
                    <div className="size-3 rounded-full bg-black/10" />
                    <div className="size-3 rounded-full bg-black/10" />
                    <div className="size-3 rounded-full bg-black/10" />
                  </div>
                  <code className="block whitespace-pre text-foreground/80 overflow-x-auto leading-relaxed">
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
