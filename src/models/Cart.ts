import Product from "./Product";
import mongoose, { Schema, Types } from "mongoose";

interface CartItem {
  product: Product["_id"];
  quantity: number;
}

export default interface Cart extends mongoose.Document {
  items: CartItem[];
  user: Types.ObjectId;
  createdAt: Date;
}

const cartSchema = new Schema({
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Schema.Types.Number,
        default: 1,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const CartModel = mongoose.model<Cart>("Cart", cartSchema, "carts");
