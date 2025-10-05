import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import generateOTP from "../utils/generateOtp.util";

const { SECRET_KEY } = process.env;
const JWT_EXPIRES_IN = "1h"; // token validity

interface ILoginBody {
  phoneNumber: string;
  name?: string;
  emailAddress: string;
}

interface IVerifyBody {
  phoneNumber: string;
  otp: number;
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, name, emailAddress } = req.body as ILoginBody;
    const otp = generateOTP();

    const currentUser = await User.findOneAndUpdate(
      { $or: [{ phoneNumber }, { emailAddress }] },
      {
        $setOnInsert: {
          phoneNumber,
          name,
          emailAddress,
        },
        $set: {
          otp,
          otpExpiry: new Date(Date.now() + 5 * 60000),
        },
      },
      { upsert: true, new: true }
    );

    // TODO: Send OTP to user's phoneNumber via SMS provider here

    return res.status(200).json({
      success: true,
      message: "OTP sent to your phone number",
      data: currentUser,
    });
  } catch (err) {
    next(err);
  }
};

export const verifyOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phoneNumber, otp } = req.body as IVerifyBody;
    const currentUser = await User.findOne({ phoneNumber });

    if (!currentUser) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    if (currentUser.otp !== otp) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    if (new Date(currentUser.otpExpiry) <= new Date()) {
      return res.status(401).json({ success: false, message: "OTP expired" });
    }

    if (!SECRET_KEY) throw new Error("SECRET_KEY is not defined");
    const token = jwt.sign(
      { userId: currentUser._id, phoneNumber: currentUser.phoneNumber },
      SECRET_KEY,
      { expiresIn: JWT_EXPIRES_IN }
    );

    currentUser.otpExpiry = new Date();
    await currentUser.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      // TODO: should be a longer time like a week
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Authentication successful",
      token, // optional to return token also in JSON
    });
  } catch (err) {
    next(err);
  }
};
