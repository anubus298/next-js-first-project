import PocketBase from "pocketbase";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const url = await pb
      .collection("users")
      .authWithOAuth2({ provider: "google" });
    if (pb.authStore.isValid) {
      cookies().set(
        "pb_auth",
        pb.authStore.exportToCookie({
          httpOnly: false,
        }),
        {
          maxAge: 7 * 24 * 60 * 60,
        }
      );
    }
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
}
