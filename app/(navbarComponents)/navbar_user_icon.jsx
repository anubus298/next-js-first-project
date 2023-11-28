"use client";
import { Menu, Transition } from "@headlessui/react";
import {
  faUser,
  faSignOut,
  faGear,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { CartIcon } from "./cartIcon";
import FavoriteIcon from "./FavoriteIcon";
import PocketBase from "pocketbase";

import { useContext } from "react";
import { AuthContext } from "../(lib)/context-provider";
import Link from "next/link";
import { Avatar } from "antd";

function Navbar_user_icon() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  pb.authStore.loadFromCookie(getCookie("pb_auth"));
  const { isValid, setisValid } = useContext(AuthContext);

  function deleteCookie(name) {
    setCookie(name, "", {
      "max-age": -1,
    });
  }
  function getCookie(name) {
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  function setCookie(name, value, options = {}) {
    options = {
      path: "/",
      ...options,
      secure: true,
      expires: new Date(Date.now() + 86400e3).toUTCString(),
    };

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }
  const router = useRouter();
  return (
    <div className="flex">
      <FavoriteIcon />
      <CartIcon />
      <Menu className="relative" as={"menu"}>
        <Menu.Button className="hover:text-secondary transition m-2 flex items-center gap-x-2">
          <Avatar size="small" className="bg-green-500">
            {pb.authStore.model?.username[0].toUpperCase()}
          </Avatar>
          <p className="max-w-[90px] md:max-w-[120px] overflow-hidden">
            {pb.authStore.model?.username}
          </p>
        </Menu.Button>
        <Transition
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-y-75"
          enterTo="transform opacity-100 scale-y-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-y-100"
          leaveTo="transform opacity-0 scale-y-75"
        >
          <Menu.Items className="bg-secondary flex flex-col rounded-lg gap-y-4 p-4 right-4 w-[150px] absolute z-50 ">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={
                    " p-1 justify-between flex items-center gap-x-1 cursor-pointer transition ease-out  " +
                    ` transition p-1 rounded-lg `
                  }
                >
                  <Link
                    href="/account-settings"
                    className=" flex items-center space-x-2"
                  >
                    <FontAwesomeIcon icon={faGear} />
                    <p>Account</p>
                  </Link>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={
                    " p-1  flex items-center gap-x-2 cursor-pointer transition ease-out " +
                    ` transition p-1 rounded-lg`
                  }
                  onClick={() => {
                    router.push("/commands");
                  }}
                >
                  <FontAwesomeIcon icon={faBox} />
                  <p>Commands</p>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={
                    " p-1  flex items-center gap-x-2 cursor-pointer transition ease-out " +
                    ` transition p-1 rounded-lg`
                  }
                  onClick={() => {
                    pb.authStore.clear();
                    router.push("/");
                    deleteCookie("pb_auth");
                    setisValid(false);
                  }}
                >
                  <FontAwesomeIcon icon={faSignOut} />
                  <p>Logout</p>
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Navbar_user_icon;
