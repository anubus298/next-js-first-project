"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import paypalCreateOrder from "../../../(lib)/paypal/functions/paypalCreateOrder";
import paypalCaptureOrder from "../../../(lib)/paypal/functions/paypalCaptureOrder";
import { useState } from "react";
import { useRef } from "react";
function Payment_paypal({ current, setCurrent ,data}) {
  const SSdm = useRef(undefined);
  const [isError, setisError] = useState(false);
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <div className="w-full min-h-[450px] flex flex-col justify-center items-center bg-secondarySecondarylight p-4 font-semibold mt-5">
        <PayPalButtons
          style={{
            color: "gold",
            shape: "rect",
            label: "pay",
          }}
          createOrder={async () => {
            let order = await paypalCreateOrder(data,setisError);
            SSdm.current = order;
            return order;
          }}
          onApprove={async () => {
            let res = await paypalCaptureOrder(SSdm.current, setisError);
            res.success && setCurrent(current + 1);
          }}
          onError={() => {
            setisError(true);
          }}
        />
        {isError && <p className="text-4xl text-red-600">Error happened</p>}
      </div>
    </PayPalScriptProvider>
  );
}

export default Payment_paypal;
