import Header_swiper from "./header_swiper";
import shuffle from "../../functions/shuffle";
import Fallback_header_swiper from "./(fallback)/Fallback_header_swiper";
import { Suspense } from "react";
async function getFrontProducts() {
  const ps = await fetch(
    `${process.env.pocketBaseUrl}/api/collections/frontProducts/records?page=1&perPage=15&skipTotal=1&sort=-created`,
    { cache: "no-cache" }
  );
  const res = await ps.json();
  res["items"] = shuffle(res["items"]);

  let data = {
    mobile: [],
    laptop: [],
    tv: [],
    wearable: [],
  };
  res["items"].forEach((item) => {
    if (!data[item.type]) {
      data[item.type] = [];
    }
    data[item.type].push(item);
  });
  return data;
}

async function Featured() {
  let data = await getFrontProducts();
  return (
    <>
      <div className="border-t-main  border-t-2  w-full flex justify-center text-center bg-main font-extrabold p-2 select-none">
        <p className="text-secondary text-4xl">Featured</p>
      </div>
      <div
        className={`w-full py-8 bg-secondarySecondarylight  gap-y-3 gap-x-8 sm:gap-x-16 flex justify-center flex-wrap u  items-center `}
      >
        <Suspense fallback={<Fallback_header_swiper />}>
          {Object.keys(data).map((key) => {
            return (
              <Header_swiper
                products={data[key]}
                type={key}
                key={data[key]["collectionId"]}
              />
            );
          })}
        </Suspense>
      </div>
    </>
  );
}

export default Featured;
