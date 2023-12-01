export const fetchCache = "force-no-store";
import PocketBase from "pocketbase";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const searchParams = request.nextUrl.searchParams;
    const token = request.cookies.get("pb_auth");
    pb.authStore.loadFromCookie(token.value);

    if (!pb.authStore.isValid) {
      pb.authStore.clear();
      return new Response("user not logged!", { status: 401 });
    }

    if (searchParams.get("type") == "number") {
      //notification
      const notif = await pb.collection("Notfications").getFullList({
        fields: "readStatus",
        filter: "readStatus = false",
      });
      const commands = await pb.collection("Commands").getFullList({
        fields: "readStatus",
        filter: "readStatus = false",
      });

      //region for an account collection (soon)
      //commands
      return NextResponse.json({
        success: true,
        notif: notif.length,
        commands: commands.length,
        account: 0,
      });
    }
  } catch (error) {
    return new Response(error.message, {
      status: 400,
    });
  }
}
