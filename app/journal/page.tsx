import { getPublishedPosts } from "@/lib/data.server";
import { JournalClientWrapper } from "./client";

export default async function JournalPage() {
  const posts = await getPublishedPosts();

  return <JournalClientWrapper posts={posts} />;
}
