import { PaystackSDK } from "@roarexclamation/paystack-ts-sdk";

if (!process.env.PAYSTACK_SECRET_KEY) {
  throw new Error(
    "PAYSTACK_SECRET_KEY is not defined in environment variables"
  );
}

const paystack = new PaystackSDK({
  secretKey: process.env.PAYSTACK_SECRET_KEY,
});

export async function initialize(
  amount: number,
  email: string = "saadidris23@gmail.com",
  orderId: string
) {
  if (!amount || !orderId) return null;
  const response = await paystack.transactions.transactionInitialize({
    transactionInitialize: {
      amount,
      email,
      callbackUrl: `${process.env.BASE_URL}/orders/${orderId}/callback`,
    },
  });

  console.log(response);
  return response;
}

export async function verify(reference: string) {
  if (!reference) return null;
  const response = await paystack.transactions.transactionVerify({ reference });

  return response;
}
