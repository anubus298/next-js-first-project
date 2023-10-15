"use client";
import { useAtom } from "jotai";
import { isValidAtom } from "./navbar_user_icon";
import PocketBase from "pocketbase";
import Navbar_log_in from "./navbar_log_in";
import Navbar_user_icon from "./navbar_user_icon";
import Navbar_sign_in from "./navbar_sign_in";
import { useEffect, useState } from "react";
function Account_logic() {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const [isValid, setIsvalid] = useAtom(isValidAtom);
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <div>
      {domLoaded &&
        (isValid ? (
          <Navbar_user_icon />
        ) : (
          <div className="flex items-center">
            <Navbar_log_in />
            <Navbar_sign_in />
          </div>
        ))}
    </div>
  );
}

export default Account_logic;
