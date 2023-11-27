export const fetchCache = "force-no-store";
import Checkout_main from "./checkout_main";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
async function Page({ searchParams }) {
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
    let data = await res;
    try {
      let result = [];
      Object.values(data[0]?.expand).map((type) => {
        type.map((product) => {
          result.push(product);
        });
      });
      return {
        products: result,
      };
    } catch (error) {
      return {
        products: undefined,
      };
    }
  }
  let info = await getCartInfo();
  return <Checkout_main data={info} melon={searchParams.melon.split(",")} />;
}

export default Page;
