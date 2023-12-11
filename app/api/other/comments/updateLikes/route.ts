import PocketBase from "pocketbase";
import { type NextRequest } from "next/server";
export async function PATCH(request: NextRequest) {
  try {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const body = await request.json();
    const token = request.cookies.get("pb_auth");
    pb.authStore.loadFromCookie(token.value);
    let data = {};
    if (body.isUserLiked) {
      data["likesOwners-"] = pb.authStore.model.id;
    } else {
      data["likesOwners+"] = pb.authStore.model.id;
    }
    const record = await pb.collection("Reviews").update(body.id, data);
  } catch (error) {
    return new Response("failed", {
      status: 400,
    });
  }
  return new Response("Updated!", { status: 200 });
}
