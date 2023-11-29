export const fetchCache = "force-no-store";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import Main_notifications from "./main_notifications";
async function PageNoti() {
  async function handleNotificationsData() {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    let pb_auth_cookie = await cookies().get("pb_auth");
    pb.authStore.loadFromCookie(pb_auth_cookie?.value);
    try {
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
    } catch (_) {
      pb.authStore.clear();
    }
    const records = await pb.collection("Notfications").getFullList({
      sort: "-created",
    });
   
    return records;
  }
  const data = await handleNotificationsData();
  return <Main_notifications notifications={data}/>;
}

export default PageNoti;
