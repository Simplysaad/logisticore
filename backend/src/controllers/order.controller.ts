import { NextFunction, Request, Response } from "express";
import { ICustomer, Order } from "../models/order.model";
import { AuthRequest } from "../middlewares/auth.middleware";

interface IOrderBody {
  sender: ICustomer;
  instruction: string;
  receiver: ICustomer;
  description: string;
  price: number;
}

interface IUpdateBody {
  status?: string;
  description?: string;
  price?: number;
  receiver?: {
    name?: string;
    address?: string;
    phoneNumber?: string;
    emailAddress?: string;
  };
}

interface IFilter {
  [key: string]: any;
}

export const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      sender = req.user,
      receiver,
      description,
      instruction,

      price,
    } = req.body as IOrderBody;
    // if (!req.user) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorized - user not logged in",
    //   });
    // }

    const newOrder = await Order.create({
      sender,
      receiver,
      description,
      instruction,
      price,
    });

    return res.status(201).json({
      success: true,
      message: "new Order Created",
      data: newOrder,
    });
  } catch (err) {
    next(err);
  }
};

export const trackOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;

    const currentOrder = await Order.findById(orderId);

    return res.json({
      success: true,
      message: "order detailes retrieved successfully",
      data: currentOrder,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const { orderId } = req.params;
    const update = req.body as IUpdateBody;

    if (!update || Object.keys(update).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Bad Request - no fields to update",
      });
    }

    const { status } = update;

    const currentUser = req.user;

    // if (!currentUser) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorized - user not logged in",
    //   });
    // }

    if (status) {
      const validStatuses = [
        "pending",
        "in_transit",
        "delivered",
        "confirmed",
        "cancelled",
      ];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Bad Request - invalid status value",
        });
      }

      switch (currentUser?.role) {
        case "admin":
          // Admin can update to any status
          break;
        case "staff":
          // Staff can only update to 'in_transit' or 'delivered'
          if (status !== "in_transit" && status !== "delivered") {
            return res.status(403).json({
              success: false,
              message: "Forbidden - insufficient permissions",
            });
          }
          break;
        case "customer":
          // Customers can only update to 'confirmed'
          if (status !== "confirmed") {
            return res.status(403).json({
              success: false,
              message: "Forbidden - insufficient permissions",
            });
          }
          break;
        default:
          return res.status(403).json({
            success: false,
            message: "Forbidden - insufficient permissions",
          });
      }
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      { ...update },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user;
    // if (!currentUser) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Unauthorized - user not logged in",
    //   });
    // }

    const { page = 1, limit = 10, status, min_date, max_date } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const filter: IFilter = {};

    if (currentUser?.role === "customer") {
      filter["sender._id"] = currentUser?._id;
    }

    if (status) filter.status = status;

    if (min_date || max_date) {
      filter.createdAt = {};
      if (min_date) {
        filter.createdAt.$gte = new Date(min_date as string);
      }
      if (max_date) {
        filter.createdAt.$lte = new Date(max_date as string);
      }
    }

    let orders = await Order.find(filter).skip(skip).limit(limitNumber);

    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};
