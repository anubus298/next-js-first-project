"use client";
import BackComp from "./back";
import Favorite_product_section from "./Favorite_product_section";
import { useState } from "react";
function CartUI({ products, count, fullStartingPrice, id }) {
  const [priceSummary, setpriceSummary] = useState(fullStartingPrice);
  return (
    <>
      <div className="w-full bg-secondarySecondarylight py-4 md:py-8 md:px-8 flex md:flex-row flex-col ">
        <div className="w-full h-[75vh] overflow-y-auto">
          <Favorite_product_section
            id={id}
            products={products}
            count={count}
            priceSummary={priceSummary}
            setpriceSummary={setpriceSummary}
          />
        </div>
      </div>
    </>
  );
}

export default CartUI;
