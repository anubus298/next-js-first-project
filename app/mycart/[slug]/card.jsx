"use client";
import Image from "next/image";
import { Table } from "@radix-ui/themes";
import StarComp from "../../(homePage)/(products section)/StarComp";

import Counter from "./counter";
import TotalCell from "./(components)/TotalCell";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Card({
  product,
  deleteItemFromCart,
  arrayOfproductCounts,
  setarrayOfproductCounts,
  i,
}) {
  const regex = /(Pro)(\S)/;
  const type = product.collectionName.replace(regex, (str, p1, p2) => {
    return p2.toLowerCase();
  });
  const router = useRouter();
  return (
    <Table.Row align={"center"} className="relative">
      <Table.RowHeaderCell>
        <div className="flex md:flex-row flex-col items-center space-x-5 h-[120px] overflow-auto sm:overflow-hidden">
          <div className=" flex items-center p-1 bg-white">
            <Image
              src={`${process.env.pocketBaseUrl}api/files/${product.collectionId}/${product.id}/${product.imgs}`}
              alt=""
              height={70}
              width={80}
              className="w-auto h-auto cursor-pointer"
              onClick={() =>
                router.push("/product" + "/" + type + "/" + product.id)
              }
            />
          </div>
          <div className="flex flex-col items-start justify-between">
            <Link
              className="text-lg font-semibold"
              href={"/product" + "/" + type + "/" + product.id}
            >
              {product.name}
            </Link>
            <div className="flex items-center">
              <StarComp
                className="fill-secondaryYellow"
                count={product.rating}
                size={10}
                readonly={true}
              />
              <p className="block md:inline text-xs text-gray-400">
                ({product.totalRated})
              </p>
            </div>
          </div>
        </div>
      </Table.RowHeaderCell>

      <Table.Cell justify={"center"}>
        <p className="text-lg ">${product.price}</p>
      </Table.Cell>

      <Table.Cell justify={"center"}>
        <Counter
          arrayOfproductCounts={arrayOfproductCounts}
          i={i}
          setarrayOfproductCounts={setarrayOfproductCounts}
        />
      </Table.Cell>
      <Table.Cell>
        <TotalCell
          product={product}
          deleteItemFromCart={deleteItemFromCart}
          quantity={arrayOfproductCounts[i]}
        />
      </Table.Cell>
    </Table.Row>
  );
}

export default Card;
