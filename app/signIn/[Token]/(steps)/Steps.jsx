"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, message, Steps, theme } from "antd";
import Step1 from "../(loginComponents)/Step1"
function StepsConf() {
  const steps = [
    {
      title: "First",
      content: <Step1/>,
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {};
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <div className="w-full flex flex-col gap-y-4">
      <Steps current={current} items={items} />
      <div className="bg-secondarySecondarylight p-6 flex justify-center items-center w-full">
      {steps[current].content}
      </div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
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
        {current > 0 && <Button onClick={() => prev()}>Previous</Button>}
      </div>
    </div>
  );
}

export default StepsConf;
