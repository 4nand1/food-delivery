import { Router } from "express";
import { createFood } from "../controllers/food/create-food.js";
import { getFoods } from "../controllers/food/get-foods.js";

const FoodRouter = Router();

FoodRouter.get('/', createFood).post('/', getFoods);



export { FoodRouter };

