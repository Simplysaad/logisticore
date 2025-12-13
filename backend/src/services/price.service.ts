import { IPricingRule } from "../models/company.model";
import { IOrder } from "../models/order.model";

function getPeakHour(orderTime: Date, peakHours: number[]) {
  const hour = orderTime.getHours();

  return hour >= peakHours[0] && hour <= peakHours[1];
}

const allowedWeightRanges = [
  "less than 5kg",
  "5kg to 10kg",
  "10kg to 15kg",
  "15kg to 20kg",
  "above 20kg"
];

export default function calculatePrice(
  order: any,
  pricingRule: IPricingRule,
) {
  const { distance, weight, createdAt } = order;
  const { perKmRate, peakHoursSurcharge, peakHours, base, weightSurcharge } =
    pricingRule;
  const isPeakHour = getPeakHour(createdAt, peakHours);

  let price = base;
  price += distance * perKmRate;

  if (!allowedWeightRanges.includes(weight)) {
    throw new Error("invalid weight range");
  }

  for (let bracket of weightSurcharge) {
    if (weight === bracket.weightRange) {
      price += bracket.extraFee;
      break;
    }
  }

  if (isPeakHour) {
    price += peakHoursSurcharge;
  }
  return price;
}


console.log("price.service.ts loaded")