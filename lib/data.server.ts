import "server-only";
import dbConnect from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import Post from "@/lib/models/Post";
import type { ProjectData, Post as PostType } from "@/types/data.types";

// ==================== PROJECTS ====================

export async function getProjectsData(): Promise<ProjectData[]> {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectDataBySlug(
  slug: string
): Promise<ProjectData | undefined> {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug });
    return project ? JSON.parse(JSON.stringify(project)) : undefined;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return undefined;
  }
}

// ==================== POSTS ====================

export async function getPosts(): Promise<PostType[]> {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ date: -1 });
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPublishedPosts(): Promise<PostType[]> {
  try {
    await dbConnect();
    const posts = await Post.find({ published: true }).sort({ date: -1 });
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return [];
  }
}

export async function getPostBySlug(
  slug: string
): Promise<PostType | undefined> {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug });
    return post ? JSON.parse(JSON.stringify(post)) : undefined;
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return undefined;
  }
}
