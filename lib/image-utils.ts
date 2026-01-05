/**
 * Extract all uploadthing URLs from HTML content
 */
export function extractUploadthingUrls(html: string): string[] {
  // Match URLs like https://utfs.io/f/xxxx or https://uploadthing.com/f/xxxx
  const regex =
    /<img[^>]+src=["'](https:\/\/(?:utfs\.io|uploadthing\.com)\/f\/[^"']+)["']/g;
  const matches: string[] = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    matches.push(match[1]);
  }

  return matches;
}
