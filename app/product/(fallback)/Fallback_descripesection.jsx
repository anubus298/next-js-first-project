"use client";
import { Skeleton } from "antd";
function Fallback_descripesection() {
  return (
    <div className="md:w-1/2 flex flex-col gap-y-10">
      <div>
        <Skeleton>
          <h2 className="text-2xl sm:text-3xl font-semibold">name</h2>
        </Skeleton>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between gap-x-5 items-center">
          <Skeleton>
            <p className="text-secondary text-4xl font-bold select-none">
              price
              <span className=" text-xs font-normal">(including VAT)</span>
            </p>
          </Skeleton>
          <div className="flex items-end gap-x-2 select-none">
            <Skeleton>
              <p>rating</p>
              <p className="inline text-sm text-gray-400">total</p>
            </Skeleton>
          </div>
        </div>
      </div>
      <div>
        <Skeleton>
          <h4 className="text-lg font-semibold mb-5">Product Details :</h4>
          <p>description</p>
          <p>description</p>
          <p>description</p>
          <p>description</p>
        </Skeleton>
      </div>
    </div>
  );
}

export default Fallback_descripesection;
