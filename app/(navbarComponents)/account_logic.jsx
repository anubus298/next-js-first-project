"use client";
import Navbar_log_in from "./navbar_log_in";
import Navbar_user_icon from "./navbar_user_icon";
import Navbar_sign_in from "./navbar_sign_in";
import User_skeleton from "./User_skeleton";
import { useContext, useEffect, useState } from "react";
import PocketBase from "pocketbase";

import { AuthContext } from "../(lib)/context-provider";
function Account_logic() {
  const { isValid, setisValid } = useContext(AuthContext);

  const [domloaded, setdomloaded] = useState(false);
  const pb = new PocketBase("http://127.0.0.1:8090");
  useEffect(() => {
    setdomloaded(true);
  }, []);
  return (
    <div>
      {domloaded ? (
        isValid ? (
          <Navbar_user_icon />
        ) : (
          <div className="flex sm:flex-row flex-col-reverse md:gap-y-2 items-center">
            <Navbar_log_in />
            <Navbar_sign_in />
          </div>
        )
      ) : (
        <User_skeleton />
      )}
    </div>
  );
}

export default Account_logic;
