import { Schema, Document, ObjectId, model } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  role: "customer" | "admin"
  name: string;
  email: string;
  otp?: number;
  otpExpiry: Date;
  phoneNumber: string;
}

const userSchema = new Schema<IUser>(
  {
   
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    otp: { type: Number },
    otpExpiry: { type: Date, default: new Date(Date.now() + 1000 * 60 * 10) },
    phoneNumber: { type: String, required: true, unique: true },
   role: {
      type: String,
      enum: ["customer", "admin"],
      required: true
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User 
