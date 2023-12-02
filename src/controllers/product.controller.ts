import Product, { ProductModel } from "../models/Product";
import ProductMedia, {
  ProductMediaModel,
  UrlType,
} from "../models/ProductMedia";
import { handleAsync } from "../utils/handleAsync";
import { Request, Response } from "express";

const getAllProducts = handleAsync(async (req: Request, res: Response) => {
  const products = await ProductModel.find().populate("category");
  res.status(200).json({
    status: "Success",
    data: {
      data: products,
    },
  });
});

const getProductById = handleAsync(async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  res.status(200).json({
    status: "Success",
    data: {
      data: product,
    },
  });
});

const createProduct = handleAsync(async (req: Request, res: Response) => {
  let medias: ProductMedia[] = [];
  let mediaType: string = "";
  for (const productMedia of req.body.productMedias) {
    if (productMedia.mediaType.toUpperCase() === UrlType.IMAGE) {
      mediaType = UrlType.IMAGE;
    }
    if (productMedia.mediaType.toUpperCase() === UrlType.VIDEO) {
      mediaType = UrlType.VIDEO;
    }
    medias.push({
      productUrl: productMedia.productUrl,
      mediaType: mediaType,
    } as ProductMedia);

    const createdMedias = await ProductMediaModel.insertMany(medias);
    const product = await ProductModel.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      productMedias: createdMedias,
      vendor: (req as any).user._id,
    } as Product);
    res.status(201).json({
      status: "Success",
      data: {
        data: product,
      },
    });
  }
});
