export const fetchCache = "force-no-store";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { encodeNextPBCookie } from "../../functions/encodeCookie";
import CartUI from "./cartUI";
async function getCartInfo() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  let pb_auth_cookie = await cookies().get("pb_auth");
  const parsed_cookie = encodeNextPBCookie(pb_auth_cookie);
  pb.authStore.loadFromCookie(parsed_cookie);
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
      });
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

async function Page() {
  let info = await getCartInfo();
  const originalData = {
    user: info?.origin[0]?.user,
    product_laptops: info?.origin[0]?.product_laptops,
    product_mobiles: info?.origin[0]?.product_mobiles,
    product_tablets: info?.origin[0]?.product_tablets,
    product_tvs: info?.origin[0]?.product_tvs,
    product_wearables: info?.origin[0]?.product_wearables,
  };
  return (
    <CartUI
      originalData={originalData}
      id={info.origin[0].id}
      products={info.products}
      count={info.count}
      fullStartingPrice={info.fullStartingPrice}
    />
  );
}

export default Page;
