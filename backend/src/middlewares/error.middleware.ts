import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
  status?: number;
  code?: number;
  keyValue?: Record<string, unknown>;
  name: string;
  isOperational?: boolean;
  array?: () => { msg: string }[];
}

const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  let statusCode = err.status || 500;
  let message = err.message || "Something went wrong";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values((err as any).errors)
      .map((e: any) => e.message)
      .join(", ");
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${(err as any).path}: ${(err as any).value}`;
  } else if (err.code === 11000) {
    statusCode = 409;
    const duplicatedField = err.keyValue ? Object.keys(err.keyValue) : "field";
    message = `Duplicate field value: ${duplicatedField}`;
  } else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token. Please log in again.";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your token has expired. Please log in again.";
  } else if (typeof err.array === "function") {
    statusCode = 400;
    message = err
      .array()
      .map((e) => e.msg)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
