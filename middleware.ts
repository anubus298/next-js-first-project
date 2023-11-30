import PocketBase from "pocketbase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const token = request.cookies.get("pb_auth");
  pb.authStore.loadFromCookie(token?.value);

  //return to home page if user already logged
  if (
    (request.nextUrl.pathname.startsWith("/logIn") ||
      request.nextUrl.pathname.startsWith("/signIn")) &&
    pb.authStore.isValid
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  //return response if trying to update cart without login
  if (
    (request.method == "PATCH" || request.method == "POST") &&
    !request.nextUrl.pathname.startsWith("/api/login") &&
    !request.nextUrl.pathname.startsWith("/api/register") &&
    !pb.authStore.isValid
  ) {
    return new Response(request.nextUrl.pathname, { status: 401 });
  }

  // go to login page if user try to access cart
  if (
    (request.nextUrl.pathname.startsWith("/mycart") ||
      request.nextUrl.pathname.startsWith("/commands") ||
      request.nextUrl.pathname.startsWith("/notification") ||
      request.nextUrl.pathname.startsWith("/checkout") ||
      request.nextUrl.pathname.startsWith("/favorite")) &&
    !pb.authStore.isValid
  ) {
    return NextResponse.redirect(
      new URL("/logIn/kqfa6xx33?from=" + request.nextUrl.pathname, request.url)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
