import { Suspense } from "react";
import ProductSection from "./(homePage)/(products section)/productSection";
import Featured from "./(homePage)/(featured)/featured";
import Home_slider from "./(homePage)/(home slider)/home_slider";
export default function Page() {
  return (
    <div className="w-full bg-secondarySecondary">
      <Home_slider />
      <Featured />
      <ProductSection showHeader={true} type={"laptops"} />
      <ProductSection showHeader={true} type={"mobiles"} />
      <ProductSection showHeader={true} type={"tvs"} />
      <ProductSection showHeader={true} type={"tablets"} />
    </div>
  );
}
