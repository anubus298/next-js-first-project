import PocketBase from "pocketbase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const token = request.cookies.get("pb_auth");
  pb.authStore.loadFromCookie(token?.value);
  //return to home page if user already logged
  if (request.nextUrl.pathname.startsWith("/logIn") && pb.authStore.isValid) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  //return response if trying to update cart without login

  if (request.method == "PATCH" && !pb.authStore.isValid) {
    return new Response("user not logged", { status: 401 });
  }

  // go to login page if user try to acces cart
  if (
    (request.nextUrl.pathname.startsWith("/mycart") ||
      request.nextUrl.pathname.startsWith("/favorite")) &&
    !pb.authStore.isValid
  ) {
    return NextResponse.redirect(new URL("/logIn/kqfa6xx33", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
