"use client";
import { useState, useEffect } from "react";
import { ConfigProvider, Steps } from "antd";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Payment_method from "./Payment_method";
import PocketBase from "pocketbase";
import Payment_paypal from "./(methods)/Payment_paypal";
import Payment_manual from "./(methods)/Payment_manual";
import Cart_Review from "./Cart_Review";
import Shipping_Billing from "./Shipping_Billing";
import Order_Confirmation from "./Order_Confirmation";
function Checkout_main({ data, melon }) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const [width, setwidth] = useState(1000);
  useEffect(() => {
    function getCookie(name) {
      let matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    pb.authStore.loadFromCookie(getCookie("pb_auth"));
    setwidth(document.documentElement.clientWidth);
  }, []);
  const [method, setmethod] = useState(false);
  const [current, setCurrent] = useState(0);
  const [userInfo, setuserInfo] = useState({
    address: undefined,
    code_postal: undefined,
    country: undefined,
    first_name: undefined,
    last_name: undefined,
    phone: undefined,
    town_city: undefined,
  });
  const [productProcessingIds, setproductProcessingIds] = useState(undefined);
  const [addToShelterOnce, setaddToShelterOnce] = useState(true);
  const steps = [
    {
      title: "Review",
      content: (
        <Cart_Review
          data={data}
          melon={melon}
          setuserInfo={setuserInfo}
          setCurrent={setCurrent}
          current={current}
        />
      ),
    },
    {
      title: "Billing",
      content: (
        <Shipping_Billing
          products={data.products.map((product, index) => {
            return { ...product, count: melon[index] };
          })}
          username={pb.authStore?.model?.username}
          userInfo={userInfo}
          setCurrent={setCurrent}
          productProcessingIds={productProcessingIds}
          current={current}
          addToShelterOnce={addToShelterOnce}
          setaddToShelterOnce={setaddToShelterOnce}
          setproductProcessingIds={setproductProcessingIds}
        />
      ),
    },
    {
      title: "method",
      content: (
        <Payment_method
          setmethod={setmethod}
          setCurrent={setCurrent}
          current={current}
        />
      ),
    },
    {
      title: "Payment",
      content:
        method &&
        (method == "manual" ? (
          <Payment_manual
            productProcessingIds={productProcessingIds}
            setCurrent={setCurrent}
            current={current}
          />
        ) : (
          <Payment_paypal
            productProcessingIds={productProcessingIds}
            setCurrent={setCurrent}
            current={current}
          />
        )),
    },
    {
      title: "Confirmation",
      content: <Order_Confirmation />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
      }}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#55D186",
          },
          components: {
            Steps: {
              customIconFontSize: 46,
            },
          },
        }}
      >
        <div className="my-16 w-full md:w-auto">
          <Steps
            type={width > 500 ? "default" : "inline"}
            className="font-extrabold select-none w-full md:w-auto justify-between text-main"
            current={current}
            items={items}
          />
          <div>{steps[current].content}</div>
        </div>
        <div className="text-main">
          <button onClick={() => setCurrent(current + 1)}> NEXT </button>
          <button onClick={() => setCurrent(current - 1)}> Pervious </button>
        </div>
      </ConfigProvider>
    </PayPalScriptProvider>
  );
}

export default Checkout_main;
