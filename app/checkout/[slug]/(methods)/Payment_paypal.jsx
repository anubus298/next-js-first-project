"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import paypalCreateOrder from "../../../(lib)/paypal/functions/paypalCreateOrder";
import paypalCaptureOrder from "../../../(lib)/paypal/functions/paypalCaptureOrder";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Image from "next/image";
function Payment_paypal({
  current,
  setCurrent,
  productProcessingIds,
  settrackingIds,
}) {
  const [width, setwidth] = useState(1000);
  useEffect(() => {
    setwidth(document.documentElement.clientWidth);
  }, []);
  const SSdm = useRef(undefined);
  const [isError, setisError] = useState(false);
  return (
    
      <div className="w-full min-h-[450px] flex gap-8 justify-center items-center bg-secondarySecondarylight p-4 font-semibold mt-5 select-none">
        <div className="flex flex-col items-center gap-8">
          <p className="text-3xl text-center md:text-start font-black ">
            Complete your payment with PayPal
          </p>

          <PayPalButtons
            style={{
              color: "gold",
              shape: "rect",
              label: "paypal",
            }}
            createOrder={async () => {
              let order = await paypalCreateOrder(
                productProcessingIds,
                setisError
              );
              SSdm.current = order;
              return order;
            }}
            onApprove={async (data, action) => {
              let order = await paypalCaptureOrder(
                productProcessingIds,
                data.orderID,
                setisError
              );
              if (!isError) {
                setCurrent(current + 1);
              }
            }}
            onError={() => {
              setisError(true);
            }}
          />
          <p className="text-sm text-center text-green-800 italic">
            Your financial information is encrypted <br />
            ensuring a safe and reliable payment process.
          </p>
          {isError && (
            <p className=" text-red-600 font-extrabold text-center">
              Failed to purchase
              <br />
              <span className="text-xs font-medium">
                if this message keep appearing please contact the support
              </span>
            </p>
          )}
        </div>
        {width > 825 && (
          <Image
            alt="phone check"
            width={450}
            height={450}
            src="/Payment.png"
          />
        )}
      </div>
  );
}

export default Payment_paypal;
