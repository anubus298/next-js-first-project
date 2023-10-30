"use client";
import Image from "next/image";
import { Table } from "@radix-ui/themes";
import Counter from "./counter";
import TotalCell from "./(components)/TotalCell";
import { useState } from "react";
import { useEffect } from "react";
function Card({ product, setpriceSummary, priceSummary, deleteItemFromCart }) {
  const [quantity, setquantity] = useState(1);
  const [sign, setsign] = useState(1);
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
            height={50}
            width={50}
            className=" w-auto"
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
