import PocketBase from "pocketbase";
import { NextRequest, NextResponse } from "next/server";
interface tokenBody {
  country: string;
  town_city: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
  code_postal: number;
  products: {
    id: string;
    collectionName: string;
    count: number;
  }[];
}
interface responseToUser {
  result: {
    products: {
      productId: string;
      totalAmount: number;
      count: number;
      perOne: number;
      shipping: number;
      taxes: number;
    };
    processingId: string;
    success: boolean;
  }[];
}
export async function POST(request: NextRequest) {
  const pb = new PocketBase(process.env.pocketBaseUrl);

  try {
    const token = request.cookies.get("pb_auth");

    try {
      pb.authStore.loadFromCookie(token?.value);
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
    } catch (_) {
      pb.authStore.clear();
      return new Response("not logged", { status: 401 });
    }
    const body: tokenBody = await request.json();

    //?make validation pattern here for the body

    // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)

    //?make token calculator api here

    //sending informations to paymentsShelter with a unique id
    const response = await writeData(body, pb);
    return NextResponse.json(response);
  } catch (_) {
    return new Response("error happened", { status: 400 });
  }
}

async function writeData(body: tokenBody, pb) {
  let responseToUser: responseToUser = {
    result: [],
  };

  await Promise.all(
    body.products.map(async (item) => {
      const uniqueId = generateUniqueId();

      try {
        const price = await pb
          .collection(item.collectionName)
          .getOne(item.id, { fields: "price" });
        let data = {
          user: pb.authStore.model.id,
          id: uniqueId,
          total: Number(price.price) + 15,
          shipping_cost: 15,
          costumer_name: body.first_name + " " + body.last_name,
          costumer_number: body.phone,
          shipping_address:
            body.country + ", " + body.address + ", " + body.code_postal,
          product_id: item.id,
          count: item.count,
          collection_name: item.collectionName,
        };
        const record = await pb
          .collection("paymentsShelter")
          .create(data, { requestKey: null });
        responseToUser.result.push({
          products: {
            productId: item.id,
            count: item.count,
            perOne: Number(price.price),
            shipping: 10,
            taxes: 5,
            totalAmount: Number(price.price) + 15,
          },
          success: true,
          processingId: uniqueId,
        });
      } catch (error) {
        responseToUser.result.push({
          products: {
            productId: item.id,
            perOne: undefined,
            count: item.count,
            totalAmount: undefined,
            shipping: undefined,
            taxes: undefined,
          },
          success: false,
          processingId: undefined,
        });
      }
    })
  );
  return responseToUser;
}

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(100000000 + Math.random() * 100000000); // Random number between 0 and 99999999
  const uniqueId =
    timestamp.toString().slice(-8) + random.toString().slice(0, 7); // Combine timestamp and random part
  return uniqueId;
}
