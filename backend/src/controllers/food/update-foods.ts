import { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema";

export const updateFood: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const normalizedBody = {
      ...req.body,
      categoryId:
        req.body.categoryId === "uncategorized" || req.body.categoryId === ""
          ? null
          : req.body.categoryId,
    };

    const updatedFood = await FoodModel.findByIdAndUpdate(id, normalizedBody, {
      new: true,
      runValidators: true,
    });

    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: "Failed to update food", error });
  }
};
