"use client";
import Navbar_categories from "./navbar_categories";
import Navbar_logo from "./navbar_logo";
import Account_logic from "./account_logic";
import Navbar_ship_to_region from "./navbar_ship_to_region";
import SearchBar from "./SearchBar";
import Sticky from "react-stickynode";
import { Suspense, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Drawer_main from "./(drawer)/Drawer_main";
import User_skeleton from "./User_skeleton";
import Navbar_banner from "./banner";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import userColorAtom from "../(lib)/jotai/userColor";
function NavbarJS({ notiff }) {
  const path = usePathname();
  const [issmallscreen, setissmallscreen] = useState(false);
  const [open, setOpen] = useState(false);
  const [show, setshow] = useState(true);
  const [color, setcolor] = useAtom(userColorAtom);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setcolor(notiff.color);
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
          <Navbar_logo height={200} width={200} />
          <Navbar_ship_to_region />
          {!issmallscreen && <Navbar_categories />}
        </div>
        <div className="flex items-center justify-end w-full sm:w-auto sm:justify-normal sm:gap-x-1">
          {!issmallscreen && <SearchBar />}

          {!issmallscreen && (
            <Suspense fallback={<User_skeleton />}>
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
      {issmallscreen && (
        <Drawer_main setOpen={setOpen} open={open} onClose={onClose} />
      )}
    </Sticky>
  );
}

export default NavbarJS;
