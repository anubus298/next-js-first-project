"use client";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
function Navbar_ship_to_region() {
  const pathname = usePathname(),
    [isCartOpen, setisCartOpen] = useState(false),
    regex = /\/mycart\/*/;
  useEffect(() => {
    pathname.search(regex) != -1 ? setisCartOpen(true) : setisCartOpen(false);
  }, [pathname]);
  return (
    isCartOpen && (
      <div className="flex gap-x-1 items-center">
        <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
        <p>Ship to morocco</p>
      </div>
    )
  );
}

export default Navbar_ship_to_region;
