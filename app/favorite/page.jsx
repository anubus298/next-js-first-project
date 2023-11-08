export const fetchCache = "force-no-cache";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import FavoriteUI from "./FavoriteUI";
async function Page() {
  async function getFavorite() {
    const pb = new PocketBase("http://127.0.0.1:8090");
    let pb_auth_cookie = await cookies().get("pb_auth");
    pb.authStore.loadFromCookie(pb_auth_cookie?.value);
    try {
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
    } catch (_) {
      pb.authStore.clear();
    }
    const res = await pb.collection("Favorites").getFullList({
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
          //   fullPRICE += Number(product.price);
          count += 1;
        });
      });
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
  let info = await getFavorite();
  return (
    <>
      <FavoriteUI products={info.products} />
    </>
  );
}

export default Page;
