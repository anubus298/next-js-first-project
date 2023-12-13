"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Login_panel from "./(loginComponents)/login_panel";
import ForgotPasswordPanel from "./(loginComponents)/forgotPasswordPanel";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "../../../public/css/theme-config.css";
import { useState } from "react";
function SupportForServer({ providers }) {
  const [isLoginPanel, setisLoginPanel] = useState(true);
  return (
    <Theme>
      <div className="flex items-center justify-around w-full h-full p-5 sm:p-10 font-lato">
        <Image
          className="hidden md:block"
          alt="man shopping"
          height={450}
          sizes={"(max-width : 767px) 0vw"}
          width={450}
          src="/loginPage/x35.png"
        />
        {isLoginPanel && (
          <motion.div
            animate={{ opacity: [0, 0.5, 1] }}
            className="bg-secondarySecondarylight  min-h-[500px] w-full md:w-1/2 pt-2 md:pt-5 sm:px-10 flex flex-col justify-evenly  text-main text-center select-none font-lato"
          >
            <Login_panel
              providers={providers}
              setisLoginPanel={setisLoginPanel}
            />
          </motion.div>
        )}
        {!isLoginPanel && (
          <motion.div
            className="bg-secondarySecondarylight  min-h-[500px] w-full md:w-1/2 pt-2 md:pt-5 sm:px-10 flex flex-col justify-evenly  text-main text-center select-none font-lato"
            animate={{ opacity: [0, 0.5, 1] }}
          >
            <ForgotPasswordPanel setisLoginPanel={setisLoginPanel} />
          </motion.div>
        )}
      </div>
    </Theme>
  );
}

export default SupportForServer;
