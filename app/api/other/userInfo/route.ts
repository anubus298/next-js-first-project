import PocketBase from "pocketbase";
import { NextResponse, type NextRequest } from "next/server";
import { HexSchema } from "../../../(lib)/Zod/schema";
import { z } from "zod";

export async function PATCH(request: NextRequest) {
  try {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const body = await request.json();
    const token = request.cookies.get("pb_auth");
    pb.authStore.loadFromCookie(token?.value);
    body.key == "color" && HexSchema.parse(body.value);
    let data = {};
    data[body.key] = body.value;
    const record = await pb
      .collection("Accounts_informations")
      .update(body.id, data);
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      err: error.message,
    });
  }
}
