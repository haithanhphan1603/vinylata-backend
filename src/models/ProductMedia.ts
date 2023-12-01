import mongoose, { Schema } from "mongoose";

enum UrlType {
  IMAGE = "image",
  VIDEO = "video",
}

export default interface ProductMedia extends mongoose.Document {
  productUrl: string;
  mediaType: UrlType;
}

const productMediaSchema = new mongoose.Schema(
  {
    productUrl: {
      type: Schema.Types.String,
      required: [true, "A product media must have a url"],
    },
    mediaType: {
      type: Schema.Types.String,
      required: true,
      enum: [UrlType.IMAGE, UrlType.VIDEO],
    },
  },
  {
    versionKey: false,
  }
);

export const ProductMediaModel = mongoose.model<ProductMedia>(
  "ProductMedia",
  productMediaSchema,
  "productMedias"
);
