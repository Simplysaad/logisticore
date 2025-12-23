import { Document, model, ObjectId, Schema } from "mongoose";

interface IPayment extends Document {
  id: number;
  orderId: ObjectId;
  status: "success" | "abandoned" | "pending" | "cancelled" | "failed";
  reference: string;
  amount: number;
  paid_at: Date;
  created_at: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    id: {
      type: Number,
      required: true
    },
    orderId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    status: {
      type: String,
      enum: ["success", "abandoned", "pending", "cancelled", "failed"],
      default: "pending"
    },
    reference: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    paid_at: {
      type: Date,
      required: true
    },
    created_at: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Payment = model<IPayment>("payment", paymentSchema);

export default Payment;

// {
//   "status": true,
//   "message": "Verification successful",
//   "data": {
//     "id": 4099260516,
//     "domain": "test",
//     "status": "success",
//     "reference": "re4lyvq3s3",
//     "receipt_number": null,
//     "amount": 40333,
//     "message": null,
//     "gateway_response": "Successful",
//     "paid_at": "2024-08-22T09:15:02.000Z",
//     "created_at": "2024-08-22T09:14:24.000Z",
//     "channel": "card",
//     "currency": "NGN",
//     "ip_address": "197.210.54.33",
//     "metadata": "",
//     "log": {
//       "start_time": 1724318098,
//       "time_spent": 4,
//       "attempts": 1,
//       "errors": 0,
//       "success": true,
//       "mobile": false,
//       "input": [],
//       "history": [
//         {
//           "type": "action",
//           "message": "Attempted to pay with card",
//           "time": 3
//         },
//         {
//           "type": "success",
//           "message": "Successfully paid with card",
//           "time": 4
//         }
//       ]
//     },
//     "fees": 10283,
//     "fees_split": null,
//     "authorization": {
//       "authorization_code": "AUTH_uh8bcl3zbn",
//       "bin": "408408",
//       "last4": "4081",
//       "exp_month": "12",
//       "exp_year": "2030",
//       "channel": "card",
//       "card_type": "visa ",
//       "bank": "TEST BANK",
//       "country_code": "NG",
//       "brand": "visa",
//       "reusable": true,
//       "signature": "SIG_yEXu7dLBeqG0kU7g95Ke",
//       "account_name": null
//     },
//     "customer": {
//       "id": 181873746,
//       "first_name": null,
//       "last_name": null,
//       "email": "demo@test.com",
//       "customer_code": "CUS_1rkzaqsv4rrhqo6",
//       "phone": null,
//       "metadata": null,
//       "risk_action": "default",
//       "international_format_phone": null
//     },
//     "plan": null,
//     "split": {},
//     "order_id": null,
//     "paidAt": "2024-08-22T09:15:02.000Z",
//     "createdAt": "2024-08-22T09:14:24.000Z",
//     "requested_amount": 30050,
//     "pos_transaction_data": null,
//     "source": null,
//     "fees_breakdown": null,
//     "connect": null,
//     "transaction_date": "2024-08-22T09:14:24.000Z",
//     "plan_object": {},
//     "subaccount": {}
//   }
// }
