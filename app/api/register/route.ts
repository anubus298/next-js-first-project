import PocketBase from "pocketbase";
import { NextResponse, type NextRequest } from "next/server";
import z from "zod";

import {
  emailSchema,
  NameSchema,
  passwordSchema,
  Term,
} from "../../(lib)/Zod/schema";
interface regiserData {
  password: string;
  passwordConfirm: string;
  email: string;
  first_name: string;
  last_name: string;
  Term: boolean;
  Subscribe: boolean;
}

export async function POST(request: NextRequest) {
  const zodSchema = z.object({
    password: passwordSchema,
    passwordConfirm: passwordSchema,
    email: emailSchema,
    first_name: NameSchema,
    last_name: NameSchema,
    Term: Term,
    Subscribe: z.boolean(),
  });
  try {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const body: regiserData = await request.json();
    try {
      zodSchema.parse(body);
    } catch (error) {
      return NextResponse.json({
        success: false,
        error: error?.issues?.join(", "),
      });
    }
    const record = await pb.collection("users").create({
      username:
        body.first_name.split(" ").join("_") +
        "_" +
        body.last_name.split(" ").join("_"),
      email: body.email,
      emailVisibility: false,
      password: body.password,
      passwordConfirm: body.passwordConfirm,
    });

    await pb.collection("users").requestVerification(body.email);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
