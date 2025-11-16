import { NextFunction, Request, Response } from "express";

export async function registerCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  } catch (err) {
    next(err);
  }
}
