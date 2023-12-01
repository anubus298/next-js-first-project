"use client";
import {
  faMobile,
  faTv,
  faLaptop,
  faGlasses,
  faTablet,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SwiperProducts from "./swiper_products";
import Link from "next/link";
import { Suspense } from "react";
function SubProductSection({ showHeader, data, type }) {
  return (
    <div className="bg-main">
      <div className="   border-white w-full flex justify-start  font-extrabold pt-2 px-2 ">
        {showHeader && (
          <div className="bg-main select-none text-secondary flex pt-2 px-2 rounded-t-lg justify-center text-center items-center gap-x-3 text-4xl py-2">
            <p className="">{type.toUpperCase()}</p>
            {type === "laptops" ? (
              <FontAwesomeIcon size="1x" icon={faLaptop} />
            ) : type == "mobiles" ? (
              <FontAwesomeIcon size="1x" icon={faMobile} />
            ) : type == "tvs" ? (
              <FontAwesomeIcon size="1x" icon={faTv} />
            ) : type == "tablets" ? (
              <FontAwesomeIcon size="1x" icon={faTablet} />
            ) : (
              <FontAwesomeIcon size="1x" icon={faGlasses} />
            )}
          </div>
        )}
      </div>
      <div>
        <SwiperProducts type={type} data={data} />
      </div>
      {data?.items[0] && (
        <div className="w-full flex items-center space-x-2  justify-end pt-1 px-4 ">
          <Link
            className="hover:text-white cursor-pointer text-secondary flex items-center space-x-2 "
            href={
              "/productsSection/" +
              type[0].toUpperCase() +
              type.slice(1, type.length)
            }
          >
            <p className=" font-extrabold">SEE MORE</p>
            <FontAwesomeIcon icon={faArrowRight} size="1x" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default SubProductSection;
