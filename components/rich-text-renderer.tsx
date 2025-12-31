"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "./code-block"
import { AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"
import type { JSX } from "react" // Declare JSX variable

type ContentBlock =
  | { type: "text"; content: string }
  | { type: "heading"; level: 1 | 2 | 3 | 4; content: string }
  | { type: "code"; language: string; code: string; filename?: string }
  | { type: "callout"; variant: "info" | "warning" | "success" | "error"; content: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; content: string; author?: string }
  | { type: "divider" }

interface RichTextRendererProps {
  blocks: ContentBlock[]
}

const calloutIcons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertCircle,
}

const calloutStyles = {
  info: "border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400",
  warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400",
  success: "border-green-500/30 bg-green-500/5 text-green-600 dark:text-green-400",
  error: "border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-400",
}

export function RichTextRenderer({ blocks }: RichTextRendererProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "text":
            return (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="text-lg leading-relaxed text-foreground/90"
              >
                {block.content}
              </motion.p>
            )

          case "heading":
            const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements
            const headingSizes = {
              1: "text-5xl font-serif font-bold tracking-tight",
              2: "text-4xl font-serif font-bold tracking-tight",
              3: "text-3xl font-medium tracking-tight",
              4: "text-2xl font-medium tracking-tight",
            }
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <HeadingTag className={`${headingSizes[block.level]} mt-12 mb-6`}>{block.content}</HeadingTag>
              </motion.div>
            )

          case "code":
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <CodeBlock code={block.code} language={block.language} filename={block.filename} />
              </motion.div>
            )

          case "callout":
            const Icon = calloutIcons[block.variant]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex gap-4 p-6 rounded-2xl border ${calloutStyles[block.variant]} my-6`}
              >
                <Icon className="size-5 shrink-0 mt-0.5" />
                <p className="text-base leading-relaxed">{block.content}</p>
              </motion.div>
            )

          case "list":
            const ListTag = block.ordered ? "ol" : "ul"
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ListTag
                  className={`space-y-3 ${block.ordered ? "list-decimal" : "list-disc"} list-inside text-lg leading-relaxed`}
                >
                  {block.items.map((item, i) => (
                    <li key={i} className="text-foreground/90">
                      {item}
                    </li>
                  ))}
                </ListTag>
              </motion.div>
            )

          case "quote":
            return (
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-l-4 border-primary/30 pl-6 py-4 my-8 italic text-xl text-foreground/80"
              >
                <p className="mb-2">{block.content}</p>
                {block.author && (
                  <footer className="text-sm font-mono text-muted-foreground not-italic">— {block.author}</footer>
                )}
              </motion.blockquote>
            )

          case "divider":
            return (
              <motion.hr
                key={index}
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="my-12 border-t border-border/30"
              />
            )

          default:
            return null
        }
      })}
    </div>
  )
}
