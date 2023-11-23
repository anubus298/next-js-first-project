import { type NextRequest } from "next/server";
import client from "../../../(lib)/paypal/paypal";
import paypal from "@paypal/checkout-server-sdk";

export async function POST(requesT: NextRequest) {
  const res = await requesT.json();
  try {
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["prefer"] = "return=representation";
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: res.order_price + "",
          },
        },
      ],
    });
    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
      console.log("RES: ", response);
      return new Response("ok", {
        status: 500,
        success: false,
        message: "Some Error Occured at backend",
      });
    }
    return new Response
  } catch (err) {
    console.log("Err at Create Order: ", err);
    return new Response("ok", {
      status: 500,
      success: false,
      message: "Could Not Found the user",
    });
  }
}
