import calculatePrice from "./price.service";
import { IPricingRule } from "../models/company.model";
import { describe, expect, test } from "@jest/globals";

// TODO: message Abu Anas regarding the videos he wanted to remake

describe("calculatePrice function", () => {
  const basePricingRule = {
    perKmRate: 10,
    peakHoursSurcharge: 50,
    peakHours: [17, 19], // 5 PM to 7 PM
    base: 100,
    weightSurcharge: [
      { maxWeight: 5, extraFee: 20 },
      { maxWeight: 10, extraFee: 40 },
      { maxWeight: 20, extraFee: 60 },
    ],
  };

  const createOrder = (hour: number, distance: number, weight: number) => ({
    createdAt: new Date(2025, 10, 8, hour), // Nov 8, 2025, hour variable
    distance,
    weight,
  });

  test("calculates price correctly outside peak hours", () => {
    const order = createOrder(16, 5, 3); // 4 PM, outside peak hours
    const price = calculatePrice(order, basePricingRule);
    // base + distance*perKmRate + weight surcharge for <=5kg
    expect(price).toBe(100 + 5 * 10 + 20);
  });

  test("calculates price correctly during peak hours", () => {
    const order = createOrder(17, 5, 3); // Exactly 5 PM, start of peak hour
    const price = calculatePrice(order, basePricingRule);
    // base + distance*perKmRate + weight surcharge + peak surcharge
    expect(price).toBe(100 + 5 * 10 + 20 + 50);
  });

  test("applies correct weight surcharge bracket", () => {
    const order1 = createOrder(14, 10, 5); // weight exactly on bracket max
    const order2 = createOrder(14, 10, 6); // weight between 5 and 10
    const order3 = createOrder(14, 10, 15); // weight between 10 and 20
    const order4 = createOrder(14, 10, 25); // above max bracket weight, no surcharge added since no bracket matches

    // order1 weight 5 -> surcharge 20
    expect(calculatePrice(order1, basePricingRule)).toBe(100 + 10 * 10 + 20);

    // order2 weight 6 -> second bracket surcharge 40
    expect(calculatePrice(order2, basePricingRule)).toBe(100 + 10 * 10 + 40);

    // order3 weight 15 -> third bracket surcharge 60
    expect(calculatePrice(order3, basePricingRule)).toBe(100 + 10 * 10 + 60);

    // order4 weight 25 -> no bracket matches, no surcharge
    expect(calculatePrice(order4, basePricingRule)).toBe(100 + 10 * 10);
  });

  test("returns base price when distance and weight are zero", () => {
    const order = createOrder(14, 0, 0);
    const price = calculatePrice(order, basePricingRule);
    // weight 0 fits in first bracket (<=5), so surcharge 20 applies
    expect(price).toBe(100 + 0 + 20);
  });

  test("calculates peak hour correctly when order time is exactly at end of peak hours", () => {
    const order = createOrder(19, 5, 3); // 7 PM, peak hour boundary
    const price = calculatePrice(order, basePricingRule);
    expect(price).toBe(100 + 5 * 10 + 20 + 50);
  });

  test("does not apply peak surcharge outside peak hours", () => {
    const order = createOrder(20, 5, 3); // 8 PM, after peak hours
    const price = calculatePrice(order, basePricingRule);
    expect(price).toBe(100 + 5 * 10 + 20);
  });

  test("handles empty weightSurcharge array gracefully", () => {
    const pricingRule = { ...basePricingRule, weightSurcharge: [] };
    const order = createOrder(14, 5, 10);
    const price = calculatePrice(order, pricingRule);
    expect(price).toBe(100 + 5 * 10);
  });
});
