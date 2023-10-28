"use client";
import BackComp from "./back";
import Cart_order_summary from "./cart_order_summary";
import Cart_product_section from "./cart_product_section";
import Cart_payment_methods from "./cart_payment_methods";
import { useState } from "react";
function CartUI({ originalData, products, count, fullStartingPrice ,id}) {
  const [priceSummary, setpriceSummary] = useState(fullStartingPrice);
  return (
    <>
      <BackComp />
      <div className="w-full bg-secondarySecondarylight md:px-8 flex md:flex-row flex-col ">
        <div className="md:w-9/12 max-h-[600px] overflow-y-auto">
          <Cart_product_section
            originalData={originalData}
            id={id}
            products={products}
            count={count}
            priceSummary={priceSummary}
            setpriceSummary={setpriceSummary}
          />
        </div>
        <div className="flex  gap-y-5 flex-col justify-between w-full md:w-3/12">
          {count && <Cart_order_summary price={priceSummary} count={count} />}
          <Cart_payment_methods />
        </div>
      </div>
    </>
  );
}

export default CartUI;
