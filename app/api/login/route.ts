import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { type NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const body = await request.json();
  const path = request.nextUrl.searchParams.get("survive");
  let date = new Date();
  date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
  try {
    const res = await pb
      .collection("users")
      .authWithPassword(body.email, body.password);
    if (pb.authStore.isValid) {
      if (path) {
        cookies().set(
          "pb_auth",
          pb.authStore.exportToCookie({
            httpOnly: false,
          }),
          {
            maxAge: 7 * 24 * 60 * 60,
          }
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
