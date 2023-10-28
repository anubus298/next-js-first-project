import PocketBase from "pocketbase";
import { headers } from "next/headers";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
export async function PATCH(request: Request) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const headersList = headers();
  const id = headersList.get("id");
  const res = await request.json();
  const cookieStore = cookies();
  const token = cookieStore.get("pb_auth");
  pb.authStore.loadFromCookie(token);

  try {
    const req = await pb.collection("Carts").update(id, request.body);
  } catch (error) {
    return new Response(error, { status: 500 ,});
  }
  return new Response("done", { status: 200 });
}
