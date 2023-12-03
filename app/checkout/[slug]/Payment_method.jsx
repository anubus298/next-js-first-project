"use client";

import { Button } from "antd";
import Image from "next/image";
import { motion } from "framer-motion";

function Payment_method({ setmethod, setCurrent, current }) {
  return (
    <motion.div animate={{ opacity: [0, 0.5, 1] }}>
      <div className="w-full h-[450px] flex  select-none justify-between items-center bg-secondarySecondarylight p-4 font-semibold mt-5">
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <Image alt="moneeey" width={450} height={450} src={"/Finance.png"} />
        </div>
        <div className="flex flex-col items-center gap-8 w-full md:w-1/3">
          <p className="text-center text-2xl md:text-3xl font-black">
            Select your <span className=" text-secondaryYellow">Payment</span>{" "}
            method
          </p>
          <form className="w-[200px] flex flex-col gap-y-3">
            <Button
              onClick={() => {
                setmethod("manual");
                setTimeout(() => setCurrent(current + 1), 1000);
              }}
              className=" py-2 px-5 w-full border-main border-2 rounded-none  font-extrabold bg-white h-16 text-lg hover:text-main"
            >
              ADD NEW CART
            </Button>
            <p className="text-lg font-semibold w-full text-center">OR</p>
            <Button
              onClick={() => {
                setmethod("paypal");
                setTimeout(() => setCurrent(current + 1), 1000);
              }}
              className="  flex  justify-center items-center  py-2 px-5 w-full border-main border-2 rounded-none  font-extrabold bg-secondaryYellow h-16 text-lg"
            >
              <Image
                alt="paypal"
                src={"/paymethods/paypal-logo-checkout.png"}
                width={110}
                height={110}
              />
            </Button>
            <p className="italic text-green-800 text-sm text-center font-semibold">
              Secure via SSL certificate
            </p>
          </form>
        </div>
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <Image
            alt="moneeey"
            width={320}
            height={320}
            src={"/Securelock.png"}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Payment_method;
