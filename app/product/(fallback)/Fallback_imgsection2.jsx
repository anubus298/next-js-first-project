"use client";
import { Skeleton } from "antd";
function Fallback_imgsection2() {
  const number = [1, 2, 3, 4, 5, 6];
  return (
    <div className="md:w-[80px] md:h-[500px] gap-[1px] sm:gap-2 w-full flex overflow-x-auto md:overflow-x-hidden md:items-center md:py-5 md:overflow-y-auto flex-row md:flex-col">
      {number.map((i, index) => {
        return (
          <div
            className="bg-white p-1 overflow-hidden  w-[50px] h-[50px] flex justify-center items-center "
            key={index * 2 +index * 3 + index * 4 + index}
          >
            <Skeleton.Image active={true} />
          </div>
        );
      })}
    </div>
  );
}

export default Fallback_imgsection2;
