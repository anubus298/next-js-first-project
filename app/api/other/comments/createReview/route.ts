import PocketBase from "pocketbase";
import { NextResponse, type NextRequest } from "next/server";
import { ratingSchema, ReviewZod } from "../../../../(lib)/Zod/schema";
export async function POST(request: NextRequest) {
  try {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const body = await request.json();
    const token = request.cookies.get("pb_auth");
    pb.authStore.loadFromCookie(token.value);
    ReviewZod.parse(body.comment);
    ratingSchema.parse(body.rating);

    const record = await pb
      .collection("Reviews")
      .create({ ...body, user: pb.authStore.model.id });
    return NextResponse.json({
      err: "success",
    });
  } catch (err) {
    return NextResponse.json({
      err: err.message,
    });
  }
}
