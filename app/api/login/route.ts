import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const reg = /(pb_auth)=(\S*)/;
  const body = await request.json();
  try {
    await pb.collection("users").authWithPassword(body.email, body.password);
    if (pb.authStore.isValid) {
      // cookies().set(
      //   "pb_auth",
      //   pb.authStore.exportToCookie().replace(reg, (str, p1, p2) => {
      //     return p2;
      //   })
      // );
      cookies().set(
        "pb_auth",
        pb.authStore.exportToCookie({ httpOnly: false })
      );
      return new Response("done", {
        status: 200,

        headers: { "Set-Cookie": "dd" },
      });
    }
  } catch (error) {
    return new Response("failed", {
      status: 500,
    });
  }
}
