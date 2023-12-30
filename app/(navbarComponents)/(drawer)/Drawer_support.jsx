"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "antd";
import Link from "next/link";

function Drawer_Support() {
  const items = [
    {
      key: "1",
      label: <p className="text-lg font-bold text-white">Support</p>,
      children: (
        <div className="flex flex-col p-3 text-lg font-semibold text-white rounded-lg bg-secondary gap-y-2">
          <Link
            href="/info/aboutUs"
            className="flex items-center p-2 text-white border-b-2 border-white gap-x-1"
          >
            <p>About The Dev</p>
          </Link>
          <Link
            href="/info/refundPolicy"
            className="flex items-center p-2 text-white border-b-2 border-white gap-x-1"
          >
            <p>Refund Policy</p>
          </Link>
          <Link
            href="/info/contact"
            className="flex items-center p-2 text-white border-b-2 border-white gap-x-1"
          >
            <p>Contact</p>
          </Link>

          <Link
            href="/info/feedbacks"
            className="flex items-center p-2 text-white border-b-2 border-white gap-x-1"
          >
            <p>Feedback</p>
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
  );
}

export default Drawer_Support;
