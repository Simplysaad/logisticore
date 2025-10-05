import { Schema, Document, ObjectId, model } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  role: "customer" | "admin" | "staff";
  name: string;
  emailAddress?: string;
  otp?: number;
  otpExpiry: Date;
  phoneNumber: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    emailAddress: { type: String, unique: true, sparse: true },
    phoneNumber: { type: String, required: true, unique: true },
    otp: { type: Number },
    otpExpiry: { type: Date, default: new Date(Date.now() + 1000 * 60 * 10) },
    role: {
      type: String,
      enum: ["customer", "admin", "staff"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;
