import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  Code2,
  Cpu,
  Globe,
  Sparkles,
  Zap,
  Database,
  Shield,
  Layers,
  LucideProps,
} from "lucide-react";
import React from "react";
import type {
  ProjectData,
  Post,
  ProjectSection,
  PostSection,
} from "./data.types";

// Re-export types
export type { ProjectData, Post, ProjectSection, PostSection };
export { AVAILABLE_ICONS } from "./data.types";

export interface Project extends Omit<ProjectData, "icon"> {
  icon: React.ComponentType<LucideProps>;
}

// Icon mapping for dynamic icon resolution
export const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Cpu,
  Code2,
  Globe,
  Sparkles,
  Zap,
  Database,
  Shield,
  Layers,
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
