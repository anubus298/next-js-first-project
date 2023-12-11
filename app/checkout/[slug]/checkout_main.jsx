"use client";
import { useState, useEffect } from "react";
import { ConfigProvider, Steps } from "antd";
import Payment_method from "./Payment_method";
import { AnimatePresence } from "framer-motion";

import PocketBase from "pocketbase";
import Payment_paypal from "./(methods)/Payment_paypal";
import Payment_manual from "./(methods)/Payment_manual";
import Cart_Review from "./Cart_Review";
import Shipping_Billing from "./Shipping_Billing";
import Order_Confirmation from "./Order_Confirmation";
function Checkout_main({ data, melon, addresses }) {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  try {
    pb.authStore.loadFromCookie(getCookie("pb_auth"));
  } catch {}
  const [width, setwidth] = useState(1000);
  const [username, setusername] = useState(undefined);
  const [method, setmethod] = useState(false);
  const [current, setCurrent] = useState(0);
  const [userInfo, setuserInfo] = useState({
    first_name: undefined,
    last_name: undefined,
    address: undefined,
    code_postal: undefined,
    country: undefined,
    phone: undefined,
    town_city: undefined,
  });
  const [productProcessingIds, setproductProcessingIds] = useState(undefined);
  const [addToShelterOnce, setaddToShelterOnce] = useState(true);
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
  const steps = [
    {
      title: "Review",
      content: (
        <Cart_Review
          data={data}
          username={pb.authStore?.model?.username}
          addresses={addresses}
          melon={melon}
          userInfo={userInfo}
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
  useEffect(() => {
    setusername(pb.authStore.model.username);
    setuserInfo({
      first_name: username?.split("_")[0],
      last_name: username?.split("_")[1],
      address: undefined,
      code_postal: undefined,
      country: undefined,
      phone: undefined,
      town_city: undefined,
    });
    setwidth(document.documentElement.clientWidth);
  }, []);
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
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
        <AnimatePresence>{steps[current].content}</AnimatePresence>
      </div>
    </ConfigProvider>
  );
}

export default Checkout_main;
