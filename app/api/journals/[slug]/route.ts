import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/lib/models/Post";
import { deleteUploadthingFiles } from "@/lib/uploadthing";
import { extractUploadthingUrls } from "@/lib/image-utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: (await params).slug });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const slug = (await params).slug;

    // Images are already uploaded to uploadthing, content contains clean URLs
    const post = await Post.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const slug = (await params).slug;

    // First, get the post to extract images
    const post = await Post.findOne({ slug });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Delete associated images from uploadthing
    if (post.content) {
      const uploadthingUrls = extractUploadthingUrls(post.content);
      if (uploadthingUrls.length > 0) {
        await deleteUploadthingFiles(uploadthingUrls);
      }
    }

    // Now delete the post
    await Post.findOneAndDelete({ slug });
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
