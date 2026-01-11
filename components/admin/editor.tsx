"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useCallback, useState } from "react";
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

type FileUpload =
  | {
      id: string;
      name: string;
      status: "uploading";
    }
  | {
      id: string;
      name: string;
      status: "error";
      error: string;
    };

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
        ? "bg-white/10 text-amber-300 shadow-inner"
        : "text-white/50 hover:bg-white/8 hover:text-white",
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
            "text-amber-300 underline underline-offset-4 decoration-amber-300/30",
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
          "prose prose-invert prose-neutral max-w-none min-h-[400px] focus:outline-none p-8 font-light leading-relaxed editor-content prose-headings:text-white prose-p:text-white/80 prose-strong:text-white prose-code:text-amber-300/80 prose-code:bg-white/[0.05] prose-pre:bg-white/[0.03] prose-pre:border prose-pre:border-white/[0.08] prose-blockquote:border-amber-300/30 prose-blockquote:text-white/60 prose-li:text-white/80 prose-a:text-amber-300",
      },
    },
    immediatelyRender: false,
  });

  // Track uploading files
  const [uploadingFiles, setUploadingFiles] = useState<FileUpload[]>([]);

  // Function to delete an image from uploadthing and remove from editor
  const deleteImage = useCallback(
    async (imgElement: HTMLImageElement) => {
      const src = imgElement.getAttribute("src");
      if (!src) return;

      // Only delete from uploadthing if it's an uploadthing URL
      if (src.includes("ufs.sh")) {
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

  // Handle image deletion via event delegation (avoids direct DOM manipulation)
  useEffect(() => {
    if (!editor) return;

    const handleImageClick = (e: Event) => {
      const target = e.target as HTMLElement;
      // Check if clicked on delete button overlay
      if (target.closest(".editor-image-delete-btn")) {
        e.preventDefault();
        e.stopPropagation();
        const imgContainer = target.closest(".editor-image-container");
        const img = imgContainer?.querySelector(
          "img"
        ) as HTMLImageElement | null;
        if (img) {
          deleteImage(img);
        }
      }
    };

    const editorElement = document.querySelector(".editor-content");
    editorElement?.addEventListener("click", handleImageClick);

    return () => {
      editorElement?.removeEventListener("click", handleImageClick);
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

      const results = await Promise.allSettled(
        Array.from(files).map(async (file) => {
          const uploadId = `upload-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 9)}`;

          setUploadingFiles((prev) => [
            ...prev,
            {
              id: uploadId,
              name: file.name,
              status: "uploading",
            },
          ]);

          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return Promise.reject(
              `${uploadId}: ${errorData.error}` ||
                `${uploadId}: Upload failed with status ${response.status}`
            );
          }

          const data = await response.json();

          if (!data.url) {
            return Promise.reject(`${uploadId}: No URL returned from server`);
          }

          return {
            id: uploadId,
            name: file.name,
            url: data.url as string,
          };
        })
      );

      // Separate successful and failed uploads
      const successfulUploads: { id: string; name: string; url: string }[] = [];
      const failedUploadIds: { id: string; reason: string }[] = [];

      results.forEach((image) => {
        if (image.status === "fulfilled") {
          successfulUploads.push(image.value);
        } else {
          const [uploadId, reason] = (image.reason as string).split(":");
          failedUploadIds.push({ id: uploadId, reason });
        }
      });

      // Batch state update: remove successful, mark failed
      if (successfulUploads.length > 0 || failedUploadIds.length > 0) {
        setUploadingFiles((prev) =>
          prev
            .filter((f) => !successfulUploads.some((s) => s.id === f.id))
            .map((f) => {
              const failed = failedUploadIds.find((fail) => fail.id === f.id);
              return failed
                ? { ...f, status: "error" as const, error: failed.reason }
                : f;
            })
        );
      }

      // Insert all images in a single editor transaction
      if (successfulUploads.length > 0) {
        let chain = editor.chain().focus();
        successfulUploads.forEach((img) => {
          chain = chain.setImage({
            src: img.url,
            alt: img.name,
            title: img.name,
          });
        });
        chain.run();
      }
    };

    input.click();
  };

  return (
    <div className="group/editor border border-white/8 rounded-xl overflow-hidden bg-white/2 backdrop-blur-md transition-all duration-500 hover:border-white/12">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/8 bg-white/3 sticky top-0 z-20 backdrop-blur-xl">
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

        <div className="w-px h-6 bg-white/8 mx-1" />

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

        <div className="w-px h-6 bg-white/8 mx-1" />

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

        <div className="w-px h-6 bg-white/8 mx-1" />

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
            className="text-[10px] font-mono bg-white/5 border border-white/8 rounded-md px-2 py-1 outline-none focus:border-amber-300/30 transition-all text-white"
          >
            {LANGUAGES.map((lang) => (
              <option
                key={lang.label}
                value={lang.value || ""}
                className="bg-[#0a0a0a] text-white"
              >
                {lang.label}
              </option>
            ))}
          </select>
        )}

        <div className="w-px h-6 bg-white/8 mx-1" />

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
      <div className="relative bg-[#0f0f0f]">
        <EditorContent editor={editor} />

        {/* Upload Status Overlay */}
        {uploadingFiles.length > 0 && (
          <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2 z-10">
            {uploadingFiles.map((file) => (
              <div
                key={file.id}
                className={cn(
                  "inline-flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-md transition-all duration-300",
                  file.status === "uploading"
                    ? "bg-linear-to-r from-amber-500/10 to-amber-600/5 border border-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                    : "bg-linear-to-r from-red-500/15 to-red-600/8 border border-red-400/30"
                )}
              >
                {file.status === "uploading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
                    <span className="text-sm font-medium text-amber-300/90">
                      Uploading {file.name}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 flex items-center justify-center bg-red-500/20 rounded-full text-red-400 text-xs font-bold">
                      ✕
                    </div>
                    <span className="text-sm font-medium text-red-400">
                      Failed to upload {file.name}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
