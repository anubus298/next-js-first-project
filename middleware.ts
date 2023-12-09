import PocketBase from "pocketbase";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const token = request.cookies.get("pb_auth");
  pb.authStore.loadFromCookie(token?.value);

  //return to home page if user already logged
  if (
    (request.nextUrl.pathname.startsWith("/logIn") ||
      request.nextUrl.pathname.startsWith("/signIn")) &&
    pb.authStore.isValid
  ) {
    try {
      await pb.collection("users").authRefresh();
      return NextResponse.redirect(new URL("/", request.url));
    } catch (_) {
      pb.authStore.clear();
      const responseToLogin = NextResponse.next();
      responseToLogin.cookies.delete("pb_auth");
      return responseToLogin;
    }
  }

  //return response if trying to update cart without login
  if (
    (request.method == "PATCH" || request.method == "POST") &&
    !request.nextUrl.pathname.startsWith("/api/login") &&
    !request.nextUrl.pathname.startsWith("/api/register") &&
    pb.authStore.isValid
  ) {
    try {
      await pb.collection("users").authRefresh();
      return NextResponse.next();
    } catch (_) {
      pb.authStore.clear();
      const responseToLogin = new Response("not authorized", {
        status: 401,
      });
      return responseToLogin;
    }
  }

  // go to login page if user try to access those routes
  if (
    request.nextUrl.pathname.startsWith("/mycart") ||
    request.nextUrl.pathname.startsWith("/commands") ||
    request.nextUrl.pathname.startsWith("/notification") ||
    request.nextUrl.pathname.startsWith("/checkout") ||
    request.nextUrl.pathname.startsWith("/commands") ||
    request.nextUrl.pathname.startsWith("/user")
  ) {
    if (pb.authStore.isValid) {
      try {
        pb.authStore.isValid && (await pb.collection("users").authRefresh());
        return NextResponse.next();
      } catch (_) {
        pb.authStore.clear();
        const responseToLogin = NextResponse.redirect(
          new URL(
            "/logIn/kqfa6xx33?from=" + request.nextUrl.pathname,
            request.url
          )
        );
        responseToLogin.cookies.delete("pb_auth");
        return responseToLogin;
      }
    } else {
      const responseToLogin = NextResponse.redirect(
        new URL(
          "/logIn/kqfa6xx33?from=" + request.nextUrl.pathname,
          request.url
        )
      );
      responseToLogin.cookies.delete("pb_auth");
      return responseToLogin;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
