"use client";
import Navbar_categories from "./(navbarComponents)/navbar_categories";
import Navbar_logo from "./(navbarComponents)/navbar_logo";
import Account_logic from "./(navbarComponents)/account_logic";
import Navbar_ship_to_region from "./(navbarComponents)/navbar_ship_to_region";
import SearchBar from "./(navbarComponents)/SearchBar";
import Sticky from "react-stickynode";
import { Suspense, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Drawer_main from "./(navbarComponents)/(drawer)/Drawer_main";
import User_skeleton from "./(navbarComponents)/User_skeleton";
import Navbar_banner from "./(navbarComponents)/banner";
import { usePathname } from "next/navigation";
function NavbarJS({notiff}) {
  const path = usePathname()
  const [issmallscreen, setissmallscreen] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setshow] = useState(true);
  useEffect(() => {
    setOpen(false)
  }, [path]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    document.documentElement.clientWidth > 560
      ? setissmallscreen(false)
      : setissmallscreen(true);
  }, []);
  return (
    <Sticky enabled={true} innerZ={999}>
      <Suspense fallback={<div className="w-full h-9 bg-secondaryLight"></div>}>
      <Navbar_banner show={show} setshow={setshow} />
      </Suspense>
      <div className="flex items-center justify-between w-full p-2 mb-2 font-semibold select-none bg-main text-secondarySecondarylight sm:gap-x-5 md:p-5 ">
        <div className="flex items-center gap-x-1">
          <Navbar_logo height={200} width={200}/>
          <Navbar_ship_to_region />
        </div>
        <div className="flex items-center justify-end w-full sm:w-auto sm:justify-normal sm:gap-x-1">
          {!issmallscreen && (
            <Suspense fallback={<User_skeleton />}>
              <SearchBar />
              <Navbar_categories />
              <Account_logic notiff={notiff} />
            </Suspense>
          )}
          {issmallscreen && (
            <button type="primary" onClick={showDrawer}>
              <FontAwesomeIcon size="2x" icon={faBars} />
            </button>
          )}
        </div>
      </div>
      {issmallscreen && <Drawer_main setOpen={setOpen} open={open} onClose={onClose} />}
    </Sticky>
  );
}

export default NavbarJS;
