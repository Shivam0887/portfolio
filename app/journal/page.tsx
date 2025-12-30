import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
// <CHANGE> Import centralized POSTS data
import { getPublishedPosts } from "@/lib/data"

export default function JournalPage() {
  // <CHANGE> Use centralized data source
  const posts = getPublishedPosts()

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <Navigation />

      <div className="space-y-4 mb-20">
        <h1 className="text-4xl font-medium tracking-tight">Journal</h1>
        <p className="text-muted-foreground text-lg max-w-xl">
          A collection of technical essays, engineering logs, and architectural explorations.
        </p>
      </div>

      <div className="space-y-16">
        {posts.map((post) => (
          <article key={post.slug} className="group relative">
            <Link href={`/journal/${post.slug}`} className="absolute inset-0 z-10">
              <span className="sr-only">Read {post.title}</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  <Badge variant="secondary" className="bg-secondary/50 text-[10px] py-0">
                    {post.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {post.readingTime}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-medium group-hover:text-primary transition-colors flex items-center gap-2">
                    {post.title}
                    <ArrowUpRight className="size-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </h2>
                  {/* <CHANGE> Use excerpt from data */}
                  <p className="text-muted-foreground leading-relaxed text-balance">{post.excerpt}</p>
                </div>
              </div>
            </div>

            <Separator className="mt-12 group-last:hidden opacity-50" />
          </article>
        ))}
      </div>
    </main>
  )
}
