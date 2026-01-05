import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for the portfolio app
export const ourFileRouter = {
  // Image uploader for journal and project content
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
  })
    .middleware(async ({ req }) => {
      // For now, allow all uploads (add auth check if needed)
      // In production, you might want to verify the user is authenticated
      return { uploadedAt: new Date().toISOString() };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
