import { Router } from "express";
import {
  createOrder,
  getOrders,
  trackOrder,
  updateOrder,
} from "../controllers/order.controller";
import authMiddleware from "../middlewares/auth.middleware";

const orderRouter = Router();

// Get all orders
orderRouter.get("/", authMiddleware, getOrders);

// Create an order
orderRouter.post("/", authMiddleware, createOrder);

// Track an order
orderRouter.get("/:orderId", trackOrder);

// update an order
orderRouter.post("/:orderId/", authMiddleware, updateOrder);

// Review an Order

export default orderRouter;
