"use client";
import {
  faChevronRight,
  faGlasses,
  faLaptop,
  faMobile,
  faTablet,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "antd";
import Link from "next/link";

function Drawer_Categories() {
  const items = [
    {
      key: "1",
      label: <p className="text-white font-bold text-lg">Categories</p>,
      children: (
        <div className="bg-secondary text-white flex flex-col gap-y-2 p-3 rounded-lg text-lg font-semibold">
          <Link
            href="/productsSection/Mobiles"
            className="flex items-center gap-x-1 p-2 border-b-2 border-white text-white"
          >
            <FontAwesomeIcon icon={faMobile} />
            <p>Mobiles</p>
          </Link>
          <Link
            href="/productsSection/Tvs"
            className="flex items-center gap-x-1 p-2 border-b-2 border-white text-white"
          >
            <FontAwesomeIcon icon={faTv} />
            <p>Tvs</p>
          </Link>
          <Link
            href="/productsSection/Tablets"
            className="flex items-center gap-x-1 p-2 border-b-2 border-white text-white"
          >
            <FontAwesomeIcon icon={faTablet} />
            <p>Tablets</p>
          </Link>
          <Link
            href="/productsSection/Laptops"
            className="flex items-center gap-x-1 p-2 border-b-2 border-white text-white"
          >
            <FontAwesomeIcon icon={faLaptop} />
            <p>Laptops</p>
          </Link>
          <Link
            href="/productsSection/Accessories"
            className="flex items-center gap-x-1 p-2 text-white"
          >
            <FontAwesomeIcon icon={faGlasses} />
            <p>Accessories</p>
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

export default Drawer_Categories;
