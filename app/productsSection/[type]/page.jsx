
import PocketBase from "pocketbase";
import SidePallete from "./SidePallete";
import MainPallete from "./MainPallete";
import { Suspense } from "react";
async function Page({ params }) {
  async function getAllItems() {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const type = "Pro" + params.type;
    let res = pb
      .collection(type)
      .getFullList({ sort: "@random", expand: "brand" });
    return res;
  }
  let data = await getAllItems();
  return (
    <div className="w-full max-h-[75vh] overflow-y-auto md:min-h-screen flex flex-col md:flex-row  md:gap-x-6">
      <div className="w-full md:w-1/6 md:min-h-[screen] ">
        <SidePallete count={data.length} type={params.type} />
      </div>
      <div className="w-full md:w-5/6 min-h[500px] md:min-h-screen">
        <Suspense fallback={<div className="w-full h-full bg-red-600"></div>}>
          <MainPallete data={data} typeForHref={params.type.toLowerCase()} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
