import PocketBase from "pocketbase";
import { type NextRequest } from "next/server";
export async function PATCH(request: NextRequest) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const body = await request.json();

  const token = request.cookies.get("pb_auth");
  pb.authStore.loadFromCookie(token.value);
  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    pb.authStore.clear();
  }
  try {
    const req: Request = await pb
      .collection("Carts")
      .update(pb.authStore.model.id, body);
  } catch (error) {
    return new Response(error.message, {
      status: 300,
    });
  }
  return new Response("Updated!", { status: 200 });
}
