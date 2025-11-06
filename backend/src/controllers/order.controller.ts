import { NextFunction, Request, Response } from "express";
import { ICustomer } from "../models/order.model.ts";
import { ObjectId } from "mongoose";

interface IOrderBody {
  sender: ICustomer;
  reciever: ICustomer;
  description: string;
  instructions: string;
  companyId: ObjectId;
}

export function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { sender, reciever, description, instructions, companyId } =
      req.body as IOrderBody;
  } catch (err) {
    next(err);
  }
}
