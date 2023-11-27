import PocketBase from "pocketbase";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("pb_auth");
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const type = searchParams.get("type");
    const regex = /(Pro)(\S)/;
    const field = searchParams.get("field");
    const pb = new PocketBase(process.env.pocketBaseUrl);

    let typeChanged = "";
    pb.authStore.loadFromCookie(token?.value);

    try {
      // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
      const res = await pb.collection(type).getOne(id);
      typeChanged = res.collectionName.replace(regex, (str, p1, p2) => {
        return p2.toLowerCase();
      });
      const res1 = await pb.collection("Carts").getOne(pb.authStore.model.id);
  
      return NextResponse.json({
        ...res,
        type: typeChanged,
        already: res1[field].includes(id, 0),
        hasCookie: request.cookies.has("pb_auth"),
      });
    } catch (_) {
      // clear the auth store on failed refresh
      pb.authStore.clear();
      const res = await pb.collection(type).getOne(id);
      return NextResponse.json({
        ...res,
        type: typeChanged,
        already: false,
        hasCookie: request.cookies.has("pb_auth"),
      });
    }
  } catch (error) {
    return new Response(error);
  }
}
