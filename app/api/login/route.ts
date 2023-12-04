import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { emailSchema, passwordSchema } from "../../(lib)/Zod/schema";
import { z } from "zod";
interface loginData {
  email: string;
  password: string;
}
export async function POST(request: NextRequest) {
  const zodSchema = z.object({
    password: passwordSchema,
    email: emailSchema,
  });
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const body: loginData = await request.json();
  try {
    zodSchema.parse(body);
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: "invalid email or password",
    });
  }
  const path = request.nextUrl.searchParams.get("survive");
  let date = new Date();
  date.setTime(date.getTime() + 10 * 24 * 60 * 60 * 1000);
  try {
    const res = await pb
      .collection("users")
      .authWithPassword(body.email, body.password);
    if (!pb.authStore.model.verified) {
      return NextResponse.json({
        success: false,
        msg: "Account is not verified,check your email address.",
      });
    }
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
      if (!pb.authStore.model.isFieldsCreated) {
        const dataForCreate = {
          user: pb.authStore.model.id,
          id: pb.authStore.model.id,
          product_laptops: [],
          product_mobiles: [],
          product_tablets: [],
          product_tvs: [],
          product_wearables: [],
        };
        const fav = await pb.collection("Favorites").create(dataForCreate);
        const cart = await pb.collection("Carts").create(dataForCreate);
        const change = await pb
          .collection("users")
          .update(pb.authStore.model.id, { isFieldCreated: true });
      }
      return NextResponse.json({
        success: true,
        msg: "successfully authenticated",
      });
    }
  } catch (error) {
    if ((error.message = "Failed to authenticate.")) {
      return NextResponse.json({
        success: false,
        msg: "no such email or password.",
      });
    } else {
      return NextResponse.json({
        success: false,
        msg: error.message,
      });
    }
  }
}
