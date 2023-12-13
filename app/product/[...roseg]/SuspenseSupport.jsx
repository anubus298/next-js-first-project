export const fetchCache = "default-cache";
import BackComp from "../back";
import DescripSection from "./DescripSection";
import PocketBase from "pocketbase";
import SuggestedSection from "./SuggestedSection";
import ImgSection from "./ImgsSection";
import { cookies } from "next/headers";
import ReviewsSection from "./reviews/ReviewsSection";
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
        .getFirstListItem(`user="${pb.authStore.model.id}"`, {
          cache: "no-store",
        });
      const resForFavorite = await pb
        .collection("Carts")
        .getFirstListItem(`user="${pb.authStore.model.id}"`, {
          cache: "no-store",
        });

      return {
        alreadyForCart: resForCart[field]?.includes(id, 0),
        alreadyForFavorite: resForFavorite[field]?.includes(id, 0),
      };
    } else {
      return {
        alreadyForCart: false,
        alreadyForFavorite: false,
      };
    }
  }
  async function getReviews() {
    const resultList = await pb.collection("Reviews").getList(1, 50, {
      filter:
        params.roseg[0].slice(0, params.roseg[0].length - 1) +
        " = " +
        `'${params.roseg[1]}'`,
      expand: "user,user.information",
      fields:
        "expand.user.username,comment,rating,created,likesOwners,id,expand.user.expand.information.color",
      cache: "no-store",
    });
    let body = resultList.items.map((review) => {
      let changeable = { ...review };
      const num = changeable?.likesOwners?.findIndex((item) => {
        return pb.authStore?.model?.id == item;
      });
      changeable["numberOflikes"] = changeable.likesOwners.length;
      delete changeable["likesOwners"];
      num == !-1
        ? (changeable["isLiked"] = true)
        : (changeable["isLiked"] = false);

      return changeable;
    });
    body = body.sort((a, b) => {
      return b.numberOflikes - a.numberOflikes;
    });
    return body;
  }
  let data = await getDescription();
  let addedOrNot = await getAddedOrNot();
  let reviews = await getReviews();
  data = { ...addedOrNot, ...data };
  return (
    <>
      <BackComp />
      <div className="flex flex-col w-full p-5 bg-secondarySecondarylight gap-y-5 md:flex-row">
        <ImgSection imgs={data.imgs} id={data.id} cId={data.collectionId} />
        <DescripSection {...data} searchParams={searchParams} />
      </div>
      <ReviewsSection
        reviews={reviews}
        name={data.name}
        id={params.roseg[1]}
        type={params.roseg[0].slice(0, params.roseg[0].length - 1)}
      />
      <SuggestedSection CurrentPageProductId={data.id} type={data.type} />
    </>
  );
}

export default SuspenseSupport;
