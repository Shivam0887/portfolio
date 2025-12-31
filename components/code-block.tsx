"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-8 overflow-hidden rounded-2xl border border-border/30 glass-subtle">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/20 bg-secondary/30">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-destructive/60" />
            <div className="size-3 rounded-full bg-yellow-500/60" />
            <div className="size-3 rounded-full bg-green-500/60" />
          </div>
          {filename && <span className="text-sm font-mono text-muted-foreground">{filename}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60">{language}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 px-3 hover:bg-primary/10 transition-all"
          >
            {copied ? (
              <>
                <Check className="mr-1.5 size-3.5 text-green-500" />
                <span className="text-xs">Copied</span>
              </>
            ) : (
              <>
                <Copy className="mr-1.5 size-3.5" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative overflow-x-auto">
        <pre className="p-6 text-sm leading-relaxed">
          <code className={`language-${language} font-mono`}>{code}</code>
        </pre>

        {/* Gradient overlay for visual depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </div>
  )
}
