import { RequestHandler } from "express";
import { OrderModel } from "../../database/schema";

export const deleteOrders: RequestHandler = async (req, res) => {
  const { orderIds } = req.body;

  if (!Array.isArray(orderIds) || orderIds.length === 0) {
    return res.status(400).json({ message: "orderIds must be an array" });
  }

  const result = await OrderModel.deleteMany({
    _id: { $in: orderIds },
  });

  res.status(200).json({
    deleted: result.deletedCount,
  });
};
