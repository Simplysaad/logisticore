import { Document, ObjectId, Schema, model } from "mongoose";
export interface ICustomer {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  state: string;
}
interface IOrder extends Document {
  _id: ObjectId;
  sender: ICustomer;
  receiver: ICustomer;
  companyId?: ObjectId;
  status:
    | "initialized"
    | "confirmed "
    | "in_transit"
    | "delivered"
    | "cancelled"
    | "failed";
  price: number;
  weight: string;
  distance: number;
  instructions?: string;
  preference?: {
    [key: string]: any;
  };
  payment: {
    status: "success" | "abandonned" | "failed" | "pending";
    method: "pay_on_delivery" | "pay_now";
    transactionId: string;
    amount: number;
    date: Date;
  };
  description: string;
  createdAt: Date;
  updatedAt: Date;
  trackingHistory: [
    {
      status: string;
      timestamp: Date;
    }
  ];
}

const orderSchema = new Schema<IOrder>(
  {
    sender: {
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
    receiver: {
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
    status: {
      type: String,
      enum: [
        "initialized",
        "confirmed",
        "in_transit",
        "delivered",
        "cancelled",
        "failed",
      ],
      default: "initialized",
    },
    trackingHistory: [
      {
        status: String,
        timestamp: Date,
      },
    ],

    payment: {
      status: {
        type: String,
        enum: ["success", "abandonned", "failed", "pending", "refunded"],
        default: "pending",
      },
      method: {
        type: String,
        enum: ["pay_on_delivery", "pay_now"],
        default: "pay_now",
      },
      date: Date,
      transactionId: String,
      amount: {
        type: Number,
        default: 0,
      },
    },
    weight: { type: String },
    distance: { type: Number },
    price: { type: Number },
    description: { type: String },
    companyId: { type: Schema.Types.ObjectId, ref: "Company" },
    instructions: { type: String },
    preference: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);
// Query middleware for updates via findOneAndUpdate, updateOne, updateMany, etc.
orderSchema.pre(
  ["findOneAndUpdate", "updateOne", "updateMany"],
  async function (next) {
    const update: any = this.getUpdate();
    const query = this.getQuery();

    if (!update || typeof update !== "object") return next();

    // Handle updates that use $set etc:
    const newStatus = update.status || (update.$set && update.$set.status);
    if (!newStatus) return next();

    // Get current document before update
    const doc = await this.model.findOne(query).exec();
    if (!doc) return next();

    const lastStatus = doc.trackingHistory?.at(-1)?.status;

    // Only push new status if different
    if (lastStatus !== newStatus) {
      if (!update.$push) update.$push = {};
      update.$push.trackingHistory = {
        status: newStatus,
        timestamp: new Date(),
      };
    }

    next();
  }
);

orderSchema.pre("save", function (next) {
  // if (!this.isModified("status")) {
  //   return next();
  // }

  const lastStatus = this.trackingHistory?.at(-1)?.status;

  if (!lastStatus || lastStatus !== this.status) {
    this.trackingHistory = this.trackingHistory || [];
    this.trackingHistory.push({
      status: "initialized",
      timestamp: new Date(),
    });
  }

  next();
});

const Order = model<IOrder>("Order", orderSchema);
export { IOrder, Order };


console.log("order.model.ts loaded")