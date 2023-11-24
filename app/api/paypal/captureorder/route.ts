import { NextResponse, type NextRequest } from "next/server";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import paypal from "@paypal/checkout-server-sdk";
import PocketBase from "pocketbase";
interface productsInfo {
  product_id: string;
  type: string;
  count: number;
}
interface response_body_capture {
  products: [productsInfo];
  costumer_name: string;
  costumer_number: number;
  shipping_address: string;
  order_id: string;
}
export async function POST(requesT: NextRequest) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const res: response_body_capture = await requesT.json();

  // security checks
  const token = requesT.cookies.get("pb_auth");
  pb.authStore.loadFromCookie(token.value);
  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    pb.authStore.clear();
    return new Response("user not logged!", { status: 401 });
  }
  if (!res.order_id)
    return NextResponse.json({
      status: 400,
      success: false,
      message: "Please Provide Order ID",
    });
  //End of some security checks

  const orderID = res.order_id;
  const PaypalClient = configureEnvironment();
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({
    payment_source: undefined,
  });
  const response = await PaypalClient.execute(request);
  if (!response) {
    return NextResponse.json({
      success: false,
      message: "Some Error Occured at backend",
    });
  } else {
    let result = await HandlingTheDataBase(res);
    if (result) {
      return NextResponse.json({
        success: true,
        message: "Payment was successful",
      });
    }
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

async function HandlingTheDataBase(body: response_body_capture) {
  try {
    const pb = new PocketBase("http://127.0.0.1:8090");
    let record;
    body.products.forEach(async (element) => {
      //get element price
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
      const data = {
        user: pb.authStore.model.id,
        id: guidGenerator(),
        estimated_delivery_time: "2024-01-01 10:00:00.123Z",
        total_amount: Number(total_amount.price) * Number(element.count),
        costumer_name: body.costumer_name,
        costumer_number: body.costumer_number,
        shipping_address: body.shipping_address,
        product_id: element.product_id,
        type: element.type,
        count: element.count,
        tracking_number: guidGenerator(),
        status: "Processing",
        shipping_cost: 0,
        Returned: false,
        Notes: "",
      };
      record = await pb.collection("Commands").create(data);
    });
    return true;
  } catch (error) {
    return false;
  }
}

function guidGenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}
