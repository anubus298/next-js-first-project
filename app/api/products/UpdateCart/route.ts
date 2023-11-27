import PocketBase from "pocketbase";
import { type NextRequest } from "next/server";
export async function PATCH(request: NextRequest) {
  const pb = new PocketBase(process.env.pocketBaseUrl);

  const body = await request.json();

  const token = request.cookies.get("pb_auth");
  pb.authStore.loadFromCookie(token.value);
  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    pb.authStore.clear();
  return new Response("user not logged!", { status: 401 });

  }
  try {
    const req = await pb
      .collection("Carts")
      .update(pb.authStore.model.id, body);
  } catch (error) {
    return new Response(error.message, {
      status: 400,
    });
  }
  return new Response("Updated!", { status: 200 });
}
