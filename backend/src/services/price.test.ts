import test, { describe } from "node:test";
import calculatePrice from "./price.service";
import { IPricingRule } from "../models/company.model";

// TODO: message Abu Anas regarding the videos he wanted to remake
// const order: IOrder = {
const order = {
  sender: {
    address: "123, main County, Kent city",
    emailAddress: "john@doe.com",
    name: "john doe",
    phoneNumber: "09076147178",
  },
  receiver: {
    address: "123, main County, Kent city",
    emailAddress: "john@doe.com",
    name: "john doe",
    phoneNumber: "09076147178",
  },
  weight: 23,
  distance: 40,
  instructions: "place the parcel under the shed in the garage ",
  time: new Date(Date.now()),
};

const pricingRule: IPricingRule = {
  perKmRate: 500,
  peakHours: [16, 20],
  base: 1000,
  peakHoursSurcharge: 200,
  weightSurcharge: [
    {
      maxWeight: 10,
      extraFee: 100,
    },
  ],
};
