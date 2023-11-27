"use client";

import { Table } from "antd";
import { useEffect, useState } from "react";

function Shipping_Billing({
  userInfo,
  products,
  setCurrent,
  current,
  setproductProcessingIds,
  addToShelterOnce,
  setaddToShelterOnce,
}) {
  const [fetchedBillInformtion, setfetchedBillInformtion] = useState(undefined);
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
      setisloading(false)
      setaddToShelterOnce(false)
    }
  }, []);
  return (
    <div className="w-full gap-y-4  min-h-[450px] flex flex-col md:flex-row justify-evenly items-center bg-secondarySecondarylight p-4 mt-5">
      <div className="w-full md:w-auto mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-extrabold mb-4">Payment Summary</h2>

        <div className=" md:w-auto bg-gray-200 text-lg w-full p-1 md:p-4 rounded-md mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-extrabold">First Name:</span>
            <span>{userInfo.first_name}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-extrabold">Last Name:</span>
            <span>{userInfo.last_name}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-extrabold">Phone:</span>
            <span>{userInfo.phone}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-extrabold">Address:</span>
            <span>{userInfo.address}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-extrabold">Postal Code:</span>
            <span>{userInfo.code_postal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-extrabold">Country:</span>
            <span>{userInfo.country}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="font-extrabold">Town/City:</span>
            <span>{userInfo.town_city}</span>
          </div>
          <div className="flex justify-between mt-4 overflow-auto">
            <Table
              columns={columns}
              pagination={{ hideOnSinglePage: true }}
              loading={!fetchedBillInformtion}
              summary={(data) => {
                let totalSummary = 0;

                data.forEach(({ Total, TaxesBill, shippingBill }) => {
                  totalSummary += parseInt(Total.substring(1), 10);
                });
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}></Table.Summary.Cell>
                      <Table.Summary.Cell index={1}></Table.Summary.Cell>
                      <Table.Summary.Cell index={2}></Table.Summary.Cell>
                      <Table.Summary.Cell index={3}></Table.Summary.Cell>
                      <Table.Summary.Cell index={4}>
                        <p className="font-extrabold text-lg text-green-500">
                          Total :
                        </p>
                      </Table.Summary.Cell>
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
        </div>

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
    </div>
  );
}

export default Shipping_Billing;
