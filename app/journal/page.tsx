import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight, Brush } from "lucide-react";
// Import from server-only data module
import { getPublishedPosts } from "@/lib/data.server";

export default async function JournalPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="space-y-6 mb-24">
        <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight">
          Journal
        </h1>
        <p className="text-muted-foreground text-xl max-w-xl leading-relaxed font-light">
          A collection of technical essays, engineering logs, and architectural
          explorations.
        </p>
      </div>

      <div className="space-y-24">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="group relative">
              <Link
                href={`/journal/${post.slug}`}
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">Read {post.title}</span>
              </Link>

              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    <Badge
                      variant="secondary"
                      className="bg-black/2 text-primary border-black/5 rounded-full px-4 py-1"
                    >
                      {post.category}
                    </Badge>
                    <span className="flex items-center gap-2">
                      <Calendar className="size-3 opacity-40" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="size-3 opacity-40" />
                      {post.readingTime}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-5xl font-serif font-medium group-hover:text-muted-foreground transition-all duration-500 flex items-center gap-4">
                      {post.title}
                      <ArrowUpRight className="size-6 -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-700" />
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light text-balance">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="mt-16 group-last:hidden bg-black/10" />
            </article>
          ))
        ) : (
          <div className="py-20 text-center space-y-4">
            <Brush className="text-6xl mx-auto" />
            <p className="text-muted-foreground font-light text-lg italic">
              The ink is still drying on new entries. Thoughts taking shape
              soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
