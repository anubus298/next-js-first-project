export const fetchCache = "force-no-store";

import { cookies } from "next/headers";
import NavbarJS from "./(navbarComponents)/NavbarJS";
import PocketBase from "pocketbase";

async function NavbarServer() {
  async function GetUserCategoriesInfo() {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    try {
      const token = cookies().get("pb_auth");
      pb.authStore.loadFromCookie(token?.value);
      if (!pb.authStore.isValid) {
        pb.authStore.clear();
        return {
          notif: 0,
          commands: 0,
          account: 0,
          color: "",
          err : "not-valid"
        };
      }
      //notification
      const inbox = await pb.collection("Inboxs").getFullList({
        fields: "readStatus",
        filter: "readStatus = false",
      });
      const notif = await pb.collection("notifications").getFullList({
        fields: "readStatus",
        filter: "readStatus = false",
      });
      const commands = await pb.collection("Commands").getFullList({
        fields: "readStatus",
        filter: "readStatus = false",
      });
      const color = await pb
        .collection("Accounts_informations")
        .getFirstListItem(`user="${pb.authStore.model.id}"`, {
          fields: "color",
        });
      //region for an account collection (soon)

      return {
        notif: notif.length + inbox.length,
        commands: commands.length,
        account: 0,
        color: color.color,
      };
    } catch (error) {
      return {
        notif: 0,
        commands: 0,
        account: 0,
        color: "",
        err: error.message,
      };
    }
  }
  const notiff = await GetUserCategoriesInfo();
  return <NavbarJS notiff={notiff} />;
}

export default NavbarServer;
