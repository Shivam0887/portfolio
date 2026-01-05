"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useCallback } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Code as CodeIcon,
  Terminal,
  Link as LinkIcon,
  Image as ImageIcon,
  Quote,
  Minus,
  Undo,
  Redo,
  Layout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const lowlight = createLowlight(all);

const LANGUAGES = [
  { label: "Auto", value: null },
  { label: "TypeScript", value: "typescript" },
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "CSS", value: "css" },
  { label: "HTML", value: "html" },
  { label: "JSON", value: "json" },
  { label: "Bash", value: "bash" },
  { label: "SQL", value: "sql" },
  { label: "Markdown", value: "markdown" },
  { label: "Mermaid", value: "mermaid" },
];

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuButton = ({
  onClick,
  isActive = false,
  children,
  className = "",
  disabled = false,
}: {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "size-8 p-0 rounded-lg transition-all duration-200",
      isActive
        ? "bg-black/10 text-primary shadow-inner"
        : "text-muted-foreground hover:bg-black/5 hover:text-primary",
      className
    )}
  >
    {children}
  </Button>
);

export const Editor = ({
  content,
  onChange,
  placeholder = "Start writing...",
}: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block
        heading: {
          levels: [1, 2, 3],
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        enableTabIndentation: true,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-primary underline underline-offset-4 decoration-primary/30",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-neutral max-w-none min-h-[400px] focus:outline-none p-8 font-light leading-relaxed editor-content",
      },
    },
    immediatelyRender: false,
  });

  // Function to delete an image from uploadthing and remove from editor
  const deleteImage = useCallback(
    async (imgElement: HTMLImageElement) => {
      const src = imgElement.getAttribute("src");
      if (!src) return;

      // Only delete from uploadthing if it's an uploadthing URL
      if (src.includes("utfs.io") || src.includes("uploadthing.com")) {
        try {
          await fetch("/api/upload/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: src }),
          });
        } catch (error) {
          console.error("Failed to delete from uploadthing:", error);
        }
      }

      // Remove image from editor by finding and deleting it
      if (editor) {
        const { state } = editor;
        const { doc } = state;
        let pos: number | null = null;

        doc.descendants((node, nodePos) => {
          if (node.type.name === "image" && node.attrs.src === src) {
            pos = nodePos;
            return false;
          }
        });

        if (pos !== null) {
          editor
            .chain()
            .focus()
            .deleteRange({ from: pos, to: pos + 1 })
            .run();
        }
      }
    },
    [editor]
  );

  // Attach delete buttons to images in editor
  useEffect(() => {
    if (!editor) return;

    const editorElement = document.querySelector(".editor-content");
    if (!editorElement) return;

    const attachDeleteButtons = () => {
      const images = editorElement.querySelectorAll("img");
      images.forEach((img) => {
        // Skip if already wrapped
        if (img.parentElement?.classList.contains("editor-image-wrapper")) {
          return;
        }

        // Create wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "editor-image-wrapper";
        wrapper.style.cssText =
          "position: relative; display: inline-block; width: 100%;";

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "editor-image-delete";
        deleteBtn.innerHTML = "×";
        deleteBtn.type = "button";
        deleteBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteImage(img as HTMLImageElement);
        };

        // Wrap image
        img.parentNode?.insertBefore(wrapper, img);
        wrapper.appendChild(img);
        wrapper.appendChild(deleteBtn);
      });
    };

    // Attach on content change
    attachDeleteButtons();
    editor.on("update", attachDeleteButtons);

    return () => {
      editor.off("update", attachDeleteButtons);
    };
  }, [editor, deleteImage]);

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    // Create a hidden file input
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files || files.length === 0) return;

      for (const file of Array.from(files)) {
        // Insert a placeholder while uploading
        const placeholderId = `upload-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 9)}`;

        editor
          .chain()
          .focus()
          .insertContent(
            `<p><em id="${placeholderId}" style="color: #888;">Uploading ${file.name}...</em></p>`
          )
          .run();

        try {
          // Upload to server
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Upload failed");
          }

          const data = await response.json();

          // Remove placeholder and insert the uploaded image
          const placeholder = document.getElementById(placeholderId);
          if (placeholder) {
            placeholder.remove();
          }

          editor.chain().focus().setImage({ src: data.url }).run();
        } catch (error) {
          console.error("Upload error:", error);
          // Remove placeholder on error
          const placeholder = document.getElementById(placeholderId);
          if (placeholder) {
            placeholder.textContent = `Failed to upload ${file.name}`;
          }
        }
      }
    };

    input.click();
  };

  return (
    <div className="group/editor border border-black/5 rounded-4xl overflow-hidden bg-white/40 backdrop-blur-md transition-all duration-500 hover:border-black/10 hover:shadow-2xl hover:shadow-black/2">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-black/5 bg-black/2 sticky top-0 z-20 backdrop-blur-xl">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          <Bold className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          <Italic className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
        >
          <UnderlineIcon className="size-4" />
        </MenuButton>

        <div className="w-px h-6 bg-black/5 mx-1" />

        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          isActive={editor.isActive("heading", { level: 1 })}
        >
          <Heading1 className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          isActive={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="size-4" />
        </MenuButton>

        <div className="w-px h-6 bg-black/5 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
        >
          <List className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
        >
          <ListOrdered className="size-4" />
        </MenuButton>

        <div className="w-px h-6 bg-black/5 mx-1" />

        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
        >
          <Quote className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
        >
          <CodeIcon className="size-4" />
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive("codeBlock")}
        >
          <Terminal className="size-4" />
        </MenuButton>

        {editor.isActive("codeBlock") && (
          <select
            value={editor.getAttributes("codeBlock").language || ""}
            onChange={(e) =>
              editor
                .chain()
                .focus()
                .updateAttributes("codeBlock", { language: e.target.value })
                .run()
            }
            className="text-[10px] font-mono bg-white/50 border border-black/5 rounded-md px-2 py-1 outline-none focus:ring-1 ring-black/10 transition-all"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.label} value={lang.value || ""}>
                {lang.label}
              </option>
            ))}
          </select>
        )}

        <div className="w-px h-6 bg-black/5 mx-1" />

        <MenuButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleCodeBlock({ language: "mermaid" })
              .run()
          }
          isActive={editor.isActive("codeBlock", { language: "mermaid" })}
        >
          <Layout className="size-4" />
        </MenuButton>

        <MenuButton onClick={addImage}>
          <ImageIcon className="size-4" />
        </MenuButton>

        <MenuButton onClick={addLink} isActive={editor.isActive("link")}>
          <LinkIcon className="size-4" />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="size-4" />
        </MenuButton>

        <div className="flex-1" />

        <MenuButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="size-4" />
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="size-4" />
        </MenuButton>
      </div>

      {/* Content Area */}
      <div className="relative">
        <EditorContent editor={editor} />
        {/* Visual guide for premium feel */}
        <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20 hidden md:block">
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Advanced Editor Mode (Tiptap + Lowlight)
          </span>
        </div>
      </div>
    </div>
  );
};
