import { Document, ObjectId, Schema, model } from "mongoose";
interface ICustomer {
  name: string;
  phone: string;
  address: string;
}
interface IOrder extends Document {
  _id: ObjectId;
  //   tenantId: ObjectId;
  //   customerId: ObjectId;
  //   merchantId: ObjectId; // If from e-commerce merchant

  sender: ICustomer;
  receiver: ICustomer;
  pickupAddress: string;
  deliveryAddress: string;
  status: "pending" | "in_transit" | "delivered" | "cancelled";
  assignedDriverId: ObjectId;
  price: number;
  //   deliveryType: string;
  createdAt: Date;
  updatedAt: Date;
  trackingHistory: [
    {
      status: string;
      location: string;
      timestamp: Date;
    }
  ];
}

const orderSchema = new Schema<IOrder>(
  {
    //   tenantId: { type: Schema.Types.ObjectId, required: true, ref: "tenant" },
    //   customerId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    //   merchantId: { type: Schema.Types.ObjectId, ref: "User" },
    // assignedDriverId: { type: Schema.Types.ObjectId, ref: "User" },
    // pickupAddress: { type: String, required: true },
    // deliveryAddress: { type: String, required: true },
    sender: {
      name: String,
      phone: String,
      address: String
    },
    receiver: {
      name: String,
      phone: String,
      address: String
    },
    status: {
      type: String,
      enum: ["pending", "in_transit", "delivered", "cancelled"],
      default: "pending"
    },
    trackingHistory: [
      {
        status: String,
        location: String,
        timestamp: Date
      }
    ],
    price: { type: Number, required: true }
  },
  { timestamps: true }
);
const Order = model<IOrder>("Order", orderSchema);
export { IOrder, Order };
