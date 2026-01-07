import type { RequestHandler } from "express"
import { FoodModel } from "../../database/schema/food.schema.js";
import { CategoryModel } from "../../database/schema/categories.schema.js";


export const createCategory: RequestHandler = async (req, res) => {
    const body = req.body;

    const food = await FoodModel.create({
    name: body.name,
    });

    res.status(201).json(food);

}