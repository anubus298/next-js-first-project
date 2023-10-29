"use client";
import {deleteCookie, setCookie} from "../functions/cookiesFunctions"
const pb = new PocketBase("http://127.0.0.1:8090");
export const isValidAtom = atom(pb.authStore.isValid);
import { atom, useAtom } from "jotai";
import PocketBase from "pocketbase";
import { Menu } from "@headlessui/react";
import {
  faUser,
  faCartShopping,
  faSignOut,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import CartIcon from "./cartIcon";
function Navbar_user_icon() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const [isValid, setIsvalid] = useAtom(isValidAtom);
  const router = useRouter();
  return (
    <div className="flex relative">
      <CartIcon />
      <Menu>
        <Menu.Button className="hover:text-secondary transition m-2 flex items-center gap-x-2">
          <FontAwesomeIcon icon={faUser} />
          <p>{pb.authStore.model?.username}</p>{" "}
        </Menu.Button>
        <Menu.Items className="bg-secondary flex flex-col rounded-lg gap-y-4 p-4 absolute top-full z-50 ">
          <Menu.Item>
            {({ active }) => (
              <div
                className={
                  " px-1 justify-between flex items-center gap-x-1 cursor-pointer transition ease-out" +
                  `${active && "bg-main"}`
                }
              >
                <FontAwesomeIcon icon={faGear} />

                <a href="/account-settings">settings</a>
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                className={
                  " px-1 justify-between flex items-center gap-x-1 cursor-pointer transition ease-out " +
                  `${active && "bg-main"}`
                }
                onClick={() => {
                  pb.authStore.clear();
                  router.push("/");
                  deleteCookie("pb_auth");
                  setIsvalid(false);
          
                }}
              >
                <FontAwesomeIcon icon={faSignOut} />

                <p>Sign out</p>
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default Navbar_user_icon;
