"use client";
import { Suspense, useState } from "react";
import "@radix-ui/themes/styles.css";
import BackComp from "../mycart/[slug]/back";
import Command_cart from "./command_cart";
import { useRef } from "react";
import { ConfigProvider, Empty } from "antd";

function Commands_main({ commands }) {
  const card = useRef(null);
  async function deleteCommand(id, reason) {
    const res = await fetch("/api/commands/cancelCommand", {
      method: "PATCH",
      body: JSON.stringify({
        id: id,
        reason: reason,
      }),
    });
    return res.status;
  }

  return (
    <ConfigProvider>
      <BackComp />
      <div className="w-full bg-main flex justify-center p-2 md:rounded-tr-lg select-none">
        <p className="text-secondary font-extrabold text-3xl">Your orders</p>
      </div>
      <div className="w-full p-2 md:p-8 bg-secondarySecondarylight flex-col flex justify-center items-start gap-8 font-semibold ">
        {commands.map((product, index) => {
          return (
            <Command_cart
              deleteCommand={deleteCommand}
              ref={card}
              product={product}
              key={index + index * 2 + index * 33 + 154}
            />
          );
        })}
        {!commands.length && (
          <div className="w-full p-16 select-none ">
            <Empty
              description={
                <p className="font-black text-2xl">You have no commands</p>
              }
            />
          </div>
        )}
      </div>
    </ConfigProvider>
  );
}

export default Commands_main;
