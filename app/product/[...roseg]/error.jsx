"use client";
import BackComp from "../back";
import Image from "next/image";
function Error() {
  return (
    <>
      <BackComp />
    
    <div className="w-full h-screen sm:h-[400px] flex justify-center items-center bg-secondarySecondarylight select-none p-5">
      <Image
        src="/empty_cart.png"
        height={100}
        width={100}
        alt="empty cart icon"
      />
      <p className="text-4xl  font-extrabold">Unable to find the product</p>
    </div>
    </>
  );
}

export default Error;
