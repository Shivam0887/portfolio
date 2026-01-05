import { NextResponse } from "next/server";
import { utapi } from "@/lib/uploadthing";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size (4MB max)
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 4MB" },
        { status: 400 }
      );
    }

    // Upload to uploadthing
    const response = await utapi.uploadFiles(file);

    if (response.error) {
      console.error("Upload error:", response.error);
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: response.data.ufsUrl,
      key: response.data.key,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
