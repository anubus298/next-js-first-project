"use client";
import Alert from "antd/es/alert/Alert";
import AlertMessage from "./AlertMessage";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { NotificationCount } from "../../(navbarComponents)/cartIcon";

import { ColorRing } from "react-loader-spinner";
import { ConfigProvider } from "antd";
import { useAtom } from "jotai";
import addToCart from "../../functions/addToCart";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function AddToMyCart({ collectionName, id, already }) {
  const [isloading, setisloading] = useState(false);
  const [isAddedFromTheButton, setIsAddedfromThebutton] = useState(false);
  const router = useRouter();
  const [notifCount, setnotifCount] = useAtom(NotificationCount);
  const [alertmessage, setalertmessagetype] = useState([
    false,
    "success",
    "Done",
  ]);
  async function handleADD(collectionName, id) {
    setisloading(true);
    let res = await addToCart(collectionName, id);
    setisloading(false);
    if (res.status == 401) {
      setalertmessagetype([
        true,
        "info",
        "You will be redirected to the login page...",
      ]);
      setTimeout(() => {
        router.push("/logIn/QCqsf8q9");
      }, 5000);
    }
    if (res.status == 200) {
      localStorage.setItem("NotificationCount", Number(notifCount + 1));
      setnotifCount(notifCount + 1);
      setalertmessagetype([true, "success", "Done"]);
      setIsAddedfromThebutton(true);
    }
    if (res.status == 400) {
      setalertmessagetype([true, "error", "Error"]);
    }
  }
  useEffect(() => {
    if (alertmessage[0]) {
      setTimeout(() => {
        setalertmessagetype([false, "success", "Done"]);
      }, 7000);
    }
  }, [alertmessage]);
  return (
    <ConfigProvider
      theme={{
        token: { colorSuccess: "#d9535d", colorSuccessBorder: "#000000" },
      }}
    >
      {alertmessage[0] && (
        <Alert
          closable={true}
          showIcon={true}
          description={<AlertMessage Message type={alertmessage[1]} />}
          message={alertmessage[2]}
          type={alertmessage[1]}
          className="fixed w-[450px] bottom-1 left-2 z-[99]"
        />
      )}

      <Theme>
        <AlertDialog.Root>
          <AlertDialog.Trigger style={{ width: "100%" }}>
            <button
              disabled={already || isAddedFromTheButton}
              onClick={()=>window.scrollTo(30,0)}
              className="bg-main min-w-[400px] text-white enabled:hover:bg-gray-900 flex justify-center items-center  transition rounded-lg md:rounded-s-none font-bold p-2 sm:w-[450px] h-full disabled:text-gray-400 disabled:cursor-default "
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
            className="select-none z-50"
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
