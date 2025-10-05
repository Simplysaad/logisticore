import { Document, ObjectId, Schema, model } from "mongoose";
export interface ICustomer {
  name: string;
  phoneNumber: string;
  emailAddress: string;
  address: string;
}
interface IOrder extends Document {
  _id: ObjectId;
  sender: ICustomer;
  receiver: ICustomer;
  status: "pending" | "in_transit" | "delivered" | "cancelled" | "confirmed";
  price: number;
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
      name: String,
      phoneNumber: String,
      emailAddress: String,
      address: String,
    },
    receiver: {
      name: String,
      phoneNumber: String,
      emailAddress: String,
      address: String,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "in_transit",
        "delivered",
        "cancelled",
        "confirmed",
      ],
      default: "pending",
    },
    trackingHistory: [
      {
        status: String,
        timestamp: Date,
      },
    ],
    price: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

orderSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as any;
  const query = this.getQuery() as any;

  const doc = await this.model.findOne(query).exec();

  const hasStatus = doc?.trackingHistory?.at(-1)?.status === update.status;

  if (hasStatus) return next();

  if (!hasStatus && update && typeof update === "object" && update.status) {
    if (!update.$push) update.$push = {};

    update.$push.trackingHistory = {
      status: update.status,
      timestamp: new Date(),
    };
  }

  next();
});

const Order = model<IOrder>("Order", orderSchema);
export { IOrder, Order };
