import { model, Schema } from "mongoose";

export interface IPricingRule {
  base: number;
  weightSurcharge: {
    maxWeight: number;
    extraFee: number;
  }[];
  perKmRate: number;
  peakHoursSurcharge: number;
  peakHours: number[];
}
export interface ICompany {
  name: string;
  contactNumber: string;
  emailAddress: string;
  address: string;
  rating: number;
  pricingRule: IPricingRule;
}

const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  address: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  pricingRule: {
    base: Number,
    weightSurcharge: [
      {
        maxWeight: Number,
        extraFee: Number,
      },
    ],
    perKmRate: Number,
    peakHoursSurcharge: Number,
    peakHours: [Number],
  },
});

const Company = model<ICompany>("Company", companySchema);

export default Company;
