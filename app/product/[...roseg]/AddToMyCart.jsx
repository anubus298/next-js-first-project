"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { NotificationCount } from "../../(navbarComponents)/cartIcon";

import { ColorRing } from "react-loader-spinner";
import { ConfigProvider } from "antd";
import { useAtom } from "jotai";
import addToCart from "../../functions/addToCart";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import {  useState } from "react";
import { message } from "antd";
function AddToMyCart({ collectionName, id, already }) {
  const [isloading, setisloading] = useState(false);
  const [isAddedFromTheButton, setIsAddedfromThebutton] = useState(false);
  const router = useRouter();
  const [notifCount, setnotifCount] = useAtom(NotificationCount);
  const [messageApi, contextHolder] = message.useMessage();
  async function handleADD(collectionName, id) {
    setisloading(true);
    let res = await addToCart(collectionName, id);
    setisloading(false);
    if (res.status == 401) {
      messageApi.info("You must login first ,redirecting to login page ...");
      setTimeout(() => {
        router.push("/logIn/QCqsf8q9");
      }, 5000);
    }
    if (res.status == 200) {
      localStorage.setItem("NotificationCount", Number(notifCount + 1));
      setnotifCount(notifCount + 1);
      messageApi.success("Added successfully to the cart");
      setIsAddedfromThebutton(true);
    }
    if (res.status == 400) {
      messageApi.error("Error accrued");
    }
  }
  return (
    <ConfigProvider
      theme={{
        token: {},
      }}
    >
      {contextHolder}
      <Theme>
        <AlertDialog.Root>
          <AlertDialog.Trigger style={{ width: "100%" }}>
            <button
              disabled={already || isAddedFromTheButton}
              onClick={() => window.scrollTo(30, 0)}
              className="bg-main cursor-pointer min-w-[200px] md:min-w-[400px] text-white enabled:hover:bg-gray-900 flex justify-center items-center  transition rounded-lg md:rounded-none font-bold p-2 sm:w-[450px] h-full disabled:text-gray-400 disabled:cursor-default font-lato"
            >
              {!(already || isAddedFromTheButton) && !isloading && (
                <p>ADD TO CART</p>
              )}
              {(already || isAddedFromTheButton) && <p>Added</p>}
              <ColorRing
                visible={isloading}
                height="25"
                width="25"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </button>
          </AlertDialog.Trigger>
          <AlertDialog.Content
            className="z-50 select-none"
            style={{ maxWidth: 450 }}
          >
            <AlertDialog.Title>Adding item</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Are you sure you want to Add this item to your cart?
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button
                  variant="solid"
                  color="red"
                  onClick={() => {
                    handleADD(collectionName, id);
                  }}
                >
                  Add
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Theme>
    </ConfigProvider>
  );
}

export default AddToMyCart;
