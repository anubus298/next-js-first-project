"use client";

import { Button } from "antd";
import Image from "next/image";

function Payment_method({ setmethod, setCurrent, current }) {
  return (
    <div className="w-full h-[450px] flex justify-center items-center bg-secondarySecondarylight p-4 font-semibold mt-5">
      <form className="w-[200px] flex flex-col gap-y-3">
        <Button
          onClick={() => {
            setmethod("manual");
            setCurrent(current + 1);
          }}
          className="rounded-3xl py-2 px-5 w-full bg-secondary text-white h-16 text-lg"
        >
          ADD NEW CART
        </Button>
        <Button
          onClick={() => {
            setmethod("paypal");
            setCurrent(current + 1);
          }}
          className="rounded-3xl py-2 px-5 w-full bg-secondary text-white flex h-16 justify-center items-center"
        >
          <Image
            alt="paypal"
            src={"/paymethods/paypal-logo-checkout.png"}
            width={70}
            height={70}
          />
        </Button>
      </form>
    </div>
  );
}

export default Payment_method;
