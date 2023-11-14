"use client";
import { Skeleton } from "antd";
function Fallback_cart_order_summary() {
  return (
    <div className=" h-fit w-full pt-6 pb-1 px-8 md:px-2 text-white flex flex-col items-center gap-y-5 select-none">
      <Skeleton active={true} loading={true}>
        <h1 className="text-lg font-bold">Order Summary</h1>
        <h6 className="text-3xl self-end">price</h6>
      </Skeleton>
      <div className="w-full ">
        <Skeleton.Button
          className="w-full"
          shape="square"
          active={true}
          size="default"
        ></Skeleton.Button>
      </div>
    </div>
  );
}

export default Fallback_cart_order_summary;
