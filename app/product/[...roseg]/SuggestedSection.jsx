"use client";
import { Suspense } from "react";
import Fallback_page from "../../(fallback)/Fallback_page";
import ProductSection from "../../(homePage)/(products section)/productSection";
function SuggestedSection({ type, CurrentPageProductId }) {
  return (
    <div className="w-full">
      <div className=" bg-main w-full py-5 px-2 font-extrabold">
        <p className="text-4xl text-secondary">SUGGESTED</p>
        <Suspense fallback={<Fallback_page />}>
          <ProductSection
            CurrentPageProductId={CurrentPageProductId}
            count={8}
            type={type}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default SuggestedSection;
