 export const fetchCache = 'force-no-store';
import { NextResponse } from "next/server";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { encodeNextPBCookie } from "../../functions/encodeCookie";

export async function GET(request) {
  try {
    let pb_auth_cookie = await cookies().get("pb_auth");
  const parsed_cookie = encodeNextPBCookie(pb_auth_cookie)
  const pb = new PocketBase("http://127.0.0.1:8090");
  pb.authStore.loadFromCookie(parsed_cookie);
  const res = await pb.collection("Carts").getOne(pb_auth_cookie,{
    expand: "product_laptops,product_mobiles",
  });
  let data = await res;
  //   let result = [];
  //   Object.values(data.expand).map((type) => {
  //     type.map((product) => {
  //       result.push(product);
  //     });
  //   });
  return NextResponse.json(data);
  } catch (error) {
    throw Error(error);
  }
}
