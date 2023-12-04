export const fetchCache = "force-no-store";

import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import Main_purchases from "./main_purchases";

async function Page() {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  let pb_auth_cookie = await cookies().get("pb_auth");
  pb.authStore.loadFromCookie(pb_auth_cookie?.value);
  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    pb.authStore.clear();
  }
  pb.autoCancellation(false);
  async function getPurchases() {
    const resultList = await pb
      .collection("paymentsShelter")
      .getFullList({ sort: "-created" });
    const result = await Promise.all(
      resultList?.map(async (item) => {
        const productInfo = await getIndividualProduct(
          item.product_id,
          item.collection_name
        );
        return { ...item, productInfo: productInfo };
      })
    );
    return result;
  }
  async function getIndividualProduct(id, collectionName) {
    const record = await pb.collection(collectionName).getOne(id, {
      fields: "collectionName,name,imgs,id",
    });
    record["imgs"] = record["imgs"][0];
    return record;
  }
  const purchases = await getPurchases();
  return <Main_purchases purchases={purchases} />;
}

export default Page;
