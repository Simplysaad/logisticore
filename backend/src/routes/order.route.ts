import { Router } from "express";
import { createOrder, getOrderDetails } from "../controllers/order.controller";

const orderRouter = Router();

// Create an order
orderRouter.post("/", createOrder);

orderRouter.get("/:orderId", getOrderDetails);

export default orderRouter;
