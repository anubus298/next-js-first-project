import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const reg = /(pb_auth)=(\S*)/;
  const body = await request.json();
  const path = request.nextUrl.searchParams.get("survive");

  try {
    await pb.collection("users").authWithPassword(body.email, body.password);
    if (pb.authStore.isValid) {
      if (path == "on") {
        cookies().set(
          "pb_auth",
          pb.authStore.exportToCookie({
            httpOnly: false,
          })
        );
      } else {
        cookies().set(
          "pb_auth",
          pb.authStore.exportToCookie({
            httpOnly: false,
          })
        );
      }
      return new Response("done", {
        status: 200,
      });
    }
  } catch (error) {
    return new Response("failed", {
      status: 500,
    });
  }
}
