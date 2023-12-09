"use client";
import Navbar_log_in from "./navbar_log_in";
import Navbar_user_icon from "./navbar_user_icon";
import Navbar_sign_in from "./navbar_sign_in";
import User_skeleton from "./User_skeleton";
import { useContext, useEffect, useState } from "react";
import PocketBase from "pocketbase";

import { AuthContext } from "../(lib)/context-provider";
function Account_logic({ notiff }) {
  const { isValid, setisValid } = useContext(AuthContext);

  const [domloaded, setdomloaded] = useState(false);
  useEffect(() => {
    setdomloaded(true);
  }, []);
  return (
    <div>
      {domloaded ? (
        isValid ? (
          <Navbar_user_icon notiff={notiff} />
        ) : (
          <div className="flex flex-col-reverse items-center sm:flex-row md:gap-y-2">
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
