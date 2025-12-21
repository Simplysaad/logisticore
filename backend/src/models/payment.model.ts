import { model, Schema } from "mongoose";

const paymentSchema = new Schema({})

const Payment = model("payment", paymentSchema)

export default Payment