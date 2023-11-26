"use client";
import React, { useState } from "react";
import { Button, ConfigProvider, message, Steps, theme } from "antd";
import Payment_method from "./Payment_method";
import Payment_paypal from "./(methods)/Payment_paypal";
import Payment_manual from "./(methods)/Payment_manual";
import Cart_Review from "./Cart_Review";
import Shipping_Billing from "./Shipping_Billing";
import Order_Confirmation from "./Order_Confirmation";
function Checkout_main({ data, melon }) {
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
      title: "Cart Review",
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
      title: "Shipping & Billing",
      content: (
        <Shipping_Billing
          products={data.products.map((product, index) => {
            return { ...product, count: melon[index] };
          })}
          userInfo={userInfo}
          setCurrent={setCurrent}
          current={current}
          addToShelterOnce={addToShelterOnce}
          setaddToShelterOnce={setaddToShelterOnce}
          setproductProcessingIds={setproductProcessingIds}
        />
      ),
    },
    {
      title: "Payment method",
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
      title: "Order Confirmation",
      content: <Order_Confirmation />,
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#D64550",
        },
        components: {
          Steps: {
            customIconFontSize: 46,
          },
        },
      }}
    >
      <div className="my-16">
        <Steps
          className="font-extrabold select-none"
          current={current}
          items={items}
        />
        <div>{steps[current].content}</div>
      </div>
    </ConfigProvider>
  );
}

export default Checkout_main;
