"use client";
import { Suspense } from "react";
import Fallback_cart_order_summary from "./(fallback)/Fallback_cart_order_summary";
function Cart_order_summary({ price, count }) {
  return (
    <Suspense fallback={<Fallback_cart_order_summary/>}>
      <div className="bg-main h-fit w-full pt-6 pb-1 px-8 md:px-2 text-white flex flex-col items-center gap-y-5 select-none">
        <p className="text-lg font-bold">Order Summary</p>
        <p className="text-3xl self-end">${price}</p>
        <div className="w-full ">
          <button className="bg-white text-main p-2 font-extrabold w-full">
            Checkout now ({count})
          </button>
          <p className="text-xs text-gray-400">All pricing are including VAT</p>
        </div>
      </div>
    </Suspense>
  );
}

export default Cart_order_summary;
