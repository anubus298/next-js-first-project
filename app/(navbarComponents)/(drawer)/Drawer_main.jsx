"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "antd";
import Drawer_logIn from "./drawer_logIn";
import Drawer_Categories from "./Drawer_Categories";
import Drawer_support from "./Drawer_support";
import Drawer_Cart_Favorite from "./Drawer_Cart_Favorite";
import SearchBar from "../SearchBar";
import Navbar_logo from "../navbar_logo";

function Drawer_main({ open, onClose }) {
  return (
    <Drawer
      closeIcon={
        <FontAwesomeIcon icon={faXmark} className="text-white " size="3x" />
      }
      placement="right"
      onClose={onClose}
      open={open}
      className="bg-main text-secondary select-none"
    >
      <div className="w-full gap-y-6 flex flex-col font-lato min-h-[600px] px-1 py-2">
        <div className="flex justify-center items-center flex-col mb-8">
          <Navbar_logo width={100} height={40} />
          <p className="text-secondary text-xs font-medium">
            {" "}
            embrace the extraordinary
          </p>
        </div>
        <SearchBar className="mx-8" />
        <Drawer_logIn />
        <Drawer_Cart_Favorite />
        <Drawer_Categories />
        <Drawer_support />
      </div>
    </Drawer>
  );
}

export default Drawer_main;
