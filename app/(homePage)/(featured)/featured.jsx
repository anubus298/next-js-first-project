import Header_swiper from "./header_swiper";
import shuffle from "../../functions/shuffle";

async function getFrontProducts() {
  const ps = await fetch(
    "http://127.0.0.1:8090/api/collections/frontProducts/records?page=1&perPage=15&skipTotal=1&sort=-created",
  );
  const res = await ps.json();
  res["items"] = shuffle(res["items"]);

  let data = {
    "mobile": [],
    "laptop": [],
    "tv": [],
    "wearable": [],
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
        {Object.keys(data).map((key) => {
          return (
            <Header_swiper
              products={data[key]}
              type={key}
              key={data[key]["collectionId"]}
            />
          );
        })}
      </div>
    </>
  );
}

export default Featured;
