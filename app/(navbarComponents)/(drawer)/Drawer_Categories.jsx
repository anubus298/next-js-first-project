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
import { Collapse, ConfigProvider } from "antd";
import Link from "next/link";

function Drawer_Categories() {
  const items = [
    {
      key: "1",
      label: <p className="text-lg font-bold text-white">Categories</p>,
      children: (
        <div className="flex flex-col p-3 text-lg font-semibold text-white rounded-lg bg-secondary gap-y-2">
          <Link
            href="/productsSection/Mobiles"
            className="flex items-center p-2 text-white border-b-2 border-white gap-x-1"
          >
            <FontAwesomeIcon icon={faMobile} />
            <p>Mobiles</p>
          </Link>
          <Link
            href="/productsSection/Tvs"
            className="flex items-center p-2 text-white border-b-2 border-white gap-x-1"
          >
            <FontAwesomeIcon icon={faTv} />
            <p>Tvs</p>
          </Link>
          <Link
            href="/productsSection/Tablets"
            className="flex items-center p-2 text-white border-b-2 border-white gap-x-1"
          >
            <FontAwesomeIcon icon={faTablet} />
            <p>Tablets</p>
          </Link>
          <Link
            href="/productsSection/Laptops"
            className="flex items-center p-2 text-white border-b-2 border-white gap-x-1"
          >
            <FontAwesomeIcon icon={faLaptop} />
            <p>Laptops</p>
          </Link>
          <Link
            href="/productsSection/Accessories"
            className="flex items-center p-2 text-white gap-x-1"
          >
            <FontAwesomeIcon icon={faGlasses} />
            <p>Accessories</p>
          </Link>
        </div>
      ),
    },
  ];
  return (
    <ConfigProvider theme={{ token: { motionDurationMid: 0 } }}>
      <div className="w-full">
        <Collapse
          expandIcon={({ isActive }) => (
            <FontAwesomeIcon
              className="text-white duration-100 ease-out"
              icon={faChevronRight}
              size="2x"
              rotation={isActive ? 90 : 0}
            />
          )}
          expandIconPosition="end"
          ghost
          className="text-white border-2 border-white font-lato"
          items={items}
        />
      </div>
    </ConfigProvider>
  );
}

export default Drawer_Categories;
