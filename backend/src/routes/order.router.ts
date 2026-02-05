import { Router } from "express";
import { getUserOrders } from "../controllers/order/get-user-orders.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createOrder } from "../controllers/order/create-order.js";
import { updateOrder } from "../controllers/order/update-order.js";

const OrderRouter = Router();

OrderRouter.get("/", authMiddleware, getUserOrders)
  .post("/create", authMiddleware, createOrder)
  .put("/:id", updateOrder);

export { OrderRouter };
