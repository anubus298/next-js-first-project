"use client";
import Image from "next/image";
function Error() {
  return (
    <>

      <div className="w-full h-screen sm:h-[400px] flex justify-center items-center bg-secondarySecondarylight select-none p-5">
        <Image
          src="/empty_cart.png"
          height={100}
          width={100}
          alt="empty cart icon"
        />
        <p className="text-4xl  font-extrabold">Error happened</p>
      </div>
    </>
  );
}

export default Error;
