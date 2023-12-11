export const fetchCache = "force-no-store";
import Checkout_main from "./checkout_main";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
async function Page({ searchParams }) {
  const pb = new PocketBase(process.env.pocketBaseUrl);

  let pb_auth_cookie = await cookies().get("pb_auth");
  pb.authStore.loadFromCookie(pb_auth_cookie?.value);
  !pb.authStore.isValid && pb.authStore.clear();
  async function getCartInfo() {
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
  async function getAddress() {
    try {
      const record = await pb
        .collection("Addresses")
        .getList(1, 4, `user="${pb.authStore.model.id}"`, {
          fields: "address,phone,country,town_city,code_postal",
        });
      return record;
    } catch (error) {
      return undefined;
    }
  }
  let info = await getCartInfo();
  let adresses = await getAddress();
  return (
    <Checkout_main
      addresses={adresses.items}
      data={info}
      melon={searchParams.melon.split(",")}
    />
  );
}

export default Page;
