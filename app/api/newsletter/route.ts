import PocketBase from "pocketbase";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pb = new PocketBase(process.env.pocketBaseUrl);

    const data = {
      email: body.email,
    };
    try {
      const record = await pb.collection("Newsletter").create(data);
      return new Response("ok", {
        status: 200,
      });
    } catch (error) {
      return new Response(error.message, {
        status: 400,
      });
    }
  } catch (error) {
    return new Response(error.message, {
      status: 500,
    });
  }
}
