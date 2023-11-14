import SuspenseSupport from "./SuspenseSupport";
import Fallback_page from "../(fallback)/Fallback_page";
import { Suspense } from "react";
function Page({ params }) {
  return (
    <div className="relative">
      <Suspense fallback={<Fallback_page />}>
        <SuspenseSupport params={params} />
      </Suspense>
    </div>
  );
}

export default Page;
