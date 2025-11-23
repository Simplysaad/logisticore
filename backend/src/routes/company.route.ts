/**
 * Company Routes
 *
 * /create -  {name, pricingRule, branches-location, logo, email, password} register  a new company to the platform
 * /login - logs company user in {email, password}
 *
 * /orders - Get all orders {active, completed, abandoned, cancelled}
 * /orders/:id/edit - change the status of an order {from "confirmed" to "in_transit"}
 */

import { Router } from "express";
import { registerCompany } from "../controllers/company.controller";

// /api/delivery-companies/register
// /api/delivery-companies/login
// /api/delivery-companies/profile
// /api/delivery-companies/orders
// /api/delivery-companies/orders/:id
// /api/delivery-companies/orders/:id/status
// /api/delivery-companies/dashboard

const companyRouter = Router();

companyRouter.post("/create", registerCompany);
// companyRouter.post("/login");

// companyRouter.get("/profile");
// companyRouter.put("/profile");

// companyRouter.get("/dashboard");

// companyRouter.get("/orders");
// companyRouter.get("/orders/:id");
// companyRouter.get("/orders/:id/status");
