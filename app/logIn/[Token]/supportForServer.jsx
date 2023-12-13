"use client";
import Image from "next/image";
import Login_panel from "./(loginComponents)/login_panel";
import ForgotPasswordPanel from "./(loginComponents)/forgotPasswordPanel";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "../../../public/css/theme-config.css";
import { useState } from "react";
function SupportForServer({providers}) {
  const [isLoginPanel, setisLoginPanel] = useState(true);
  return (
    <Theme>
      <div className="flex justify-around items-center w-full h-full  p-5 sm:p-10 font-lato">
        <Image
          className="hidden md:block"
          alt="man shopping"
          height={450}
          sizes={"(max-width : 767px) 0vw"}
          width={450}
          src="/loginPage/x35.png"
        />
        {isLoginPanel && <Login_panel providers={providers} setisLoginPanel={setisLoginPanel} />}
        {!isLoginPanel && (
          <ForgotPasswordPanel setisLoginPanel={setisLoginPanel} />
        )}
      </div>
    </Theme>
  );
}

export default SupportForServer;
