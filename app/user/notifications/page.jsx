export const fetchCache = "force-no-store";

import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import Main_notifications from "./main_notifications";
async function PageNoti() {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  let pb_auth_cookie = await cookies().get("pb_auth");
  pb.authStore.loadFromCookie(pb_auth_cookie?.value);
  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    pb.authStore.clear();
  }
  async function handleNotificationsData() {
    const records = await pb.collection("Notifications").getFullList({
      sort: "readStatus,-created",
    });

    return records;
  }
  async function handleInboxData() {
    const records = await pb.collection("Inboxs").getFullList({
      sort: "readStatus,-created",
    });

    return records;
  }
  const notif = await handleNotificationsData();
  const inbox = await handleInboxData();
  return <Main_notifications notifications={notif} inbox={inbox} />;
}

export default PageNoti;
