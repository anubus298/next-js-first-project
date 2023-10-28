import PocketBase from "pocketbase";
import { type NextRequest } from "next/server";
export async function PATCH(request: NextRequest) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const body = await request.json();

  const requestHeaders = new Headers(request.headers);
  const token = request.cookies.get("pb_auth");
  pb.authStore.loadFromCookie(token.name + "=" + token.value);
  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    pb.authStore.clear();
  }
  // const req = await pb.collection("Carts").update(id, body);

  const req = await pb
    .collection("Carts")
    .update(requestHeaders.get("id"), body);
}
