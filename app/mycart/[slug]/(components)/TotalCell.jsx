"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
function TotalCell({ deleteItemFromCart, product, quantity }) {
  const [isloading, setisloading] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold text-indigo-950 md:text-lg">
        ${(product.price - product.price * product.sale) * quantity}
      </p>
      <div className="absolute right-4 md:right-0 bottom-1 ">
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            {!isloading ? (
              <FontAwesomeIcon
                className="cursor-pointer hover:text-secondary"
                icon={faTrash}
                size="1x"
              />
            ) : (
              <ColorRing
                width={"20"}
                height={"20"}
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                visible={true}
              />
            )}
          </AlertDialog.Trigger>
          <AlertDialog.Content
            className="select-none"
            style={{ maxWidth: 450 }}
          >
            <AlertDialog.Title className="font-black">
              Deleting item
            </AlertDialog.Title>
            <AlertDialog.Description className="font-semibold" size="2">
              Are you sure you want to delete this item from your cart?
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button
                  className="font-semibold cursor-pointer"
                  variant="soft"
                  color="gray"
                >
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Button
                  variant="solid"
                  className="font-semibold cursor-pointer"
                  color="red"
                  onClick={() => {
                    deleteItemFromCart(product, "-");
                    setisloading(true);
                  }}
                >
                  Delete
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
    </div>
  );
}

export default TotalCell;
