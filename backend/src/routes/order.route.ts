import { Router } from "express";
import {
  confirmOrder,
  createOrder,
  getOrderDetails,
} from "../controllers/order.controller";

const orderRouter = Router();

// Create an order
orderRouter.post("/", createOrder);

orderRouter.get("/:orderId", getOrderDetails);
orderRouter.post("/:orderId/confirm", confirmOrder);

export default orderRouter;
