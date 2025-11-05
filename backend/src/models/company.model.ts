import { model, Schema } from "mongoose";

export interface ICompany {
  name: string;
  contactNumber: string;
  emailAddress: string;
  address: string;
  rating: number;
}
const companySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  address: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
});

const Company = model<ICompany>("Company", companySchema);

export default Company;
