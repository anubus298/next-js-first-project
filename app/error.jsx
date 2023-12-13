"use client"
import Image from "next/image";

function Error() {
  return (
    <div className="h-[60vh] w-full flex justify-center items-center flex-col">
      <Image
        alt="error-illustration"
        height={400}
        width={400}
        src={"/Code.png"}
      />
      <p>Error accured!</p>
    </div>
  );
}

export default Error;
