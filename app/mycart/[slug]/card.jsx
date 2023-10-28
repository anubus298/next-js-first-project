"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  DropdownMenu,
  Table,
  AlertDialog,
  Button,
  Flex,
} from "@radix-ui/themes";
import Counter from "./counter";
import { useState } from "react";
import { useEffect } from "react";
function Card({
  products,
  product,
  setpriceSummary,
  priceSummary,
  originalData,
  deleteItemFromCart,
}) {
  const [quantity, setquantity] = useState(1);
  const [sign, setsign] = useState(1);
  useEffect(() => {
    setpriceSummary(priceSummary + sign * product.price);
  }, [quantity]);
  return (
    <Table.Row align={"center"} className="relative">
      <Table.RowHeaderCell>
        <div className="flex md:flex-row flex-col items-center space-x-5 h-[120px] overflow-auto">
          <Image
            src={`http://127.0.0.1:8090/api/files/${product.collectionId}/${product.id}/${product.imgs[0]}`}
            alt=""
            height={50}
            width={50}
            className=""
          />
          <p>{product.name}</p>
        </div>
      </Table.RowHeaderCell>

      <Table.Cell justify={"center"}>
        <p>${product.price}</p>
      </Table.Cell>

      <Table.Cell>
        <Counter
          quantity={quantity}
          setquantity={setquantity}
          priceSummary={priceSummary}
          setpriceSummary={setpriceSummary}
          setsign={setsign}
          sign={sign}
        />
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-col items-center">
          <p className="font-bold text-lg">${product.price * quantity}</p>
          <div className="absolute bottom-1 right-0 ">
            <AlertDialog.Root >
              <AlertDialog.Trigger>
                <FontAwesomeIcon className="cursor-pointer hover:text-secondary" icon={faTrash} size="1x"/>
              </AlertDialog.Trigger>
              <AlertDialog.Content className="select-none" style={{ maxWidth: 450 }}>
                <AlertDialog.Title>Deleting item</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Are you sure you want to delete this item from your cart?
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button variant="solid" color="red" onClick={()=>deleteItemFromCart(product,originalData)}>
                     Delete
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </div>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export default Card;
