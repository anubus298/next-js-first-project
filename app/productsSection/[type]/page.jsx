export const revalidate = 60;

import PocketBase from "pocketbase";
import MainPallete from "./MainPallete";
import { Suspense } from "react";
export async function generateMetadata({ params }) {
  return {
    title: params.type,
  };
}
async function Page({ params }) {
  async function getAllItems() {
    const pb = new PocketBase(process.env.pocketBaseUrl);
    const type = "Pro" + params.type;
    let res = pb
      .collection(type)
      .getFullList({ sort: "-sale", expand: "brand" });
    return res;
  }
  let data = await getAllItems();
  return (
    <div className="flex flex-col w-full md:min-h-screen md:flex-row md:gap-x-6">
      <div className="w-full  min-h[500px] md:min-h-screen">
        <Suspense fallback={<div className="w-full h-full bg-white"></div>}>
          <MainPallete data={data} typeForHref={params.type.toLowerCase()} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
