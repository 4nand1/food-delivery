import type { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema.js";

export const getFoodsByCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.params;

  if (!categoryId)
    return res.status(400).json({ message: "Category ID is required" });

  const foods = await FoodModel.find({
    categoryId: categoryId,
  }).populate("categoryId");

  res.status(200).json(foods);
};
