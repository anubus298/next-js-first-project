import PocketBase from "pocketbase";
import { NextResponse, type NextRequest } from "next/server";
import {
  ageGreaterThan18Schema,
  genderSchema,
  phoneNumberSchema,
} from "../../../(lib)/Zod/schema";
export async function PATCH(request: NextRequest) {
  try {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const token = request.cookies.get("pb_auth");
    const body = await request.json();
    try {
      pb.authStore.loadFromCookie(token.value);
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
    } catch (_) {
      pb.authStore.clear();
      return new Response("not logged", { status: 401 });
    }
    try {
      ageGreaterThan18Schema.parse(body.birth);
      genderSchema.parse(body.gender);
      phoneNumberSchema.parse(body.phone);
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: "failed",
      });
    }
    const idOfUserInformation = await pb
      .collection("users")
      .getOne(pb.authStore.model.id, {
        fields: "information",
      });
    const record = await pb
      .collection("Accounts_informations")
      .update(idOfUserInformation.information, body);
    const finisher = await pb
      .collection("users")
      .update(pb.authStore.model.id, {
        isHisInfoProvided: true,
      });
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
    });
  }
}
