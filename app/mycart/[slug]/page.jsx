export const fetchCache = "force-no-store";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import CartUI from "./cartUI";
async function Page() {
  async function getCartInfo() {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    let pb_auth_cookie = await cookies().get("pb_auth");
    pb.authStore.loadFromCookie(pb_auth_cookie?.value);
    try {
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
    } catch (_) {
      pb.authStore.clear();
    }
    const res = await pb.collection("Carts").getFullList({
      expand:
        "product_laptops,product_mobiles,product_tvs,product_tablets,product_wearables",
    });
    try {
      let result = [],
        fullPRICE = 0,
        count = 0;
      Object.values(res[0]?.expand).map((type) => {
        type.map((product) => {
          result.push(product);
          fullPRICE += Number(product.price);
          count += 1;
        });
      });
      return {
        products: result,
        fullStartingPrice: fullPRICE,
        count: count,
        origin: res,
        arrayOfproductCounts: result.map(() => 1),
      };
    } catch (error) {
      return {
        products: undefined,
        fullStartingPrice: undefined,
        count: undefined,
        origin: undefined,
        arrayOfproductCounts: undefined,
        err : error.message
      };
    }
  }
  let info = await getCartInfo();
  return (
    <>
      <CartUI
        id={info?.origin ? info?.origin[0]?.id : undefined}
        products={info.products}
        count={info.count}
        err={info.err}
        fullStartingPrice={info.fullStartingPrice}
        arrayOfproductCounts={info.arrayOfproductCounts}
      />
    </>
  );
}

export default Page;
