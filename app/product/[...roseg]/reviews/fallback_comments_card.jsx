"use client";

import { Skeleton } from "antd";

function Fallback_comments_card() {
  return (
    <Skeleton active>
      <div className="flex w-full p-2 py-6 bg-white shadow-sm md:p-4 rounded-xl">
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="font-medium md:text-base"></p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row">
              <p className="text-xs text-gray-400 md:text-sm"></p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-center md:text-sm"></p>
              </div>
            </div>
          </div>
          <p className="text-xs leading-5 md:text-sm">comment</p>
        </div>
      </div>
    </Skeleton>
  );
}

export default Fallback_comments_card;
