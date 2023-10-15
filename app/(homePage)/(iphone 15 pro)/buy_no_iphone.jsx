"use client";

import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

function Iphone_15_Buy_now_icon() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/Buy/Iphone-15-pro")}
      className=" text-white my-2 px-5 text-2xl rounded-lg font-extrabold flex items-center gap-x-2 font-bolder transition hover:text-secondary "
    >
      <p>BUY NOW</p>
      <FontAwesomeIcon icon={faAngleRight} />
    </button>
  );
}

export default Iphone_15_Buy_now_icon;
