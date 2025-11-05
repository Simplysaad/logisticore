import { Router } from "express";
import {
  createOrder,
  getOrders,
  trackOrder,
  updateOrder,
} from "../controllers/order.controller";

const orderRouter = Router();

// Get all orders
orderRouter.get("/", getOrders);

// Create an order
orderRouter.post("/", createOrder);

// Track an order
orderRouter.get("/:orderId", trackOrder);

// update an order
orderRouter.post("/:orderId/", updateOrder);

// Review an Order

export default orderRouter;
