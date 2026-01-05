import { UTApi } from "uploadthing/server";

// Server-side UTApi instance for programmatic file operations
export const utapi = new UTApi();

/**
 * Delete files from uploadthing by their URLs
 */
export async function deleteUploadthingFiles(urls: string[]): Promise<void> {
  if (urls.length === 0) return;

  try {
    // Extract file keys from URLs
    // Uploadthing URLs look like: https://utfs.io/f/xxxx-xxxx-xxxx.ext
    const fileKeys = urls
      .map((url) => {
        const match = url.match(/\/f\/([^/]+)$/);
        return match ? match[1] : null;
      })
      .filter((key): key is string => key !== null);

    if (fileKeys.length > 0) {
      await utapi.deleteFiles(fileKeys);
      console.log(`Deleted ${fileKeys.length} files from uploadthing`);
    }
  } catch (error) {
    console.error("Failed to delete files:", error);
  }
}
