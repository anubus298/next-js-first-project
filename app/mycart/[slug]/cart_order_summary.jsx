"use client";

import { useRouter } from "next/navigation";

function Cart_order_summary({ price, count, arrayOfproductCounts }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-full px-8 pt-6 pb-1 text-white select-none bg-main h-fit md:px-2 gap-y-5">
      <p className="text-lg font-bold">Order Summary</p>
      <p className="self-end text-3xl">${price}</p>
      <div className="w-full ">
        <div
          className="w-full p-2 font-extrabold text-center bg-white cursor-pointer text-main md:p-3"
          onClick={() =>
            router.push(`/checkout/sqd?melon=${arrayOfproductCounts.join(",")}`)
          }
        >
          Checkout now ({count})
        </div>
        <p className="text-xs text-gray-400">
          All pricing are excluding VAT and shipment
        </p>
      </div>
    </div>
  );
}

export default Cart_order_summary;
