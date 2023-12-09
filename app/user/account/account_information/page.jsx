export const fetchCache = "force-no-store";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";

import Main_account_information from "./main_account_information";
async function Page() {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  let pb_auth_cookie = await cookies().get("pb_auth");
  pb.authStore.loadFromCookie(pb_auth_cookie?.value);
  try {
    pb.authStore.isValid && (await pb.collection("users").authRefresh());
  } catch (_) {
    pb.authStore.clear();
  }
  async function getAccountInfo() {
    const record = await pb
      .collection("Accounts_informations")
      .getFirstListItem(`user="${pb.authStore.model.id}"`, {
        expand: "user",
        fields:
          "id,user,profile,birth,phone,gender,expand.user.username,expand.user.email,expand.user.created,collectionId,id",
      });
    return record;
  }
  const info = await getAccountInfo();
  return <Main_account_information info={info} />;
}

export default Page;
