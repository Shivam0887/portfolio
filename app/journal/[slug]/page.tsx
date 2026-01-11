import { getPostBySlug, getPosts } from "@/lib/data.server";
import { notFound } from "next/navigation";
import { JournalDetailClient } from "./client";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPostBySlug((await params).slug);

  if (!post) {
    notFound();
  }

  return <JournalDetailClient post={post} />;
}
