export const fetchCache = "default-cache";
import SuspenseSupport from "./SuspenseSupport";
import Fallback_page from "../(fallback)/Fallback_page";
import PocketBase from "pocketbase";
import { Suspense } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export async function generateMetadata({ params }) {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const id = params.roseg[1];
  const type =
    "Pro" +
    params.roseg[0][0].toUpperCase() +
    params.roseg[0].slice(1, params.roseg[0].length);
  const res = await pb.collection(type).getOne(id, {
    fields: "name",
    cache : "force-cache"
  });

  return {
    title: res.name,
  };
}
function Page({ params, searchParams }) {
  return (
    <div className="relative">
      <Suspense fallback={<Fallback_page />}>
        <SuspenseSupport params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

export default Page;
