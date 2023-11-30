"use client";
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

// Create styles

import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Table } from "antd";
import { useEffect, useState } from "react";

function Shipping_Billing({
  userInfo,
  products,
  setCurrent,
  current,
  setproductProcessingIds,
  productProcessingIds,
  addToShelterOnce,
  setaddToShelterOnce,
  username,
}) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  const [fetchedBillInformtion, setfetchedBillInformtion] = useState(undefined);
  const [total, settotal] = useState(0);
  const [isloading, setisloading] = useState(true);
  const columns = [
    {
      title: "Product",
      dataIndex: "Product",
      key: "Product",
    },
    {
      title: "Per one",
      dataIndex: "PerOne",
      key: "PerOne",
    },
    {
      title: "Count",
      dataIndex: "Count",
      key: "Count",
    },
    {
      title: "shipping bill",
      dataIndex: "shippingBill",
      key: "shippingbill",
    },
    {
      title: "Taxes bill",
      dataIndex: "TaxesBill",
      key: "Taxesbill",
    },
    {
      title: "Total",
      dataIndex: "Total",
      key: "Total",
    },
  ];
  useEffect(() => {
    const data = {
      ...userInfo,
      products: products.map((item) => {
        return {
          id: item.id,
          collectionName: item.collectionName,
          count: item.count,
        };
      }),
    };
    async function CallToken(datac) {
      const res = await fetch(`/api/payments/token`, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(datac),
      });
      const data = await res.json();
      setfetchedBillInformtion(data.result);
      setproductProcessingIds(
        data.result
          .map((item) => {
            return item.processingId;
          })
          .filter((item) => {
            return item != undefined;
          })
      );
    }
    if (isloading && addToShelterOnce) {
      CallToken(data);
      setisloading(false);
      setaddToShelterOnce(false);
    }
  }, []);
  const now = new Date();
  const prettyDate = now.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    hour12: false,
    day: "numeric",
    hour: "2-digit",
    minute: "numeric",
  });
  return (
    <>
      <div className="w-full gap-y-4 gap-x-6 min-h-[450px] flex flex-col md:flex-row justify-center items-center bg-secondarySecondarylight p-4 mt-5 font-semibold">
        <div className="w-full md:w-1/3 mx-auto bg-white rounded-md shadow-md flex flex-col p-4">
          <div className="flex justify-center gap-x-2 items-center py-2 text-sm border-b-2 cursor-pointer hover:bg-gray-100 transition">
            <FontAwesomeIcon icon={faNoteSticky} />
            <p>Download pdf</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="">
              <Avatar shape="square" size="large" className="bg-green-500">
                {username}
              </Avatar>
            </div>
            <p className="text-xs text-gray-600">Issued in : {prettyDate}</p>
          </div>
          <div>
            <div className="text-main text-end">
              {productProcessingIds &&
                productProcessingIds.map((id, index) => {
                  return (
                    <p key={id} className="text-xs text-gray-600">
                      Bill {index} No : {id}
                    </p>
                  );
                })}

              <p className="text-lg font-extrabold">
                {userInfo.first_name} {userInfo.last_name}
              </p>
              <p className="text-sm text-gray-600">{userInfo.phone}</p>
              <p className="text-sm text-gray-600">
                {userInfo.address}, {userInfo.code_postal}, {userInfo.town_city}
              </p>
              <p className="text-sm text-gray-600">{userInfo.country}</p>
              <p className=" font-extrabold">To</p>
              <p className="text-lg font-extrabold">SafoMart</p>
            </div>
          </div>
          <div className="w-full border-y-2 py-2 flex justify-between">
            <p className="text-gray-600">Amount</p>
            <p className="text-gray-600">${total}</p>
          </div>
        </div>
        <Table
          className="w-2/3 h-full"
          columns={columns}
          pagination={{ hideOnSinglePage: true }}
          loading={!fetchedBillInformtion}
          summary={(data) => {
            let totalSummary = 0;

            data.forEach(({ Total, TaxesBill, shippingBill }) => {
              totalSummary += parseInt(Total.substring(1), 10);
            });
            settotal(totalSummary)
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}></Table.Summary.Cell>
                  <Table.Summary.Cell index={1}></Table.Summary.Cell>
                  <Table.Summary.Cell index={2}></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}></Table.Summary.Cell>
                  <Table.Summary.Cell index={4}></Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    <p className="font-extrabold text-lg text-green-500">
                      ${totalSummary}
                    </p>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
          dataSource={
            fetchedBillInformtion &&
            fetchedBillInformtion.map((item, index) => {
              return {
                key: index,
                Product: products[index].name,
                PerOne: "$" + item.products.perOne,
                Count: item.products.count,
                Total: "$" + item.products.totalAmount,
                shippingBill: "$" + item.products.shipping,
                TaxesBill: "$" + item.products.taxes,
              };
            })
          }
        />
      </div>
      <div className="w-full justify-center bg-secondarySecondarylight pb-4">
        <div className="text-center">
          <button
            type="button"
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:border-indigo-300"
            onClick={() => setCurrent(current + 1)}
          >
            Make Payment
          </button>
        </div>
      </div>
    </>
  );
}

export default Shipping_Billing;
