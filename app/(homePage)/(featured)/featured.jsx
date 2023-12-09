import Header_swiper from "./header_swiper";
import shuffle from "../../functions/shuffle";
import Fallback_header_swiper from "./(fallback)/Fallback_header_swiper";
import { Suspense } from "react";
async function getFrontProducts() {
  try {
    const ps = await fetch(
      `${process.env.pocketBaseUrl}api/collections/frontProducts/records?page=1&perPage=15&skipTotal=1&sort=-created`
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
  } catch (error) {
    return undefined;
  }
}

async function Featured() {
  let data = await getFrontProducts();
  return (
    <>
      <div className="border-t-main  border-t-2  w-full flex justify-center text-center bg-main font-extrabold p-2 select-none">
        <p className="text-textWhiteWithSecondary text-4xl">🔥 30% Sales</p>
      </div>
      <div className="w-full flex items-center bg-secondarySecondarylight">
        <div className="w-2/12 h-3/12  bg-secondary  text-textWhiteWithSecondary p-4 flex flex-col justify-start text-start items-start gap-2 font-semibold rounded-e-lg">
          <p className="text-2xl">Brands :</p>
          <p className="cursor-pointer font-medium text-sm">Apple</p>
          <p className="cursor-pointer font-medium text-sm">Samsung</p>
          <p className="cursor-pointer font-medium text-sm">Huawei</p>
          <p className="cursor-pointer font-medium text-sm">Xiaomi</p>
          <p className="cursor-pointer font-medium text-sm">Oppo</p>
          <p className="cursor-pointer font-medium text-sm">Vivo</p>
          <p className="cursor-pointer font-medium text-sm">OnePlus</p>
          <p className="cursor-pointer font-medium text-sm">Google</p>
          <p className="cursor-pointer font-medium text-sm">Motorola</p>
          <p className="cursor-pointer font-medium text-sm">Sony</p>
          <p className="cursor-pointer font-medium text-sm">LG</p>
          <p className="cursor-pointer font-medium text-sm">Nokia</p>
          <p className="cursor-pointer font-medium text-sm">HTC</p>
          <p className="cursor-pointer font-medium text-sm">Lenovo</p>
          <p className="cursor-pointer font-medium text-sm">BlackBerry</p>
        </div>
        <div
          className={`w-8/12 py-8   gap-y-3 gap-x-8 sm:gap-x-16 flex justify-center flex-wrap u  items-center `}
        >
          <Suspense fallback={<Fallback_header_swiper />}>
            {data &&
              Object.keys(data).map((key) => {
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
        <div className="w-2/12 h-3/12  bg-secondary  text-textWhiteWithSecondary p-4 flex flex-col justify-end text-end items-end gap-2 font-semibold rounded-s-lg">
          <p className="text-2xl">: Brands</p>
          <p className="cursor-pointer font-medium text-sm">Apple</p>
          <p className="cursor-pointer font-medium text-sm">Samsung</p>
          <p className="cursor-pointer font-medium text-sm">Huawei</p>
          <p className="cursor-pointer font-medium text-sm">Xiaomi</p>
          <p className="cursor-pointer font-medium text-sm">Oppo</p>
          <p className="cursor-pointer font-medium text-sm">Vivo</p>
          <p className="cursor-pointer font-medium text-sm">OnePlus</p>
          <p className="cursor-pointer font-medium text-sm">Google</p>
          <p className="cursor-pointer font-medium text-sm">Motorola</p>
          <p className="cursor-pointer font-medium text-sm">Sony</p>
          <p className="cursor-pointer font-medium text-sm">LG</p>
          <p className="cursor-pointer font-medium text-sm">Nokia</p>
          <p className="cursor-pointer font-medium text-sm">HTC</p>
          <p className="cursor-pointer font-medium text-sm">Lenovo</p>
          <p className="cursor-pointer font-medium text-sm">BlackBerry</p>
        </div>
      </div>
    </>
  );
}

export default Featured;
