import PocketBase from "pocketbase";
import { type NextRequest } from "next/server";
import { headers } from "next/headers";
export async function GET(request: NextRequest) {
  try {
    const headersList = headers();
    const id = headersList.get("id");
    const type = headersList.get("type");
    const pb = new PocketBase(process.env.pocketBaseUrl);

    const token = request.cookies.get("pb_auth");
    pb.authStore.loadFromCookie(token.value);
    try {
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
    } catch (_) {
      pb.authStore.clear();
      return new Response("user not logged!", { status: 401 });
    }

    const record = await pb.collection("Carts").getOne(pb.authStore.model.id);
    if (record[type]?.includes(id, 0)) {
      return new Response("ok", { status: 200 });
    } else {
      return new Response("cantFindIt", { status: 400 });
    }
  } catch (error) {
    return new Response(error, { status: 500 });
  }


}
