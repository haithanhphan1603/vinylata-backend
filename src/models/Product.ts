import mongoose, { Schema, Types } from "mongoose";
import ProductMedia from "./ProductMedia";

export default interface Product extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  productMedias: ProductMedia[];
  vendor: Types.ObjectId;
  category: Types.ObjectId;
  createdAt: Date;
}

export const productSchema = new mongoose.Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  price: {
    type: Schema.Types.Number,
    required: true,
  },
  productMedias: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductMedia",
    },
  ],
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const ProductModel = mongoose.model<Product>(
  "Product",
  productSchema,
  "products"
);
