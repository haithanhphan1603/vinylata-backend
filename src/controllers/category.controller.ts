import { CategoryModel } from "../models/Category";
import { NextFunction, Request, Response } from "express";
import { handleAsync } from "../utils/handleAsync";

const getCategories = handleAsync(async (req: Request, res: Response) => {
  const categories = await CategoryModel.find();
  res.status(200).json({
    status: "Success",
    data: {
      data: categories,
    },
  });
});

const createCategory = handleAsync(async (req: Request, res: Response) => {
  const category = await CategoryModel.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      data: category,
    },
  });
});

const getCategoryById = handleAsync(async (req: Request, res: Response) => {
  const category = await CategoryModel.findById(req.params.id);
  res.status(200).json({
    status: "Success",
    data: {
      data: category,
    },
  });
});

const updateCategoryById = handleAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!category) {
      return next(new Error("No document found with that ID"));
    }
    res.status(200).json({
      status: "Success",
      data: {
        data: category,
      },
    });
  }
);

const deleteCategoryById = handleAsync(async (req: Request, res: Response) => {
  await CategoryModel.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "Success",
    data: null,
  });
});

const categoryController = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};

export default categoryController;
