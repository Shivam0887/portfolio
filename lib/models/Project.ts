import mongoose, { Schema, model, models } from "mongoose";

const SectionSchema = new Schema({
  type: {
    type: String,
    enum: ["text", "code", "image", "callout"],
    required: true,
  },
  title: String,
  content: { type: String, required: true },
  language: String,
});

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    icon: { type: String, default: "Sparkles" },
    link: String,
    slug: { type: String, required: true, unique: true },
    featured: { type: Boolean, default: false },
    liveUrl: String,
    githubUrl: String,
    role: String,
    timeline: String,
    status: String,
    overview: String,
    challenge: String,
    solution: String,
    outcome: String,
    sections: [SectionSchema],
    content: { type: String }, // For Tiptap rich text content
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema, "projects");
