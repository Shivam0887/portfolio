"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";
import hljs from "highlight.js";

interface MermaidRendererProps {
  content: string;
}

export const MermaidRenderer = ({ content }: MermaidRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: "neutral",
      securityLevel: "loose",
      fontFamily: "Inter, sans-serif",
    });

    const processContent = async () => {
      if (!containerRef.current) return;

      // Helper function to create copy button
      const createCopyButton = (
        textToCopy: string,
        targetContainer: HTMLElement
      ) => {
        const button = document.createElement("button");
        button.className = "copy-btn";
        button.innerHTML = "<span>Copy</span>";

        button.onclick = async () => {
          try {
            await navigator.clipboard.writeText(textToCopy);
            button.classList.add("copied");
            button.innerHTML = "<span>Copied!</span>";
            setTimeout(() => {
              button.classList.remove("copied");
              button.innerHTML = "<span>Copy</span>";
            }, 2000);
          } catch (err) {
            console.error("Failed to copy:", err);
          }
        };

        targetContainer.appendChild(button);
      };

      // 2. Handle Mermaid Diagrams
      const mermaidBlocks = containerRef.current.querySelectorAll(
        "pre code.language-mermaid"
      );
      const hasMermaid = mermaidBlocks.length > 0;

      mermaidBlocks.forEach((block, index) => {
        const pre = block.parentElement;
        if (!pre) return;

        const diagramContent = block.textContent || "";
        const id = `mermaid-svg-${index}-${Math.random()
          .toString(36)
          .substr(2, 6)}`;

        const outerContainer = document.createElement("div");
        outerContainer.className = "mermaid-container relative group my-12";

        const innerContainer = document.createElement("div");
        // Removed 'mermaid' class from outer div to avoid double-rendering or conflicts
        innerContainer.className =
          "bg-white/50 backdrop-blur-md rounded-[2.5rem] border border-black/5 p-8 transition-all duration-700 hover:shadow-2xl hover:shadow-black/5 flex justify-center overflow-hidden";
        innerContainer.innerHTML = `<div class="mermaid" id="${id}">${diagramContent}</div>`;

        outerContainer.appendChild(innerContainer);
        createCopyButton(diagramContent, outerContainer);

        pre.parentNode?.replaceChild(outerContainer, pre);
      });

      // 3. Render Mermaid - Only if blocks exist
      if (hasMermaid) {
        try {
          // Specify the selector to be more precise
          await mermaid.run({
            nodes: containerRef.current.querySelectorAll(".mermaid"),
          });
        } catch (err) {
          // Only log if it's a real error, sometimes mermaid throws on empty or already rendered
          if (err) console.error("Mermaid rendering failed:", err);
        }
      }

      // 4. Handle Syntax Highlighting, Language Badges, Line Numbers & Copy
      const codeBlocks = containerRef.current.querySelectorAll(
        "pre code:not(.language-mermaid)"
      );
      codeBlocks.forEach((block) => {
        const pre = block.parentElement;
        if (!pre) return;

        // Add relative and group to pre for button positioning
        pre.classList.add("relative", "group");

        // Detect language from class
        const langClass = Array.from(block.classList).find((c) =>
          c.startsWith("language-")
        );
        const lang = langClass ? langClass.replace("language-", "") : null;

        // Add language badge
        if (lang) {
          const badge = document.createElement("span");
          badge.className = "code-lang-badge";
          badge.textContent = lang;
          pre.appendChild(badge);
        }
        // Store original text for clean processing BEFORE highlighting
        const originalText = block.textContent || "";
        const originalLines = originalText.split("\n");

        // Remove empty first and last lines
        while (originalLines.length > 0 && originalLines[0].trim() === "") {
          originalLines.shift();
        }
        while (
          originalLines.length > 0 &&
          originalLines[originalLines.length - 1].trim() === ""
        ) {
          originalLines.pop();
        }

        // Apply highlighting
        hljs.highlightElement(block as HTMLElement);

        // Now get the highlighted HTML and split it
        const highlightedHtml = block.innerHTML;
        let htmlLines = highlightedHtml.split("\n");

        // Remove same number of empty lines from highlighted version
        while (
          htmlLines.length > originalLines.length &&
          htmlLines[0].replace(/<[^>]*>/g, "").trim() === ""
        ) {
          htmlLines.shift();
        }
        while (
          htmlLines.length > originalLines.length &&
          htmlLines[htmlLines.length - 1].replace(/<[^>]*>/g, "").trim() === ""
        ) {
          htmlLines.pop();
        }

        // Ensure htmlLines matches originalLines length exactly
        if (htmlLines.length > originalLines.length) {
          htmlLines = htmlLines.slice(0, originalLines.length);
        }

        // Wrap with line numbers using the correct count
        const wrappedLines = htmlLines
          .map(
            (line, index) =>
              `<span class="code-line"><span class="line-num">${
                index + 1
              }</span>${line || "&nbsp;"}</span>`
          )
          .join("");
        block.innerHTML = wrappedLines;

        // Add copy button (use original text for clean copy)
        createCopyButton(originalLines.join("\n"), pre);
      });

      // 5. Handle Image Lightbox
      const images = containerRef.current.querySelectorAll("img");
      images.forEach((img) => {
        img.onclick = (e) => {
          e.preventDefault();
          const src = img.getAttribute("src");
          if (!src) return;

          // Create lightbox overlay
          const overlay = document.createElement("div");
          overlay.className = "image-lightbox-overlay";

          // Create close button
          const closeBtn = document.createElement("button");
          closeBtn.className = "image-lightbox-close";
          closeBtn.innerHTML = "×";
          closeBtn.onclick = () => overlay.remove();

          // Create full-size image
          const fullImg = document.createElement("img");
          fullImg.className = "image-lightbox-content";
          fullImg.src = src;
          fullImg.alt = img.alt || "Full size image";

          // Close on overlay click (but not on image click)
          overlay.onclick = (e) => {
            if (e.target === overlay) overlay.remove();
          };

          // Close on escape key
          const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
              overlay.remove();
              document.removeEventListener("keydown", handleEscape);
            }
          };
          document.addEventListener("keydown", handleEscape);

          overlay.appendChild(closeBtn);
          overlay.appendChild(fullImg);
          document.body.appendChild(overlay);
        };
      });
    };

    processContent();
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="prose dark:prose-invert prose-neutral max-w-none text-lg text-muted-foreground font-light leading-relaxed"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
