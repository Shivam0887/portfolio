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

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    readingTime: { type: String, required: true },
    content: String,
    sections: [SectionSchema],
    published: { type: Boolean, default: false },
    author: { type: String, default: "Author" },
  },
  { timestamps: true }
);

export default models.Post || model("Post", PostSchema, "posts");
