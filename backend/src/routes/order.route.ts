import { Router } from "express";
import {
  confirmOrder,
  createOrder,
  fetchPrices,
  getOrderDetails,
  orderCallback,
  trackOrder,
} from "../controllers/order.controller";

const orderRouter = Router();

// Create an order
orderRouter.post("/", createOrder);

orderRouter.get("/:orderId", getOrderDetails);
orderRouter.get("/:orderId/prices", fetchPrices);
orderRouter.post("/:orderId/confirm", confirmOrder);
orderRouter.get("/:orderId/track", trackOrder);

orderRouter.get("/:orderId/callback", orderCallback);

export default orderRouter;
