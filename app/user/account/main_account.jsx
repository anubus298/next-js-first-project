"use client";

import {
  faCreditCard,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function Main_notification() {
  return (
    <div className="w-full bg-secondarySecondarylight md:w-10/12 md:ps-5">
      <div className="flex flex-col items-center justify-center w-full mt-5 gap-y-6 md:mt-0 md:flex-row md:justify-between">
        <div className="w-full py-2 text-center text-white bg-main md:bg-transparent md:text-main md:py-0">
          <p className="pt-2 text-5xl font-semibold md:text-4xl md:text-start md:bg-transparent">
            Account
          </p>
        </div>
      </div>
      <div className="flex h-full  gap-1 gap-y-4 justify-evenly md:justify-normal md:gap-8 py-2 font-semibold md:py-10 flex-wrap">
        <Link
          href={"/user/account/account_information"}
          className="bg-white rounded-lg p-4 flex flex-col justify-center items-center w-5/12 md:w-3/12 h-[120px] gap-2 text-center
        hover:bg-gray-50 transition"
        >
          <FontAwesomeIcon icon={faGear} size="2x" />
          Account information
        </Link>
        <Link
          href={"/user/account/account_information"}
          className="bg-white rounded-lg p-4 flex flex-col justify-center items-center w-5/12 md:w-3/12 h-[120px] gap-2 text-center
        hover:bg-gray-50 transition"
        >
          <FontAwesomeIcon icon={faGear} size="2x" />
          Shipping Preferences
        </Link>
        <Link
          href={"/user/account/account_information"}
          className="bg-white rounded-lg p-4 flex flex-col justify-center items-center w-5/12 md:w-3/12 h-[120px] gap-2 text-center
        hover:bg-gray-50 transition"
        >
          <FontAwesomeIcon icon={faCreditCard} size="2x" />
          Payments methods
        </Link>
      </div>
    </div>
  );
}

export default Main_notification;
