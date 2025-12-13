import { NextFunction, Request, Response } from "express";
import { ICustomer, Order } from "../models/order.model";
import { isValidObjectId, ObjectId } from "mongoose";
import Company, { ICompany } from "../models/company.model";
import calculatePrice from "../services/price.service";
import { initialize, verify } from "../services/paystack.service";

interface IOrderBody {
  sender: ICustomer;
  receiver: ICustomer;
  description: string;
  instructions: string;
  companyId: ObjectId;
  weight: number;
  distance: number;
}

/**
 * Create a new order
 * recieves all the information about the order from req.body
 * and creates a new order in the database
 */
export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { sender, receiver, description, instructions, weight, distance } =
      req.body as IOrderBody;

    const newOrder = await Order.create({
      sender,
      receiver,
      description,
      instructions,
      weight,
      distance
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder
    });
  } catch (err) {
    next(err);
  }
}
export async function getOrderDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { orderId } = req.params;

    if (!isValidObjectId(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Order ID" });
    }

    const currentOrder = await Order.findById(orderId)
      .populate({
        path: "companyId",
        select: "name _id"
      })
      .select("weight distance createdAt price companyId");
    if (!currentOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: currentOrder
    });
  } catch (err) {
    next(err);
  }
}

export async function fetchPrices(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ _id: orderId });
    // const allowesdStatuses = ["initialized", "confirmed"];
    // if (order?.status !== "initialized") {
    if (order?.status === "confirmed") {
      return res.status(200).json({
        success: false,
        message: "order has been confirmed"
      });
    }

    // {
    //   logo, name, rating, price, deliveryTime, features, payment;
    // }

    const companies = await Company.find({
      // "sevice.serviceAreas": ["osun", "kogi"]
      // "sevice.serviceAreas": [order.sender.state, order.receiver.state]
    }).select("pricingRule name _id service");

    console.log(companies);

    const prices = companies.map(({ pricingRule, _id, name, service }, idx) => {
      return {
        price: calculatePrice(order, pricingRule),
        _id,
        name,
        rating: service?.rating,
        logo: service.logo,
        paymentMethods: ["pay now", "pay on delivery"]
      };
    });

    return res.status(200).json({
      success: true,
      message: "",
      data: {
        prices,
        ...order?.toObject()
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function confirmOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { orderId } = req.params;
    const { companyId, paymentMethod = "pay_now" } = req.body as {
      companyId: string;
      paymentMethod: "pay_now" | "pay_on_delivery";
    };

    // if (!isValidObjectId(orderId) || !isValidObjectId(companyId)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Invalid Order ID or Company ID" });
    // }

    console.log("orderId", orderId);
    console.log("companyId", companyId);

    if (!orderId || !companyId) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Order ID or Company ID" });
    }

    const [currentOrder, selectedCompany] = await Promise.all([
      Order.findOne({ _id: orderId }).select(
        "_id weight distance createdAt sender"
      ),
      Company.findOne({ _id: companyId }).select("_id pricingRule name")
    ]);

    if (!currentOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    if (!selectedCompany) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const finalPrice = calculatePrice(
      currentOrder,
      selectedCompany.pricingRule
    );

    let responseData;
    if (paymentMethod === "pay_now") {
      responseData = await initialize(
        finalPrice * 100,
        currentOrder?.sender?.email,
        orderId
      );
    } else {
      responseData = {};
    }

    console.log(paymentMethod, responseData);

    await Order.updateOne(
      { _id: orderId },
      {
        $set: {
          companyId: selectedCompany._id,
          price: finalPrice,
          "payment.method": paymentMethod,
          // status: "confirmed"
        }
      }
    );

    return res.status(200).json({
      success: true,
      message: "Company selected successfully",
      data: {
        ...responseData?.data,
        orderId: currentOrder._id,
        companyId: selectedCompany._id,
        companyName: selectedCompany.name,
        finalPrice
      }
    });
  } catch (err) {
    next(err);
  }
}

export async function orderCallback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { reference } = req.query;
    const { orderId } = req.params;

    const response = await verify(reference as string);

    if (!response) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }
    console.log("paystack response", response);
    if (response.status && response.data.status === "success") {
      await Order.updateOne(
        { _id: orderId },
        {
          $set: {
            status: "confirmed",
            payment: {
              status: "success",
              date: new Date(),
              transactionId: response.data.reference,
              amount: response.data.amount / 100
            }
          }
        }
      );
    }

    // return res.status(200).json({
    //   success: true,
    //   message: "Payment verification processed",
    //   data: response.data,
    // });

    return res
      .status(200)
      .redirect(`${process.env.FRONTEND_URL}/orders/${orderId}/`);
  } catch (err) {
    next(err);
  }
}

export async function trackOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required"
      });
    }

    const currentOrder = await Order.findById(orderId).select(
      "_id trackingHistory"
    );

    if (!currentOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order tracking data retrieved successfully",
      data: currentOrder
    });
  } catch (err) {
    next(err);
  }
}

console.log("order.controller.ts loaded");
