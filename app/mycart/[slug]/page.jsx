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
      let result = [];
      Object.values(res[0]?.expand).map((type) => {
        type.map((product) => {
          delete product["brand"];
          delete product["created"];
          delete product["updated"];
          delete product["description"];
          product["imgs"] = product["imgs"][0];
          result.push(product);
        });
      });
      return {
        products: result,
        origin: res,
      };
    } catch (error) {
      return {
        products: undefined,
        origin: undefined,
      };
    }
  }
  let info = await getCartInfo();
  return (
    <>
      <CartUI
        id={info?.origin ? info?.origin[0]?.id : undefined}
        products={info.products}
        count={info.products?.length}
        arrayOfproductCountsServer={info.products?.map(() => {
          return 1;
        })}
      />
    </>
  );
}

export default Page;
