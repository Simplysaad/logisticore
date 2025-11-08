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

    // const newOrder = await Order.create({
    //   sender,
    //   receiver,
    //   description,
    //   instructions,
    //   weight,
    //   distance,
    // });

    const newOrder = new Order({
      sender,
      receiver,
      description,
      instructions,
      weight,
      distance,
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: { newOrder },
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

    const currentOrder = await Order.findById(orderId).select(
      "weight distance createdAt"
    );
    if (!currentOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const companies = await Company.find().select("_id pricingRule name");

    const calculatedPrices = companies.map(({ _id, pricingRule, name }) => {
      const price = calculatePrice(currentOrder, pricingRule);
      return { _id, name, price };
    });

    return res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      data: {
        distance: `${currentOrder.distance} km`,
        weight: `${currentOrder.weight} kg`,
        date: currentOrder.createdAt.toLocaleString(),
        prices: calculatedPrices,
      },
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

    if (!isValidObjectId(orderId) || !isValidObjectId(companyId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Order ID or Company ID" });
    }

    const [currentOrder, selectedCompany] = await Promise.all([
      Order.findById(orderId).select("_id weight distance createdAt sender"),
      Company.findById(companyId).select("_id pricingRule name"),
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
        currentOrder?.sender?.emailAddress,
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
          status: "confirmed",
        },
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
        finalPrice,
      },
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
    const { reference, deliveryStatus: status } = req.query;
    const { orderId } = req.params;

    const response = await verify(reference as string);

    if (!response) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    if (response.status && response.data.status === "success") {
      await Order.updateOne(
        { _id: orderId },
        {
          $set: {
            payment: {
              status: "success",
              date: new Date(),
              transactionId: response.data.reference,
              amount: response.data.amount / 100,
            },
            status,
          },
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Payment verification processed",
      data: response.data,
    });
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
        message: "Order ID is required",
      });
    }

    const currentOrder = await Order.findById(orderId).select(
      "_id trackingHistory"
    );

    if (!currentOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order tracking data retrieved successfully",
      data: currentOrder,
    });
  } catch (err) {
    next(err);
  }
}
