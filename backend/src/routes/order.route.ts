import { Router } from "express";
import { createOrder } from "../controllers/order.controller.ts";

const orderRouter = Router();

// Create an order
orderRouter.post("/", createOrder);

export default orderRouter;
