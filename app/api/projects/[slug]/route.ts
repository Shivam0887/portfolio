import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { deleteUploadthingFiles } from "@/lib/uploadthing";
import { extractUploadthingUrls } from "@/lib/image-utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug: (await params).slug });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch project" },
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
    const project = await Project.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
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

    // First, get the project to extract images
    const project = await Project.findOne({ slug });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Delete associated images from uploadthing
    if (project.content) {
      const uploadthingUrls = extractUploadthingUrls(project.content);
      if (uploadthingUrls.length > 0) {
        await deleteUploadthingFiles(uploadthingUrls);
      }
    }

    // Now delete the project
    await Project.findOneAndDelete({ slug });
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
