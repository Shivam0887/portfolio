// Shared types - can be imported anywhere
export interface ProjectSection {
  type: "text" | "code" | "image" | "callout";
  title?: string;
  content: string;
  language?: string;
}

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  link: string;
  slug: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  role?: string;
  timeline?: string;
  status?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  sections?: ProjectSection[];
  content?: string; // Tiptap rich text
}

export interface PostSection {
  type: "text" | "code" | "image" | "callout";
  title?: string;
  content: string;
  language?: string;
}

export interface Post {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  readingTime: string;
  content?: string;
  sections?: PostSection[];
  published: boolean;
  author?: string;
}

// Available icons for the admin panel
export const AVAILABLE_ICONS = [
  "Cpu",
  "Code2",
  "Globe",
  "Sparkles",
  "Zap",
  "Database",
  "Shield",
  "Layers",
];
