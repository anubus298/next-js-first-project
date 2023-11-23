"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "antd";
import Link from "next/link";

function Drawer_Support() {
  const items = [
    {
      key: "1",
      label: <p className="text-white font-bold text-lg">Support</p>,
      children: (
        <div className="bg-secondary text-white flex flex-col gap-y-2 p-3 rounded-lg text-lg font-semibold">
          <Link
            href="/productsSection/Mobiles"
            className="flex items-center gap-x-1 p-2 border-b-2 border-white text-white"
          >
            <p>Who we are</p>
          </Link>
          <Link
            href="/productsSection/Tvs"
            className="flex items-center gap-x-1 p-2 border-b-2 border-white text-white"
          >
            <p>Work with us</p>
          </Link>
          <Link
            href="/productsSection/Tablets"
            className="flex items-center gap-x-1 p-2 border-b-2 border-white text-white"
          >
            <p>Feedback</p>
          </Link>
          <Link
            href="/productsSection/Laptops"
            className="flex items-center gap-x-1 p-2  text-white"
          >
            <p>Product Support</p>
          </Link>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Collapse
        expandIcon={({ isActive }) => (
          <FontAwesomeIcon
            className="text-white ease-out duration-100"
            icon={faChevronRight}
            size="2x"
            rotation={isActive ? 90 : 0}
          />
        )}
        expandIconPosition="end"
        ghost
        className="border-2 border-white text-white font-lato"
        items={items}
      />
    </div>
  );
}

export default Drawer_Support;
