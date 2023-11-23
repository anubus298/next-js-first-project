import { type NextRequest } from "next/server";
import client from "../../../../(lib)/paypal/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(requesT: NextRequest) {
  const res = await requesT.json();

  if (!res.orderID)
    return new Response("ok", {
      status: 400,
      success: false,
      message: "Please Provide Order ID",
    });

  //Capture order to complete payment
  const { orderID } = res;
  const PaypalClient = client();
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});
  const response = await PaypalClient.execute(request);
  if (!response) {
    return new Response("ok", {
      status: 500,
      success: false,
      message: "Some Error Occured at backend",
    });
  }

  // Your Custom Code to Update Order Status
  // And Other stuff that is related to that order, like wallet
  // Here I am updateing the wallet and sending it back to frontend to update it on frontend
}
