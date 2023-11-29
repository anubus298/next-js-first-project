import PocketBase from "pocketbase";
import { type NextRequest } from "next/server";
export async function PATCH(request: NextRequest) {
  try {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const body = await request.json();
    const token = request.cookies.get("pb_auth");
    pb.authStore.loadFromCookie(token.value);
    if (!pb.authStore.isValid) {
      pb.authStore.clear();
      return new Response("user not logged!", { status: 401 });
    }

    const read = await pb
      .collection(body.collectionName)
      .update(body.id, { readStatus: true });
    return new Response("success", { status: 200 });
  } catch (error) {
    return new Response("false", { status: 400 });
  }
}
