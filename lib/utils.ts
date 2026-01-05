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
  icon: React.ReactNode;
}

// Icon mapping for dynamic icon resolution
export const iconMap: Record<string, React.ReactNode> = {
  Cpu: React.createElement(Cpu, { className: "size-6" }),
  Code2: React.createElement(Code2, { className: "size-6" }),
  Globe: React.createElement(Globe, { className: "size-6" }),
  Sparkles: React.createElement(Sparkles, { className: "size-6" }),
  Zap: React.createElement(Zap, { className: "size-6" }),
  Database: React.createElement(Database, { className: "size-6" }),
  Shield: React.createElement(Shield, { className: "size-6" }),
  Layers: React.createElement(Layers, { className: "size-6" }),
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
