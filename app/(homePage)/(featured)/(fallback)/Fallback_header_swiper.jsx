"use client";
import { Skeleton } from "antd";
function Fallback_header_swiper() {
  return (
    <div className=" h-[290px] w-[200px] md:h-[400px] md:w-[300px] bg-white ">
      <div className="flex justify-center items-center  h-5/6 w-full">
        <Skeleton.Image active={true} />
      </div>
      <div className="h-[0.5px] w-full bg-main"></div>
      <div className=" text-secondarySecondarylight rounded-b-lg w-full h-1/6 overflow-hidden">
        <Skeleton active={true} loading={true} className="h-full">
          <p className=" text-sm sm:text-lg ">Product name</p>
          <p className="text-sm">price</p>
        </Skeleton>
      </div>
    </div>
  );
}

export default Fallback_header_swiper;
