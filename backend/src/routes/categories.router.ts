import { Router } from "express";
import { createCategory } from "../controllers/category/create-category.js";
import { getCategory } from "../controllers/category/get-categories.js";


const CategoryRouter = Router();

CategoryRouter.get('/', getCategory).post('/', createCategory);



export { CategoryRouter };




