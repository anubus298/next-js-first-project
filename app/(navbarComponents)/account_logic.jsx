"use client";
import Navbar_log_in from "./navbar_log_in";
import Navbar_user_icon from "./navbar_user_icon";
import Navbar_sign_in from "./navbar_sign_in";
import User_skeleton from "./User_skeleton";
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { useAtom } from "jotai";
import { isValidUserAtom } from "../functions/atomCookie";
import { getCookie } from "../functions/cookiesFunctions";
function Account_logic() {
  const [isValidUser, setisValidUser] = useAtom(isValidUserAtom);
  const [domloaded, setdomloaded] = useState(false);
  const pb = new PocketBase("http://127.0.0.1:8090");
  useEffect(() => {
    pb.authStore.loadFromCookie(getCookie("pb_auth"));
    if (pb.authStore.isValid) {
      setisValidUser(true);
    } else {
      setisValidUser(false);
    }
    setdomloaded(true);
  }, []);
  return (
    <div>
      {!domloaded && <User_skeleton />}
      {domloaded &&
        (isValidUser ? (
          <Navbar_user_icon />
        ) : (
          <div className="flex sm:flex-row flex-col-reverse md:gap-y-2 items-center">
            <Navbar_log_in />
            <Navbar_sign_in />
          </div>
        ))}
    </div>
  );
}

export default Account_logic;
