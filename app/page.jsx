import { Suspense } from "react";
import ProductSection from "./(homePage)/(products section)/productSection";
import Featured from "./(homePage)/(featured)/featured";
import Home_slider from "./(homePage)/(home slider)/home_slider";
import Fallback_page from "./(fallback)/Fallback_page";
export default function Page() {
  return (
    <div className="w-full bg-secondarySecondary">
      <Home_slider />
      <Featured />
      <Suspense fallback={<Fallback_page />}>
        <ProductSection showHeader={true} type={"laptops"} />
      </Suspense>
      <Suspense fallback={<Fallback_page />}>
        <ProductSection showHeader={true} type={"mobiles"} />
      </Suspense>
      <Suspense fallback={<Fallback_page />}>
        <ProductSection showHeader={true} type={"tvs"} />
      </Suspense>
      <Suspense fallback={<Fallback_page />}>
        <ProductSection showHeader={true} type={"tablets"} />
      </Suspense>
    </div>
  );
}
