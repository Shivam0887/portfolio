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
      console.error("Uploadthing error:", response.error);
      return NextResponse.json(
        { error: `Uploadthing failed: ${response.error.message}` },
        { status: 500 }
      );
    }

    if (!response.data) {
      console.error("No data in Uploadthing response");
      return NextResponse.json(
        { error: "Invalid response from upload service" },
        { status: 500 }
      );
    }

    console.log("Upload successful:", response.data.ufsUrl);

    return NextResponse.json({
      url: response.data.ufsUrl,
      key: response.data.key,
    });
  } catch (error) {
    console.error("Critical upload error:", error);
    return NextResponse.json(
      { error: "Internal server error during upload" },
      { status: 500 }
    );
  }
}
