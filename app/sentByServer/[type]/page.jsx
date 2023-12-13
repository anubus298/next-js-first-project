"use client";
import Image from "next/image";
function main({ params }) {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center bg-secondarySecondarylight select-none">
      <div className="text-sm  p-4 w-full md:w-4/12 text-center rounded-xl flex flex-col items-center justify-center gap-1">
        <Image height={300} width={350} alt="success" src={"/Email.png"} />
        <p className="font-semibold text-xl">
          Please check your email inbox to complete the {params.type.split('_').join(' ')}{" "}
          process. Follow the instructions provided to proceed.
        </p>
      </div>
    </div>
  );
}

export default main;
