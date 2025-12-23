import type { RequestHandler } from "express"
import { FoodModel } from "../../database/schema/food.schema.js";

export const createFood: RequestHandler = async (req, res) => {
    const body = req.body;

    const food = await FoodModel.create({
    name: body.name,
    price: body.price,
    images: body.images,
    description: body.description,
    category: body.category
})

    res.status(201).json(food);

}