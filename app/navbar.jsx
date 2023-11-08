"use client";
import Navbar_categories from "./(navbarComponents)/navbar_categories";
import Navbar_logo from "./(navbarComponents)/navbar_logo";
import Account_logic from "./(navbarComponents)/account_logic";
import Navbar_ship_to_region from "./(navbarComponents)/navbar_ship_to_region";
import SearchBar from "./(navbarComponents)/SearchBar";
import Sticky from "react-stickynode";
import { useEffect, useState } from "react";
function Navbar() {
  const [issmallscreen, setissmallscreen] = useState(
    document.documentElement.clientWidth < 560
  );

  useEffect(() => {
    document.documentElement.clientWidth > 560
      ? setissmallscreen(false)
      : setissmallscreen(true);
  }, []);
  return (
    <Sticky enabled={true} innerZ={999}>
      <div className="bg-main select-none text-secondarySecondarylight w-full justify-between flex sm:gap-x-5 p-2 md:p-5 mb-10 items-center  font-semibold    ">
        {!issmallscreen && (
          <div className="flex items-center gap-x-1">
            <Navbar_logo />
            <Navbar_ship_to_region />
          </div>
        )}
        <div className="flex items-center w-full sm:w-auto justify-end sm:justify-normal sm:gap-x-1">
          <SearchBar />
          <Navbar_categories />
          <Account_logic />
        </div>
      </div>
    </Sticky>
  );
}

export default Navbar;
