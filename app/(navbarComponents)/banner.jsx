"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { AuthContext } from "../(lib)/context-provider";

function Navbar_banner() {
  const { showbanner, setshowbanner } = useContext(AuthContext);
  return (
    showbanner && (
      <div className="w-full h-9 py-2 text-main bg-secondaryLight flex text-center items-center justify-center text-xs md:text-sm font-lato font-semibold gap-x-2">
        <p>
          🎁 Unwrap Joyful Savings! Shop Now for Exclusive Deals and
          Limited-Time Offers. Your Holiday Shopping Starts Here! 🛍️
        </p>
        <FontAwesomeIcon icon={faXmark} onClick={()=>setshowbanner(false)} size="2x" className="cursor-pointer"/>
      </div>
    )
  );
}

export default Navbar_banner;
