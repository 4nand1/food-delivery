import type { RequestHandler } from "express"
import { FoodModel } from "../../database/schema/food.schema.js";
import { CategoryModel } from "../../database/schema/category.schema.js";


export const getCategory: RequestHandler = async (req, res) => {
    const category = await CategoryModel.find({});
    res.status(200).json(category);

}
