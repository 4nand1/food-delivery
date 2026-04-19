import { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema";

export const createFood: RequestHandler = async (req, res) => {
  try {
    const body = req.body;
    const normalizeFood = (item: Record<string, unknown>) => ({
      ...item,
      categoryId:
        item.categoryId === "uncategorized" || item.categoryId === ""
          ? null
          : item.categoryId,
    });

    const food = Array.isArray(body)
      ? await FoodModel.insertMany(body.map(normalizeFood))
      : await FoodModel.create(normalizeFood(body));

    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create food",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
