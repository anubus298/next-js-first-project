"use client";
import Image from "next/image";
import { Table } from "@radix-ui/themes";
import Counter from "./counter";
import TotalCell from "./(components)/TotalCell";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
function Card({ product, setpriceSummary, priceSummary, deleteItemFromCart }) {
  const [quantity, setquantity] = useState(1);
  const [eachCount, seteachCount] = useState(0);
  const [sign, setsign] = useState(1);
  const regex = /(Pro)(\S)/;
  const type = product.collectionName.replace(regex, (str, p1, p2) => {
    return p2.toLowerCase();
  });
  const router = useRouter();
  useEffect(() => {
    if (eachCount != 0) {
      setpriceSummary(priceSummary + sign * product.price);
    }
    seteachCount(eachCount + 1);
    return () => {
      setpriceSummary(priceSummary - quantity * product.price);
    };
  }, [quantity]);
  return (
    <Table.Row align={"center"} className="relative">
      <Table.RowHeaderCell>
        <div className="flex md:flex-row flex-col items-center space-x-5 h-[120px] overflow-auto sm:overflow-hidden">
          <div className="h-full flex items-center">
            <Image
              src={`http://127.0.0.1:8090/api/files/${product.collectionId}/${product.id}/${product.imgs[0]}`}
              alt=""
              height={70}
              width={50}
              className="w-auto h-auto cursor-pointer"
              onClick={() =>
                router.push("/product" + "/" + type + "/" + product.id)
              }
            />
          </div>
          <a
            className="text-lg font-bold"
            href={"/product" + "/" + type + "/" + product.id}
          >
            {product.name}
          </a>
        </div>
      </Table.RowHeaderCell>

      <Table.Cell justify={"center"}>
        <p className="text-lg ">${product.price}</p>
      </Table.Cell>

      <Table.Cell justify={"center"}>
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
        <TotalCell
          product={product}
          deleteItemFromCart={deleteItemFromCart}
          quantity={quantity}
        />
      </Table.Cell>
    </Table.Row>
  );
}

export default Card;
