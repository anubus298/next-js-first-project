"use client";

import { Provider } from "jotai";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function JotaiProviders({ children }) {
  return (
    <Provider>
      <PayPalScriptProvider
        options={{
          clientId: "AaJ2_DwoI1MgsqNP40sDQPXZVhtXH_hRBOzH5uBQJ9TFM1gsZdWpiOStqt-m_S-0I96BThf786OYz3EZ",
          currency: "USD",
          intent: "capture",
        }}
      >
        {children}
      </PayPalScriptProvider>
    </Provider>
  );
}
