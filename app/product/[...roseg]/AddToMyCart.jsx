"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { NotificationCount } from "../../(navbarComponents)/cartIcon";

import { ColorRing } from "react-loader-spinner";

import { useAtom } from "jotai";
import addToCart from "../../functions/addToCart";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
function AddToMyCart({ collectionName, id }) {
  const [isloading, setisloading] = useState(false);
  const router = useRouter();
  const [notifCount, setnotifCount] = useAtom(NotificationCount);
  async function handleADD(collectionName, id) {
    setisloading(true);

    let res = await addToCart(collectionName, id);
    setisloading(false);

    if (res.status == 401) {
      router.push("/logIn/QCqsf8q9");
    }
    if (res.status == 200) {
      localStorage.setItem("NotificationCount", Number(notifCount + 1));
      setnotifCount(notifCount + 1);
    }
    if (res.status == 400) {
    }
  }
  return (
    <Theme>
      <AlertDialog.Root >
        <AlertDialog.Trigger style={{width : "100%"}}>
          <button className="bg-main  text-white hover:bg-gray-900 flex justify-center items-center  transition rounded-lg md:rounded-s-none font-bold p-2 sm:w-[450px] h-full">
            {!isloading && <p>ADD TO CART</p>}
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
        <AlertDialog.Content className="select-none" style={{ maxWidth: 450 }}>
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
  );
}

export default AddToMyCart;
