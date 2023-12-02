export const fetchCache = "default-cache";
import BackComp from "../back";
import DescripSection from "./DescripSection";
import PocketBase from "pocketbase";
import SuggestedSection from "./SuggestedSection";
import ImgSection from "./ImgsSection";
import { cookies } from "next/headers";
async function SuspenseSupport({ params, searchParams }) {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const pb_auth_cookie = await cookies().get("pb_auth");
  pb.authStore.loadFromCookie(pb_auth_cookie?.value);
  const id = params.roseg[1];
  async function getDescription() {
    try {
      const regex = /(Pro)(\S)/;
      let typeChanged = "";
      const type =
        "Pro" +
        params.roseg[0][0].toUpperCase() +
        params.roseg[0].slice(1, params.roseg[0].length);
      try {
        // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
        pb.authStore.isValid && (await pb.collection("users").authRefresh());
        //check if the item is currently on the user cart
      } catch (_) {
        // clear the auth store on failed refresh
        pb.authStore.clear();
      }
      const res = await pb.collection(type).getOne(id);
      typeChanged = res.collectionName.replace(regex, (str, p1, p2) => {
        return p2.toLowerCase();
      });

      return {
        ...res,
        type: typeChanged,
      };
    } catch (error) {}
  }
  async function getAddedOrNot() {
    if (pb.authStore.isValid) {
      const field = "product_" + params.roseg[0];
      const resForCart = await pb
        .collection("Carts")
        .getOne(pb.authStore.model.id, { cache: "no-store" });
      const resForFavorite = await pb
        .collection("Favorites")
        .getOne(pb.authStore.model.id, { cache: "no-store" });
      return {
        alreadyForCart: resForCart[field].includes(id, 0),
        alreadyForFavorite: resForFavorite[field].includes(id, 0),
      };
    } else {
      return {
        alreadyForCart: false,
        alreadyForFavorite: false,
      };
    }
  }
  let data = await getDescription();
  let addedOrNot = await getAddedOrNot();
  data = { ...addedOrNot, ...data };
  return (
    <>
      <BackComp />
      <div className="bg-secondarySecondarylight  w-full gap-y-5 flex p-5 md:flex-row flex-col">
        <ImgSection imgs={data.imgs} id={data.id} cId={data.collectionId} />
        <DescripSection {...data} searchParams={searchParams} />
      </div>
      <SuggestedSection CurrentPageProductId={data.id} type={data.type} />
    </>
  );
}

export default SuspenseSupport;
