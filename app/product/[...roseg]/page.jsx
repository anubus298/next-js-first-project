export const fetchCache = "force-no-store";

import SuspenseSupport from "./SuspenseSupport";
import Fallback_page from "../(fallback)/Fallback_page";
import { Suspense } from "react";
function Page({ params,searchParams  }) {
  return (
    <div className="relative">
      <Suspense fallback={<Fallback_page />}>
        <SuspenseSupport params={params} searchParams={searchParams}/>
      </Suspense>
    </div>
  );
}

export default Page;
