"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Card_favorite({
  product,
  setpriceSummary,
  priceSummary,
  deleteItemFromCart,
}) {
  const [quantity, setquantity] = useState(1);
  const [sign, setsign] = useState(1);
  const regex = /(Pro)(\S)/;
  const type = product.collectionName.replace(regex, (str, p1, p2) => {
    return p2.toLowerCase();
  });
  const router = useRouter();
  useEffect(() => {
    setpriceSummary(priceSummary + sign * product.price);
    return () => {
      setpriceSummary(priceSummary - quantity * product.price);
    };
  }, [quantity]);
  return (
    <Table.Row align={"center"} className="relative">
      <Table.RowHeaderCell>
        <div className="flex md:flex-row flex-col items-center space-x-5 h-[120px] overflow-auto sm:overflow-hidden">
          <Image
            src={`http://127.0.0.1:8090/api/files/${product.collectionId}/${product.id}/${product.imgs[0]}`}
            alt=""
            height={90}
            width={90}
            className="w-auto cursor-pointer"
            onClick={() =>
              router.push("/product" + "/" + type + "/" + product.id)
            }
          />
          <div className="flex flex-col justify-center">
            <Link
              className="text-lg"
              href={"/product" + "/" + type + "/" + product.id}
            >
              {product.name}
            </Link>
            <p className="text-secondary text-lg">${product.price}</p>
          </div>
          <div className="absolute bottom-1 right-0 ">
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <FontAwesomeIcon
              className="cursor-pointer hover:text-secondary"
              icon={faTrash}
              size="1x"
            />
          </AlertDialog.Trigger>
          <AlertDialog.Content
            className="select-none"
            style={{ maxWidth: 450 }}
          >
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
                <Button
                  variant="solid"
                  color="red"
                  onClick={() => deleteItemFromCart(product, "-")}
                >
                  Delete
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </div>
        </div>
      </Table.RowHeaderCell>
    </Table.Row>
  );
}

export default Card_favorite;
