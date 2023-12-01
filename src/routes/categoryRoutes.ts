import express from "express";
import categoryController from "../controllers/category.controller";

const router = express.Router();

router
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);
router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .patch(categoryController.updateCategoryById)
  .delete(categoryController.deleteCategoryById);

export default router;
