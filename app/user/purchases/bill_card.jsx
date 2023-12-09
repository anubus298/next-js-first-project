"use client";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faBug, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Link from "next/link";

function Bill_card({item}) {
  const now = new Date(item.updated);
  const prettyDate = now.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    hour12: false,
    day: "numeric",
    hour: "2-digit",
    minute: "numeric",
  });
  return (
    <Card
      actions={[<FontAwesomeIcon icon={faBug} key={156} />]}
      extra={
        <p className="text-gray-400 text-xs text-center w-full">
          <span className="text-main">Payed on: </span>
          {prettyDate}
        </p>
      }
      className=" md:my-0 w-full md:w-[280px] md:shadow-md"
      size="small"
    >
      <Meta
        title={
          <p
            className="text-indigo-950 text-center"
            href={`/product/${item.productInfo.collectionName}/${item.productInfo.id}`}
          >
            {item.id}
          </p>
        }
        description={
          <div className="flex flex-col gap-3">
            <p className="text-xs">
              <span className="text-main">Name:</span> <br />
              {item.costumer_name}
            </p>

            <Link
              href={`/product/${item.productInfo.collectionName?.match(/Pro(.+)/)[1]?.toLowerCase()}/${item.productInfo.id}`}
              className="text-xs"
            >
              <span className="text-main">product Name:</span> <br />
              {item.productInfo.name} x {item.count}
            </Link>
            <p className="text-green-800 font-semibold flex justify-between">
              <span className="text-main">Product cost :</span>$
              {item.total - item.shipping_cost}
            </p>
            <p className="text-green-800 font-semibold flex justify-between">
              <span className="text-main">Shipping & taxes :</span>$
              {item.shipping_cost}
            </p>
            <p className="text-green-800 font-semibold flex justify-between ">
              <span className="text-main">Total :</span>${item.total}
            </p>
            <div className="flex items-center font-semibold justify-between">
              <p className="text-main">Via :</p>
              {item.method == "paypal" ? (
                <FontAwesomeIcon icon={faPaypal} />
              ) : (
                <FontAwesomeIcon icon={faCreditCard} />
              )}
            </div>
          </div>
        }
      />
    </Card>
  );
}

export default Bill_card;
