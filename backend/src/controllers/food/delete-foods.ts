import { RequestHandler } from "express";
import { FoodModel } from "../../database/schema/food.schema";

export const deleteFood: RequestHandler = async (req, res) => {
  const body = req.body;
  const food = body.id
    ? await FoodModel.findByIdAndDelete(body.id)
    : await FoodModel.findOneAndDelete({ name: body.name });

  if (!food) {
    return res.status(404).json({ message: "Food not found" });
  }

  res.status(202).json({ deletedId: food._id });
};
