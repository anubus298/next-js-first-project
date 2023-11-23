"use client";
import React, { useState } from "react";
import { Button, ConfigProvider, message, Steps, theme } from "antd";
import StepOne from "./StepOne";
import StepOne_paypal from "./(methods)/StepOne_paypal";
import StepOne_manual from "./(methods)/StepOne_manual";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
function Checkout_main({ data }) {
  const [method, setmethod] = useState(false);
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: "Payment methods",
      content: <StepOne setmethod={setmethod} setCurrent={setCurrent} current={current}/>,
    },
    {
      title: "Payment methods",
      content:
        method &&
        (method == "manual" ? <StepOne_manual /> : <StepOne_paypal />),
    },
    {
      title: "Verification",
      content: <StepTwo data={data} />,
    },
    {
      title: "Last",
      content: <StepThree />,
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
        <Steps current={current} items={items} />
        <div>{steps[current].content}</div>
        <div>
          {current < steps.length - 1 && (
            <Button className="bg-main" type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Checkout_main;
