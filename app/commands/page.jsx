export const fetchCache = "force-no-store";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import Commands_main from "./commands_main";

async function PageCommands() {
  async function GetCommands() {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    let pb_auth_cookie = await cookies().get("pb_auth");
    pb.authStore.loadFromCookie(pb_auth_cookie?.value);
    try {
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
    } catch (_) {
      pb.authStore.clear();
    }
    const records = await pb.collection("Commands").getFullList({
      sort: "-created",
      fields:
        "id,total_amount,costumer_name,costumer_number,total_amount,shipping_address,status,estimated_delivery_time,product_id,count,type,Notes,Returned",
    });
    //for notification only :
    const makeItReaded = await Promise.all(
      records.map(async (item) => {
        const read = await pb
          .collection("Commands")
          .update(item.id, { readStatus: true }, { requestKey: null });
      })
    );
    const commands = await Promise.all(
      records.map(async (item) => {
        const productInfo = await pb
          .collection(item.type)
          .getOne(item.product_id, {
            fields: "name,imgs,expand.brand,id,collectionId",
            expand: "brand",
            requestKey: null,
          });
        if (productInfo.imgs) {
          productInfo.imgs = productInfo.imgs[0];
        }
        return { ...item, productInfo: { ...productInfo } };
      })
    );
    return commands;
  }
  let commands = await GetCommands();
  return <Commands_main commands={commands} />;
}

export default PageCommands;
