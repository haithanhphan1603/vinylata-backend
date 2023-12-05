import { handleAsync } from "../utils/handleAsync";
import { Request, Response } from "express";
import { CartModel } from "../models/Cart";
import { ObjectId } from "mongodb";
import { ProtectedRequest } from "../app-request";

const getAllCart = handleAsync(async (req: Request, res: Response) => {
  const cart = await CartModel.find();
  res.status(200).json({
    message: "success",
    data: {
      data: cart,
    },
  });
});

const getCartById = handleAsync(async (req: Request, res: Response) => {
  const cart = await CartModel.findById(req.params.id);
  if (!cart) {
    res.status(404).json({
      message: "fail",
      data: {
        cart: "cart not found",
      },
    });
  }
  res.status(200).json({
    message: "success",
    data: {
      data: cart,
    },
  });
});

const getCartByUSerId = handleAsync(
  async (req: ProtectedRequest, res: Response) => {
    const cart = await CartModel.findOne({ user: req.user._id });
    if (!cart) {
      res.status(404).json({
        message: "fail",
        data: {
          cart: "cart not found",
        },
      });
    }
    res.status(200).json({
      message: "success",
      data: {
        data: cart,
      },
    });
  }
);

const addToCart = handleAsync(async (req: ProtectedRequest, res: Response) => {
  let cart = await CartModel.findOne({ user: req.user._id });
  const { productId, quantity } = req.body;
  if (cart) {
    const isProductExist = cart.items.some(
      (item) => new ObjectId(productId) === item.product
    );
    if (isProductExist) {
      await CartModel.findOneAndUpdate(
        { id: cart._id, "items.product": new ObjectId(productId) },
        { $inc: { "items.$.quantity": quantity } }
      );
    } else {
      cart = await CartModel.findOneAndUpdate(
        { _id: cart._id },
        { $addToSet: { items: { product: productId, quantity } } },
        { new: true }
      );
    }
  } else {
    cart = await CartModel.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  }
});

const updateCart = handleAsync(async (req: ProtectedRequest, res: Response) => {
  const { productId, quantity } = req.body;
  const cart = await CartModel.findOne(
    { user: req.user._id, "items.product": productId },
    {
      $set: { "items.$.quantity": quantity },
    },
    { new: true }
  );
  res.status(200).json({
    message: "Success",
    data: {
      data: cart,
    },
  });
});

const removeCart = handleAsync(async (req: ProtectedRequest, res: Response) => {
  const { productId } = req.body;
  let cart = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { items: { product: productId } } },
    { new: true }
  );
  if (!cart) {
    res.status(404).json({
      message: "fail",
      data: {
        cart: "cart not found",
      },
    });
  }
  if (cart.items.length === 0) {
    cart = await CartModel.findOneAndDelete({ user: req.user._id });
    res.status(200).json({
      message: "success",
      data: {
        data: null,
      },
    });
  }
  res.status(200).json({
    message: "success",
    data: {
      data: cart,
    },
  });
});

const CartController = {
  getAllCart,
  getCartById,
  getCartByUSerId,
  addToCart,
  removeCart,
  updateCart,
};

export default CartController;
