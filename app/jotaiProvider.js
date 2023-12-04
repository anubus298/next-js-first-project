"use client";

import { Provider } from "jotai";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function JotaiProviders({ children }) {
  return (
    <Provider>
      <PayPalScriptProvider
        options={{
          clientId: "NEXT_PUBLIC_ANALYTICS_ID",
          currency: "USD",
          intent: "capture",
        }}
      >
        {children}
      </PayPalScriptProvider>
    </Provider>
  );
}
