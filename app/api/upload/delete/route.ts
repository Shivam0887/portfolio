import { NextResponse } from "next/server";
import { deleteUploadthingFiles } from "@/lib/uploadthing";

export async function DELETE(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    // Validate it's an uploadthing URL
    if (!url.includes("utfs.io") && !url.includes("uploadthing.com")) {
      return NextResponse.json(
        { error: "Invalid uploadthing URL" },
        { status: 400 }
      );
    }

    await deleteUploadthingFiles([url]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
