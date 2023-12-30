"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { useEffect } from "react";
import { message, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Rate } from "antd";
import { NotificationCount } from "../../(navbarComponents)/cartIcon";
import { useAtom } from "jotai";
function Card_favorite({
  product,
  setpriceSummary,
  priceSummary,
  deleteItemFromCart,
}) {
  const [notifCount, setnotifCount] = useAtom(NotificationCount);
  const [quantity, setquantity] = useState(1);
  const [sign, setsign] = useState(1);
  const [domloaded, setdomloaded] = useState(false);
  const regex = /(Pro)(\S)/;
  const [messageApi, contextHolder] = message.useMessage();
  const type = product.collectionName.replace(regex, (str, p1, p2) => {
    return p2.toLowerCase();
  });
  const router = useRouter();
  useEffect(() => {
    setpriceSummary(priceSummary + sign * parseFloat(product.price).toFixed(2));
    return () => {
      setpriceSummary(
        priceSummary - quantity * parseFloat(product.price).toFixed(2)
      );
    };
  }, [quantity]);
  async function handleAddToCartFromFavorite(collectionName, id) {
    let res = await addToCartFromFavorite(collectionName, id);
    let d = await deleteItemFromCart(product, "-");
    if (res.status == 200) {
      localStorage.setItem("NotificationCount", Number(notifCount + 1));
      setnotifCount(notifCount + 1);
      messageApi.success("Added successfully to the cart");
    }
  }
  async function addToCartFromFavorite(collectionName, id) {
    const reg = /(Pro)(\w*)/;
    const collectionNameRe = collectionName.replace(reg, (str, p1, p2) => {
      return p1.toLowerCase() + "duct_" + p2.toLowerCase() + "+";
    });
    let requestBody = {};
    requestBody[collectionNameRe] = id;
    const res = await fetch("/api/products/UpdateCart?", {
      cache: "no-cache",
      method: "PATCH",
      "Content-Type": "application/json",
      body: JSON.stringify(requestBody),
    });
    return res;
  }
  const [width, setwidth] = useState(1280);
  useEffect(() => {
    setwidth(document.documentElement.clientWidth);
    setdomloaded(true);
  }, []);
  return (
    <>
      {contextHolder}
      {!domloaded && (
        <Skeleton>
          <div className="w-full">
            <div className="bg-white m-1 md:m-0 flex w-full justify-between md:justify-normal md:flex-row relative flex-col items-center space-x-5 md:w-auto min-h-[200px] md:min-h-fit md:h-[120px] overflow-y-auto overflow-x-hidden shadow-lg sm:overflow-hidden p-3 md:p-6 rounded-lg">
              <div className="flex items-center w-full gap-x-2 md:w-9/12 md:gap-x-5">
                <Skeleton.Image />
                <div className="flex flex-col justify-between gap-y-2 md:text-start">
                  <Link
                    className="text-lg font-medium"
                    href={"/product" + "/" + type + "/" + product.id}
                  >
                    {product.name}
                  </Link>
                  <div className="flex items-center gap-x-1">
                    <p className="text-xs text-gray-500">loremloremlorem</p>
                  </div>
                  <p>lorelorem</p>
                </div>
              </div>
              <div className="flex flex-row justify-between w-full h-full px-3 md:flex-col md:w-3/12">
                <div className="flex items-center md:justify-end">
                  <p>loremloremlorem</p>

                  <button>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      )}
      {domloaded && (
        <div className="w-full">
          <div className="bg-white m-1 md:m-0 flex w-full justify-between md:justify-normal md:flex-row relative flex-col items-center space-x-5 md:w-auto min-h-[200px] md:min-h-fit md:h-[120px] overflow-y-auto overflow-x-hidden shadow-lg sm:overflow-hidden p-3 md:p-6 rounded-lg">
            <div className="flex items-center w-full gap-x-2 md:w-9/12 md:gap-x-5">
              <Image
                src={`${process.env.pocketBaseUrl}api/files/${product.collectionId}/${product.id}/${product.imgs}`}
                alt=""
                height={width > 768 ? 90 : 65}
                width={width > 768 ? 90 : 65}
                s
                className="w-auto cursor-pointer"
                onClick={() =>
                  router.push("/product" + "/" + type + "/" + product.id)
                }
              />
              <div className="flex flex-col justify-between gap-y-2 md:text-start">
                <Link
                  className="text-lg font-medium"
                  href={"/product" + "/" + type + "/" + product.id}
                >
                  {product.name}
                </Link>
                <div className="flex items-center gap-x-1">
                  <Rate
                    className="text-xs"
                    defaultValue={product.rating}
                    allowHalf
                    disabled
                  />
                  <p className="text-xs text-gray-500">
                    ({product.totalRated})
                  </p>
                </div>
                <Link
                  href={"/product" + "/" + type + "/" + product.id}
                  className="text-xl font-semibold text-indigo-950 w-fit"
                >
                  $
                  {parseFloat(product.price).toFixed(2) -
                    parseFloat(product.price).toFixed(2) * product.sale}
                </Link>
              </div>
            </div>
            <div className="flex flex-row justify-between w-full h-full px-3 md:flex-col md:w-3/12">
              <div className="flex items-center md:justify-end">
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
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <button className="bg-secondaryGreen rounded-md px-4 h-[35px]  md:py-2 w-1/2 md:w-full text-center text-textWhiteWithSecondary self-end place-self-end font-medium">
                    Add to Cart
                  </button>
                </AlertDialog.Trigger>
                <AlertDialog.Content
                  className="select-none"
                  style={{ maxWidth: 450 }}
                >
                  <AlertDialog.Title>Adding item to the cart</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    Are you sure you want to add this item to your cart?
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
                        color="green"
                        onClick={() =>
                          handleAddToCartFromFavorite(
                            product.collectionName,
                            product.id
                          )
                        }
                      >
                        Add
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card_favorite;
