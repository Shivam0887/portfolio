import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Post";

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ date: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.title || !body.slug || !body.excerpt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure date is set if not provided
    if (!body.date) {
      body.date = new Date().toISOString().split("T")[0];
    }

    // Images are already uploaded to uploadthing, content contains clean URLs
    const post = await Post.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
