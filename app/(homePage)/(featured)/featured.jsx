import PocketBase from "pocketbase";
import Header_swiper from "./header_swiper";
import Fallback_header_swiper from "./(fallback)/Fallback_header_swiper";
import { Suspense } from "react";
const pb = new PocketBase(process.env.pocketBaseUrl);

async function getImprovedProducts() {
  const tablets = await pb.collection("ProTablets").getList(1, 5, {
    filter: 'sale != "0"',
    fields: "price,sale,imgs,name,id,collectionId",
  });
  const laptops = await pb.collection("ProLaptops").getList(1, 5, {
    filter: 'sale != "0"',
    fields: "price,sale,imgs,name,id,collectionId",
  });
  const mobiles = await pb.collection("ProMobiles").getList(1, 5, {
    filter: 'sale != "0"',
    fields: "price,sale,imgs,name,id,collectionId",
  });
  const tvs = await pb.collection("ProTvs").getList(1, 5, {
    filter: 'sale != "0"',
    fields: "price,sale,imgs,name,id,collectionId",
  });
  const wearables = await pb.collection("ProWearables").getList(1, 5, {
    filter: 'sale != "0"',
    fields: "price,sale,imgs,name,id,collectionId",
  });
  return {
    tablets: tablets.items,
    laptops: laptops.items,
    mobiles: mobiles.items,
    tvs: tvs.items,
    wearables: wearables.items,
  };
}
async function Featured() {
  let data = await getImprovedProducts();
  return (
    <>
      <div className="flex justify-center w-full p-2 font-extrabold text-center border-t-2 select-none border-t-main bg-main">
        <p className="text-4xl text-textWhiteWithSecondary">🔥 Exclusive Sales</p>
      </div>
      <div className="flex items-center w-full bg-secondarySecondarylight">
        <div
          className={`w-full py-8   gap-y-3 gap-x-8 sm:gap-x-16 flex justify-center flex-wrap u  items-center `}
        >
          <Suspense fallback={<Fallback_header_swiper />}>
            {data &&
              Object.keys(data).map((key, i) => {
                return (
                  data[key].length != 0 && (
                    <Header_swiper
                      products={data[key]}
                      type={key}
                      key={i * 14 + 546}
                    />
                  )
                );
              })}
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Featured;
