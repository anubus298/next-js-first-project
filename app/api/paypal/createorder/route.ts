import { NextResponse, type NextRequest } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import PocketBase from "pocketbase";


export async function POST(requesT: NextRequest) {
  const pb = new PocketBase(process.env.pocketBaseUrl);

  try {
    const body = await requesT.json();
    const token = requesT.cookies.get("pb_auth");
    pb.authStore.loadFromCookie(token.value);
    try {
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
    } catch (_) {
      pb.authStore.clear();
      return new Response("user not logged!", { status: 401 });
    }
    const PaypalClient = configureEnvironment();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["prefer"] = "return=representation";
    const items = await Promise.all(
      body.ProcessingIds.map(async (item) => {
        const record = await pb.collection("paymentsShelter").getOne(item);
        const productName = await pb
          .collection(record.collection_name)
          .getOne(record.product_id, {
            fields: "name",
          });
        return {
          reference_id: item,
          description: "Quantity" + record.count + ",Name: " + productName.name,
          amount: {
            currency_code: "USD",
            value: record.total,
          },
        };
      })
    );
    // return NextResponse.json({
    //   items : items
    // })

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: items,
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
  let env = new checkoutNodeJssdk.core.LiveEnvironment(
    clientId,
    clientSecret
  );
  return new checkoutNodeJssdk.core.PayPalHttpClient(env);
}
