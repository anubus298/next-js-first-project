export const fetchCache = "force-no-store";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { encodeNextPBCookie } from "../../functions/encodeCookie";
import CartUI from "./cartUI";


async function Page() {
  let info = await getCartInfo();  
  return (
    <CartUI
      fetch={info}
      id={info?.origin? info?.origin[0]?.id : undefined}
      products={info.products}
      count={info.count}
      fullStartingPrice={info.fullStartingPrice}
    />
  );
}

async function getCartInfo() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  let pb_auth_cookie = await cookies().get("pb_auth");
  const parsed_cookie = encodeNextPBCookie(pb_auth_cookie);
  pb.authStore.loadFromCookie(parsed_cookie);
  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    pb.authStore.clear();
  }
  const res = await pb.collection("Carts").getFullList({
    expand:
      "product_laptops,product_mobiles,product_tvs,product_tablets,product_wearables",
  });
  let data = await res;
  try {
    let result = [],
      fullPRICE = 0,
      count = 0;
    Object.values(data[0]?.expand).map((type) => {
      type.map((product) => {
        result.push(product);
        fullPRICE += Number(product.price);
        count += 1;
      })
    });
    pb.authStore.exportToCookie({ httpOnly: false });
    return {
      products: result,
      fullStartingPrice: fullPRICE,
      count: count,
      origin: data,
    };
  } catch (error) {
    return {
      products: undefined,
      fullStartingPrice: undefined,
      count: undefined,
      origin: undefined,
    };
  }
}


export default Page;
