"use client";
import { Suspense } from "react";
import BackComp from "../mycart/[slug]/back";
import Command_cart from "./command_cart";
import { useRef } from "react";
function Commands_main({ commands }) {
  const card = useRef(null);
  return (
    <>
      <BackComp />
      <div className="w-full p-2 md:p-8 bg-secondarySecondarylight flex-col flex justify-center items-start gap-8 font-semibold overflow-x-scroll ">
        {commands.map((product, index) => {
          return (
            <Command_cart
              ref={card}
              product={product}
              key={index + index * 2 + index * 33 + 154}
            />
          );
        })}
      </div>
    </>
  );
}

export default Commands_main;
