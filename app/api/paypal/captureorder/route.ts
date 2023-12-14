import { NextResponse, type NextRequest } from "next/server";
import checkoutNodeJssdk from "@paypal/checkout-server-sdk";
import paypal from "@paypal/checkout-server-sdk";
import PocketBase from "pocketbase";

export async function POST(requesT: NextRequest) {
  try {
    const pb = new PocketBase(process.env.pocketBaseUrl);

    const res = await requesT.json();

    // security checks
    const token = requesT.cookies.get("pb_auth");
    pb.authStore.loadFromCookie(token.value);
    try {
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
    } catch (_) {
      pb.authStore.clear();
      return new Response("user not logged!", { status: 401 });
    }
    if (!res.orderID)
      return NextResponse.json({
        status: 400,
        success: false,
        message: "Please Provide Order ID",
      });

    const PaypalClient = configureEnvironment();
    const orderID = res.orderID;
    const check = new paypal.orders.OrdersGetRequest(orderID);
    const checkResult = await PaypalClient.execute(check);

    //validate paypal data with collection data
    let isNotValid = false;
    const dd = await Promise.all(
      checkResult.result.purchase_units.map(async (element) => {
        const record = await pb
          .collection("paymentsShelter")
          .getOne(element.reference_id, { fields: "total" });
        if (!(Number(record.total) == Number(element.amount.value))) {
          isNotValid = true;
        }
        return 0;
      })
    );
    if (isNotValid) {
      return NextResponse.json({
        success: false,
        message: "errors in data given",
      });
    }

    //End of some security checks

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
      let result = await HandlingTheDataBase(res, pb);
      if (result.success) {
        const dataDelete = {
          product_laptops: [],
          product_mobiles: [],
          product_tablets: [],
          product_tvs: [],
          product_wearables: [],
        };
        const record = await pb
          .collection("Carts")
          .update(pb.authStore.model.id, dataDelete);

        return NextResponse.json({
          success: true,
          message: "Payment was successful",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: result.error,
        });
      }
    }
  } catch (error) {
    return new Response(error);
  }
}

async function HandlingTheDataBase(body, pb) {
  try {
    let ReturnedElem = [];
    const ff = await Promise.all(
      body.productProcessingIds.map(async (id) => {
        const shelter = await pb
          .collection("paymentsShelter")
          .getOne(id, { requestKey: null });
        const data = {
          user: pb.authStore.model.id,
          id: generateUniqueId(),
          estimated_delivery_time: "2024-01-01 10:00:00.123Z",
          total_amount: shelter.total,
          costumer_name: shelter.costumer_name,
          costumer_number: shelter.costumer_number,
          shipping_address: shelter.shipping_address,
          product_id: shelter.product_id,
          type: shelter.collection_name,
          count: shelter.count,
          status: "Processing",
          shipping_cost: shelter.shipping_cost,
          bill: id,
          readStatus: false,
          Returned: false,
          Notes: "",
        };
        const record = await pb
          .collection("Commands")
          .create(data, { requestKey: null });
        if (record) {
          ReturnedElem.push({
            tracking_number: data.id,
            product_id: data.product_id,
          });
        }
      })
    );
    return {
      success: true,
      trackings: ReturnedElem,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 100000000); // Random number between 0 and 99999999
  const uniqueId =
    timestamp.toString().slice(-8) + random.toString().slice(0, 7); // Combine timestamp and random part
  return uniqueId;
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
