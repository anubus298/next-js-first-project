import PocketBase from "pocketbase";
import { NextResponse, type NextRequest } from "next/server";
import { emailSchema } from "../../../(lib)/Zod/schema";
export async function POST(request: NextRequest) {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const body = await request.json();
  try {
    emailSchema.parse(body.email);
    await pb.collection("users").requestPasswordReset(body.email);
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error?.issues?.join(", "),
    });
  }
}
