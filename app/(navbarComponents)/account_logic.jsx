"use client";
import { useAtom } from "jotai";
import { isValidAtom } from "./navbar_user_icon";
import PocketBase from "pocketbase";
import Navbar_log_in from "./navbar_log_in";
import Navbar_user_icon from "./navbar_user_icon";
import Navbar_sign_in from "./navbar_sign_in";
import User_skeleton from "./User_skeleton"
import { useEffect, useState } from "react";
function Account_logic() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const [domLoaded, setDomLoaded] = useState(false);
  const [isValid, setIsvalid] = useAtom(isValidAtom);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <div>
      {domLoaded ?
        (isValid ? (
          <Navbar_user_icon />
        ) : (
          <div className="flex sm:flex-row flex-col-reverse gap-y-2 items-center">
            <Navbar_log_in />
            <Navbar_sign_in />
          </div>
        )) : <User_skeleton/>}
    </div>
  );
}

export default Account_logic;
