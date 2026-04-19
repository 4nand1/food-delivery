import { RequestHandler } from "express";
import { CategoryModel, FoodModel } from "../../database/schema";

export const deleteCategory: RequestHandler = async (req, res) => {
  const body = req.body;
  const category = body.id
    ? await CategoryModel.findByIdAndDelete(body.id)
    : await CategoryModel.findOneAndDelete({ name: body.name });

  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  await FoodModel.updateMany(
    { categoryId: category._id },
    { $set: { categoryId: null } },
  );

  res.status(202).json({ deletedId: category._id });
};
