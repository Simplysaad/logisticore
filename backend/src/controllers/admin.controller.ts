import { NextFunction, Request, Response } from "express";
import { Order } from "../models/order.model";

interface IOrderFilter {
  state: string;
  status: string;
  companyId: string;
}

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let filter = buildOrderFilter(req.query);
  let limit = Number(req.query?.limit) ?? 30;
  let page = Number(req.query?.page) ?? 1;

  try {
    const orders = await Order.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }); // Added sorting (most recent first)

    // Get total count for pagination
    const total = await Order.countDocuments(filter);

    // Pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        currentPage: page,
        totalPages,
        total,
        limit,
        hasNext,
        hasPrev
      }
    });
  } catch (err) {
    next(err);
  }
};

