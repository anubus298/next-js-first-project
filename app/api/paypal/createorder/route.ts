import { NextResponse, type NextRequest } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import PocketBase from "pocketbase";

interface ProductsInfo {
  product_id: string;
  type: string;
  count: number;
}
interface Payer {
  name: string;
  phone: number;
  address: { string };
}
interface Response_body_create {
  products: [ProductsInfo];
  payer: [];
}
export async function POST(requesT: NextRequest) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  try {
    const res: paypal.orders.OrdersCreate.RequestData = await requesT.json();

    const PaypalClient = configureEnvironment();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["prefer"] = "return=representation";
    const purchases = await Promise.all(
      res.purchase_units.map(async (element) => {
        const total_amount = await pb
          .collection(
            `Pro${
              element.type[0].toUpperCase() +
              element.type.slice(1, element.type.length)
            }s`
          )
          .getOne(element.product_id, {
            fields: "price",
          });
        return {
          amount: {
            currency_code: "USD",
            value: Number(total_amount.price) * Number(element.count),
          },
        };
      })
    );
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [purchases],
    });
    const createOrder = await PaypalClient.execute(request);

    if (createOrder.statusCode !== 201) {
      console.log("RES: ", createOrder);
      return new Response("ok", {
        status: 401,
      });
    }
    return NextResponse.json(createOrder.result.id);
  } catch (err) {
    return NextResponse.json({
      err: err,
    });
  }
}

function configureEnvironment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  let env = new checkoutNodeJssdk.core.SandboxEnvironment(
    clientId,
    clientSecret
  );
  return new checkoutNodeJssdk.core.PayPalHttpClient(env);
}
