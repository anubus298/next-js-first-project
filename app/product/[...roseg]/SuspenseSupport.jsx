import BackComp from "../back";
import DescripSection from "./DescripSection";
import PocketBase from "pocketbase";
import SuggestedSection from "./SuggestedSection";
import ImgSection from "./ImgsSection";
import { cookies } from "next/headers";
async function SuspenseSupport({ params }) {
  async function getDescription() {
    try {
      const pb = new PocketBase("http://127.0.0.1:8090");
      const regex = /(Pro)(\S)/;
      let pb_auth_cookie = await cookies().get("pb_auth"),
        typeChanged = "";
      pb.authStore.loadFromCookie(pb_auth_cookie?.value);
      const type =
        "Pro" +
        params.roseg[0][0].toUpperCase() +
        params.roseg[0].slice(1, params.roseg[0].length);
      const field = "product_" + params.roseg[0];
      const id = params.roseg[1];
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
      if (pb.authStore.isValid) {
        const resForCart = await pb
          .collection("Carts")
          .getOne(pb.authStore.model.id);
        const resForFavorite = await pb
          .collection("Favorites")
          .getOne(pb.authStore.model.id);
        return {
          ...res,
          type: typeChanged,
          alreadyForCart: resForCart[field].includes(id, 0),
          alreadyForFavorite: resForFavorite[field].includes(id, 0),
        };
      } else {
        return {
          ...res,
          type: typeChanged,
          alreadyForCart: false,
          alreadyForFavorite: false,
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  let data = await getDescription();
  return (
    <>
      <BackComp />
      <div className="bg-secondarySecondarylight  w-full gap-y-5 flex p-5 md:flex-row flex-col">
        <ImgSection imgs={data.imgs} id={data.id} cId={data.collectionId} />
        <DescripSection {...data} />
      </div>
      <SuggestedSection CurrentPageProductId={data.id} type={data.type} />
    </>
  );
}

export default SuspenseSupport;

// async function fetching() {
//   try {
//     const token = request.cookies.get("pb_auth");

//     const field = searchParams.get("field");
//     const pb = new PocketBase("http://127.0.0.1:8090");
//     let typeChanged = "";
//     pb.authStore.loadFromCookie(token?.value);

//     try {
//       // get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
//       pb.authStore.isValid && (await pb.collection("users").authRefresh());
//       const res = await pb.collection(type).getOne(id);
//       typeChanged = res.collectionName.replace(regex, (str, p1, p2) => {
//         return p2.toLowerCase();
//       });
//       const res1 = await pb.collection("Carts").getOne(pb.authStore.model.id);

//       return NextResponse.json({
//         ...res,
//         type: typeChanged,
//         already: res1[field].includes(id, 0),
//         hasCookie: request.cookies.has("pb_auth"),
//       });
//     } catch (_) {
//       // clear the auth store on failed refresh
//       pb.authStore.clear();
//       const res = await pb.collection(type).getOne(id);
//       return NextResponse.json({
//         ...res,
//         type: typeChanged,
//         already: false,
//         hasCookie: request.cookies.has("pb_auth"),
//       });
//     }
//   } catch (error) {
//     return new Response(error);
//   }
// }
