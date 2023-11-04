"use client";
import Navbar_categories from "./(navbarComponents)/navbar_categories";
import Navbar_logo from "./(navbarComponents)/navbar_logo";
import Account_logic from "./(navbarComponents)/account_logic";
import Navbar_ship_to_region from "./(navbarComponents)/navbar_ship_to_region";
import Sticky from "react-stickynode";
function Navbar() {
  return (
    <Sticky enabled={true} innerZ={999}>
      <div className="bg-main  select-none text-secondarySecondarylight w-full justify-between flex gap-x-5 p-2 md:p-5 mb-10 items-center  font-semibold    ">
        <div className="flex items-center gap-x-1">
          <Navbar_logo />
          <Navbar_ship_to_region />
        </div>
        <div className="flex items-center gap-x-1">
          <Navbar_categories />
          <Account_logic />
        </div>
      </div>
    </Sticky>
  );
}

export default Navbar;
