"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import paypalCreateOrder from "../../../(lib)/paypal/functions/paypalCreateOrder";
import paypalCaptureOrder from "../../../(lib)/paypal/functions/paypalCaptureOrder";
function StepOne_paypal() {
  return (
    <div className="w-full h-[450px] flex justify-center items-center bg-secondarySecondarylight p-4 font-semibold mt-5">
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
          currency: "USD",
          intent: "capture",
        }}
      >
        <PayPalButtons
          style={{
            color: "gold",
            shape: "rect",
            label: "pay",
            height: 50,
          }}
          createOrder={async (data, actions) => {
            let order_id = await paypalCreateOrder();
            return order_id + "";
          }}
          onApprove={async (data, actions) => {
            let response = await paypalCaptureOrder(data.orderID);
            if (response) return true;
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default StepOne_paypal;
