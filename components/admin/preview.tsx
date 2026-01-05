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
    <div className="bg-[#fcfcfc] rounded-[2.5rem] border border-black/5 p-8 md:p-12 shadow-2xl shadow-black/2 min-h-[600px] relative overflow-hidden">
      {/* Background Decorative elements to match frontend */}
      <div className="absolute inset-0 bg-grid-black/2 mask-[radial-gradient(white,transparent)] pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {type === "post" && data.category && (
            <Badge
              variant="secondary"
              className="bg-black/2 text-primary border-black/5 rounded-full px-4 py-1"
            >
              {data.category}
            </Badge>
          )}
          {type === "project" && data.status && (
            <Badge
              variant="secondary"
              className="bg-black/2 text-primary border-black/5 rounded-full px-4 py-1"
            >
              {data.status}
            </Badge>
          )}
          <span>Preview Mode</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-balance leading-tight">
          {data.title || "Untitled"}
        </h1>

        {/* Description */}
        <p className="text-xl text-muted-foreground leading-relaxed font-light max-w-2xl">
          {displayDescription || "No description provided."}
        </p>

        {/* Tags (if project) */}
        {type === "project" && data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="rounded-full px-3 py-0.5 border-black/5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="w-12 h-px bg-black/5" />

        {/* Body Content (Rich Text) - Using MermaidRenderer for consistent highlighting and diagrams */}
        <MermaidRenderer content={data.content || ""} />

        {data.content === "" && (
          <div className="flex items-center justify-center p-20 border-2 border-dashed border-black/5 rounded-3xl">
            <span className="text-muted-foreground text-sm font-mono tracking-widest">
              Post content will appear here...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
