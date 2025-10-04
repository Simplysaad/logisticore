import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import  User  from "../models/user.model";
import generateOTP from "../utils/generateOtp.util";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const JWT_EXPIRES_IN = "1h"; // token validity

interface ILoginBody {
  phoneNumber: string;
  name?: string;
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
    console.log(req.body)
    const { phoneNumber, name } = req.body as ILoginBody;
    const otp = generateOTP()

    const currentUser = await User.findOneAndUpdate(
      { phoneNumber },
      {
        $setOnInsert: {
          phoneNumber,
          name
        },
        $set: {
          otp,
          otpExpiry: new Date(Date.now() + 5 * 60000)
        } // OTP expires in 5 mins
      },
      { upsert: true, new: true }
    );

    // TODO: Send OTP to user's phoneNumber via SMS provider here

    return res.status(200).json({
      success: true,
      message: "OTP sent to your phone number",
      data: currentUser
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

    // OTP is valid, create JWT token
    const token = jwt.sign(
      { userId: currentUser._id, phoneNumber: currentUser.phoneNumber },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Save token in HttpOnly cookie (secure flag true in production)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
      sameSite: "strict"
    });

    return res.status(200).json({
      success: true,
      message: "Authentication successful",
      token // optional to return token also in JSON
    });
  } catch (err) {
    next(err);
  }
};
