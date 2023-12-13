import PocketBase from "pocketbase";
import { NextResponse, type NextRequest } from "next/server";
import { passwordSchema } from "../../../(lib)/Zod/schema";
export async function POST(request: NextRequest) {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const body = await request.json();
  try {
    passwordSchema.parse(body.password);
    passwordSchema.parse(body.passwordConfirmation);
    await pb
      .collection("users")
      .confirmPasswordReset(
        body.token,
        body.password,
        body.passwordConfirmation
      );
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (error?.name === "ZodError") {
      return NextResponse.json({
        success: false,
        error: error?.issues
          ?.map((i) => {
            return i.message;
          })
          .join(", "),
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "failed",
      });
    }
  }
}
