"use client";

import { Badge } from "@/components/ui/badge";
import { MermaidRenderer } from "@/components/ui/mermaid-renderer";

interface PreviewProps {
  data: {
    title: string;
    description?: string;
    excerpt?: string;
    content?: string;
    tags?: string[];
    category?: string;
    status?: string;
  };
  type: "project" | "post";
}

export const Preview = ({ data, type }: PreviewProps) => {
  const displayDescription = data.description || data.excerpt;

  return (
    <div className="bg-[#0f0f0f] rounded-2xl border border-white/[0.08] p-8 md:p-12 min-h-[600px] relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-500/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
          {type === "post" && data.category && (
            <Badge
              variant="secondary"
              className="bg-white/[0.05] text-white/70 border-white/[0.08] rounded-full px-4 py-1"
            >
              {data.category}
            </Badge>
          )}
          {type === "project" && data.status && (
            <Badge
              variant="secondary"
              className="bg-white/[0.05] text-white/70 border-white/[0.08] rounded-full px-4 py-1"
            >
              {data.status}
            </Badge>
          )}
          <span className="text-amber-300/60">Preview Mode</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-black tracking-[-0.04em] uppercase text-white leading-tight">
          {data.title || "Untitled"}
        </h1>

        {/* Description */}
        <p className="text-xl text-white/50 leading-relaxed font-light max-w-2xl">
          {displayDescription || "No description provided."}
        </p>

        {/* Tags (if project) */}
        {type === "project" && data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-full px-3 py-0.5 border-white/[0.08] bg-white/[0.03] text-[10px] font-mono uppercase tracking-widest text-white/50"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="w-12 h-px bg-white/[0.08]" />

        {/* Body Content (Rich Text) - Using MermaidRenderer for consistent highlighting and diagrams */}
        <div
          className="prose prose-invert prose-neutral max-w-none 
          prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
          prose-p:text-white/70 prose-p:leading-relaxed
          prose-a:text-amber-300 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-amber-300/80 prose-code:bg-white/[0.05] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-white/[0.08]
          prose-blockquote:border-amber-300/30 prose-blockquote:text-white/60
          prose-li:text-white/70
        "
        >
          <MermaidRenderer content={data.content || ""} />
        </div>

        {data.content === "" && (
          <div className="flex items-center justify-center p-20 border-2 border-dashed border-white/[0.08] rounded-xl">
            <span className="text-white/30 text-sm font-mono tracking-widest">
              Post content will appear here...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
