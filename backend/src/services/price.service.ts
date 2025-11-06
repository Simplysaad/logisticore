import { IPricingRule } from "../models/company.model";
import { IOrder } from "../models/order.model";

function getPeakHour(orderTime: Date, peakHours: number[]) {
  const hour = orderTime.getHours();

  return hour >= peakHours[0] && hour <= peakHours[1];
}

export default function calculatePrice(
  // order: IOrder,
  order: any,
  pricingRule: IPricingRule
) {
  const { distance, weight, createdAt } = order;
  const { perKmRate, peakHoursSurcharge, peakHours, base, weightSurcharge } =
    pricingRule;
  const isPeakHour = getPeakHour(createdAt, peakHours);

  let price = base;
  price += distance * perKmRate;

  for (let bracket of weightSurcharge) {
    // if the weight is greater than the max allowed weight
    if (weight <= bracket.maxWeight) {
      price += bracket.extraFee;
      break;
    }
  }

  if (isPeakHour) {
    price += peakHoursSurcharge;
  }
  return price;
}
// https://github.com/simplysaad/logisticore/blob/feature/new-ideas/backend/src/services/price.service.ts
