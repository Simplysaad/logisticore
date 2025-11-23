import { NextFunction, Request, Response } from "express";
import Company, { ICompany } from "../models/company.model";

export async function registerCompany(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { service, authentication, pricingRule, bankDetails, contact, name } =
      req.body as ICompany;

    const newCompany = await Company.create({
      service,
      authentication,
      pricingRule,
      bankDetails,
      contact,
      name
    });

    console.log("newCompany", newCompany);

    return res.status(200).json({
      success: true,
      message: "company created successfully",
      data: newCompany
    });
  } catch (err) {
    next(err);
  }
}

export async function companyLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { emailAddress, password } = req.body as {
      emailAddress: string;
      password: string;
    };

    const currentCompany = await Company.findOne({
      "authentication.emailAddress": emailAddress
    });

    console.log("currentCompany", currentCompany);
    if (!currentCompany) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // const isCorrectPassword = await bcrypt.compare(
    //   password,
    //   currentCompany.authentication.password
    // );

    const isCorrectPassword =
      password === currentCompany.authentication.password;

    if (!isCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: currentCompany
    });
  } catch (err) {
    next(err);
  }
}
