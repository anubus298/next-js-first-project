import {
  faMobile,
  faTv,
  faLaptop,
  faGlasses,
  faTablet,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SwiperProducts from "./swiper_products";
import shuffle from "../../functions/shuffle";
import { Suspense } from "react";
import Link from "next/link";

async function getPro(type, count) {
  try {
    const res = await fetch(
      `${process.env.pocketBaseUrl}/api/collections/Pro${
        type[0].toUpperCase() + type.slice(1, type.length)
      }/records?page=1&perPage=${
        count ? count : 16
      }&skipTotal=1&expand=brand&sort=@random`
    );
    let content = await res.json();
    return content;
  } catch (error) {
    throw new Error(error);
  }
}

async function ProductSection({
  type,
  count,
  showHeader,
  CurrentPageProductId,
}) {
  let data = await getPro(type, count);
  data["items"] = shuffle(data["items"]);
  if (CurrentPageProductId) {
    data["items"] = data["items"].filter((item) => {
      return item.id != CurrentPageProductId;
    });
  }
  return (
    <Suspense
      fallback={
        <div className="w-full bg-red-500 text-white">
          <p className="text-5xl">loading...</p>
        </div>
      }
    >
      <div className="bg-main">
        <div className="   border-white w-full flex justify-start  font-extrabold pt-2 px-2 ">
          {showHeader && (
            <div
              className="bg-main select-none cursor-pointer text-secondary flex pt-2 px-2 rounded-t-lg justify-center text-center items-center gap-x-3 text-4xl py-2"
            >
              <p className="">{type.toUpperCase()}</p>
              {type === "laptops" ? (
                <FontAwesomeIcon size="1x" icon={faLaptop} />
              ) : type == "mobiles" ? (
                <FontAwesomeIcon size="1x" icon={faMobile} />
              ) : type == "tvs" ? (
                <FontAwesomeIcon size="1x" icon={faTv} />
              ) : type == "tablets" ? (
                <FontAwesomeIcon size="1x" icon={faTablet} />
              ) : (
                <FontAwesomeIcon size="1x" icon={faGlasses} />
              )}
            </div>
          )}
        </div>
        <div>
          <SwiperProducts type={type} data={data} />
        </div>
        {data.items[0] && (
          <div className="w-full flex items-center space-x-2  justify-end pt-1 px-4 ">
            <Link
              className="hover:text-white cursor-pointer text-secondary flex items-center space-x-2 "
              href={
                "/productsSection/" +
                type[0].toUpperCase() +
                type.slice(1, type.length)
              }
            >
              <p className=" font-extrabold">SEE MORE</p>
              <FontAwesomeIcon icon={faArrowRight} size="1x" />
            </Link>
          </div>
        )}
      </div>
    </Suspense>
  );
}

export default ProductSection;
