import { model, Schema } from "mongoose";

export interface IPricingRule {
  base: number;
  weightSurcharge: {
    weightRange: string;
    extraFee: number;
  }[];
  perKmRate: number;
  peakHoursSurcharge: number;
  peakHours: number[];
}

export interface ICompany {
  name: string;
  registrationNumber?: string;
  contact: {
    address: string;
    name: string;
    website?: string;
    phoneNumber: string;
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  service: {
    serviceAreas: string[];
    deliveryTypes: string[];
    vehicleTypes: string[];
    logo?: string;
    rating: number;
  };
  pricingRule: IPricingRule;
  authentication: {
    emailAddress: string;
    password: string;
    username: string;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

const WeightSurchargeSchema = new Schema(
  {
    weightRange: {
      type: String,
      enum: [
        "less than 5kg",
        "5kg to 10kg",
        "10kg to 15kg",
        "15kg to 20kg",
        "above 20kg"
      ],
      required: true,
    },
    extraFee: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const PricingRuleSchema = new Schema<IPricingRule>(
  {
    base: { type: Number, required: true, min: 0 },
    weightSurcharge: { type: [WeightSurchargeSchema], default: [] },
    perKmRate: { type: Number, required: true, min: 0 },
    peakHoursSurcharge: { type: Number, required: true, min: 0 },
    peakHours: {
      type: [Number],
      validate: {
        validator: function (arr: number[]) {
          // Peak hours should be between 0 and 23 (24-hour format)
          return arr.every((h: number) => h >= 0 && h <= 23);
        },
        message: "Peak hours must be between 0 and 23."
      },
      default: []
    }
  },
  { _id: false }
);

const CompanySchema = new Schema<ICompany>(
  {
    name: { type: String, required: true, trim: true },
    registrationNumber: { type: String, trim: true },

    contact: {
      address: { type: String, required: true, trim: true },
      name: { type: String, required: true, trim: true },
      website: { type: String, trim: true },
      phoneNumber: { type: String, required: true, trim: true }
    },

    bankDetails: {
      bankName: { type: String, required: true, trim: true },
      accountNumber: { type: String, required: true, trim: true },
      accountName: { type: String, required: true, trim: true }
    },

    service: {
      serviceAreas: { type: [String], required: true, default: [] },
      deliveryTypes: { type: [String], required: true, default: [] },
      vehicleTypes: { type: [String], required: true, default: [] },
      logo: { type: String, trim: true },
      rating: { type: Number, required: true, min: 0, max: 5 }
    },
    pricingRule: { type: PricingRuleSchema, required: true },

    authentication: {
      emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/,
        unique: true,
        index: true
      },
      password: { type: String, required: true },
      username: { type: String, required: true, unique: true, trim: true }
    }
  },
  {
    timestamps: true
  }
);

const Company = model<ICompany>("Company", CompanySchema);

export default Company;


console.log("company.model.ts loaded")