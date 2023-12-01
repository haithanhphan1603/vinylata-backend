import mongoose from "mongoose";

export default interface CategoryDocument extends mongoose.Document {
  name: string;
  description: string;
  imageSrc: string;
  createdAt: Date;
}

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A category must have a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A category must have a description"],
    unique: true,
  },
  imageSrc: {
    type: String,
    required: [true, "A category must have an image"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const CategoryModel = mongoose.model<CategoryDocument>(
  "Category",
  categorySchema,
  "categories"
);
