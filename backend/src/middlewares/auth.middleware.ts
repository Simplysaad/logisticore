import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";

export interface AuthRequest extends Request {
  user?: IUser;
}
export default async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.cookies;
    const { SECRET_KEY } = process.env;
    if (!SECRET_KEY) throw new Error("Empty JWT secret key");

    const { userId } = jwt.verify(token, SECRET_KEY) as { userId: string };
    const currentUser = await User.findById(userId).select("-otp -otpExpiry");

    if (!currentUser)
      return res.status(404).json({
        success: false,
        message: "user not found invalid User Id",
      });

    req.user = currentUser;
    // console.log(req.user);
    next();
  } catch (err) {
    next(err);
  }
}
