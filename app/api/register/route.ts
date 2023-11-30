import PocketBase from "pocketbase";
import { type NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const body = await request.json();
    const subscribe = request.nextUrl.searchParams.get("subscribe");
    const record = await pb.collection("users").create({
      username: body.first_name + "_" + body.last_name,
      email: body.email,
      emailVisibility: false,
      password: body.password,
      passwordConfirm: body.passwordConfirm,
    });
    const dataForCreate = {
      user: pb.authStore.model.id,
      product_laptops: [],
      product_mobiles: [],
      product_tablets: [],
      product_tvs: [],
      product_wearables: [],
    };
    const fav = await pb.collection("Favorites").create(dataForCreate);
    const cart = await pb.collection("Carts").create(dataForCreate);
    return new Response("ok", { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 400 });
  }
}
