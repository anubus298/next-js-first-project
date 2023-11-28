"use client";
import { faCancel, faPerson, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfigProvider, Steps } from "antd";
import Image from "next/image";
import Link from "next/link";

function Command_cart({ product }) {
  let regex = /(.{4})/g;
  let formattedCode = product.id.replace(regex, "$1-");
  formattedCode = formattedCode.replace(/-$/, "");
  let items = [
    {
      title: "Processing",
      description: "",
    },
    {
      title: "Preparing for Shipment",
      description: "",
    },
    {
      title: "Shipped",
      description: "",
    },
    {
      title: "In Transit",
      description: "",
    },
    {
      title: "Completed",
      description: "",
    },
  ];

  const dateOFship = new Date(product.estimated_delivery_time);
  let dateDescription = "";
  if (product.estimated_delivery_time) {
    dateDescription = (
      <p>
        <span className="font-bold">Estimated shipping time :</span>
        <br />
        {dateOFship.getUTCFullYear() +
          "/" +
          ((dateOFship.getUTCMonth() < 10 ? "0" : "") +
            (dateOFship.getUTCMonth() + 1)) +
          "/" +
          (dateOFship.getUTCDay() < 10 ? "0" : "") +
          dateOFship.getUTCDay() +
          ", " +
          dateOFship.getUTCHours() +
          ":" +
          dateOFship.getUTCMinutes() +
          (dateOFship.getUTCMinutes() < 10 ? "0" : "")}
      </p>
    );
  }
  const descriptions = [
    "Order is being processed.",
    dateDescription,
    "Order has been shipped.",
    "Order is currently in transit.",
    "Order has been successfully completed.",
  ];

  const current = items.findIndex((item, index) => {
    if (item.title == product.status) {
      item.description = (
        <p className="text-sm font-semibold text-gray-700 ">
          {descriptions[index]}
        </p>
      );

      return true;
    }
  });
  if (product.status == "Problem/Error") {
    items = [
      {
        title: "Processing",
        description: "",
      },
      {
        title: "Error happened",
        description: (
          <p>
            View the
            <Link
              className="font-extrabold text-red-800"
              href={"/user/notifications?from=cds&id=" + product.id}
            >
              {" "}
              Note{" "}
            </Link>
            for more information
          </p>
        ),
      },
      {
        title: "Completed",
        description: "",
      },
    ];
  }
  return (
    <div className="flex flex-col md:flex-row gap-1 w-full md:h-[300px}] relative">
      <div className="rounded-t-lg w-full h-4 md:rounded-s-lg md:h-full md:w-4 bg-main"></div>
      <div className="bg-white flex flex-col md:flex-row w-full md:w-9/12 md:p-4 gap-8 ">
        <div className="flex items-center justify-center h-[180px] md:h-auto w-full md:w-4/12">
          <Image
            width={150}
            height={150}
            alt=""
            className="h-auto "
            src={`${process.env.pocketBaseUrl}/api/files/${product.productInfo.collectionId}/${product.productInfo.id}/${product.productInfo.imgs}`}
          />
        </div>
        <div className="flex flex-col w-full p-4 gap-5">
          <div className="flex items-center gap-x-5">
            <p className="text-xl md:text-3xl font-extrabold">
              Order :
              <span className="text-xl md:text-2xl ms-2 text-indigo-950 font-semibold">
                #{formattedCode}
              </span>
            </p>
          </div>
          <div className="flex justify-between ">
            {product.productInfo.expand.brand && (
              <div className="flex flex-col w-[150px] md:w-[180px]">
                <p className="text-gray-500 text-sm">Ordered from :</p>
                <div className="flex items-center gap-x-2">
                  <div className="h-[30px] flex justify-center items-center bg-gray-300 px-[.5px] rounded-lg overflow-hidden">
                    <Image
                      width={30}
                      height={30}
                      alt={`${product.productInfo.expand.brand.brandName} logo`}
                      src={`${process.env.pocketBaseUrl}/api/files/${product.productInfo.expand.brand.collectionId}/${product.productInfo.expand.brand.id}/${product.productInfo.expand.brand.img}`}
                    />
                  </div>
                  <p className="text-main font-semibold">
                    {product.productInfo.expand.brand.brandName}
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-col  w-[150px] md:w-[180px]">
              <p className="text-gray-500 text-sm">Costumer :</p>
              <div className="flex flex-col gap-y-1">
                <div className="flex items-center text-indigo-950 gap-x-2">
                  <FontAwesomeIcon icon={faPerson} size="1x" />
                  <p className=" text-sm text-indigo-950">
                    {product.costumer_name}
                  </p>
                </div>
                <div className="flex items-center text-indigo-950 gap-x-2">
                  <FontAwesomeIcon icon={faPhone} size="1x" />
                  <p className=" text-sm text-indigo-950">
                    {product.costumer_number}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-x-3 justify-between">
            <div className="flex flex-col  w-[150px] md:w-[180px]">
              <p className="text-gray-500 text-sm">Details :</p>
              <div className="flex flex-col gap-y-1">
                <p className=" text-sm">
                  {product.productInfo.name} x {product.count}
                </p>
                <p className="text-sm text-green-500">
                  ${product.total_amount}
                </p>
              </div>
            </div>
            <div className="flex flex-col w-[150px] md:w-[180px]">
              <p className="text-gray-500 text-sm">Shipping address :</p>
              <p className=" text-sm">{product.shipping_address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-2 md:px-4 bg-white md:p-4 w-full md:w-3/12 rounded-b-xl md:rounded-b-none md:rounded-e-xl ">
        
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#22c55e",
            },
          }}
        >
          <Steps
            className="font-extrabold select-none"
            progressDot
            status={
              product.status == "Problem/Error"
                ? "error"
                : product.status == "Completed"
                ? "finish"
                : "process"
            }
            direction={"vertical"}
            current={product.status == "Problem/Error" ? 1 : current}
            items={items}
          />
        </ConfigProvider>
      </div>
      {product.status != "Problem/Error" && current < 3 && (
          <div className="absolute bottom-2 text-xs font-medium right-2 flex items-center gap-1 cursor-pointer">
            <FontAwesomeIcon icon={faCancel} />
            <p>Cancel order</p>
          </div>
        )}
    </div>
  );
}

export default Command_cart;
