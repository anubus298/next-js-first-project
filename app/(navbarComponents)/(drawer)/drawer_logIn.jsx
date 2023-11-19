"use client";
import {
  faChevronRight,
  faGear,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCookie, getCookie } from "../../functions/cookiesFunctions";
import { Collapse } from "antd";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { isValidUserAtom } from "../../functions/atomCookie";
import { useEffect, useState } from "react";

function Drawer_logIn() {
  const [isValid, setIsvalid] = useAtom(isValidUserAtom);
  const pb = new PocketBase("http://127.0.0.1:8090");
  useEffect(() => {
      pb.authStore.loadFromCookie(getCookie("pb_auth"));
      if (pb.authStore.isValid) {
        setIsvalid(true);
      } else {
        setIsvalid(false);
      }
  }, []);
  const router = useRouter();
  return !isValid ? (
    <div className="w-full flex flex-col gap-y-1">
      <a
        href="/logIn/sfqpbk55"
        className="w-full bg-secondarySecondarylight text-main font-bold text-center rounded-lg text-lg p-2"
      >
        Log in
      </a>
      <a
        href="/signIn/"
        className="w-full  text-secondarySecondarylight border-secondarySecondarylight border-2 font-bold text-center rounded-lg text-lg p-2"
      >
        Sign up
      </a>
    </div>
  ) : (
    <div className="w-full flex flex-col gap-y-1">
      <div className="flex flex-col items-center gap-x-2 justify-center">
        <FontAwesomeIcon icon={faUser} size="3x" />
        <Collapse
          className="text-white"
          ghost
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <FontAwesomeIcon
              className="text-white ease-out duration-100"
              icon={faChevronRight}
              size="2x"
              rotation={isActive ? 90 : 0}
            />
          )}
          items={[
            {
              key: "1",
              label: (
                <p className="text-white font-bold text-lg font-lato">
                  {pb.authStore.model?.username}
                </p>
              ),
              children: (
                <div className="bg-secondary rounded-lg text-white flex flex-col gap-y-2 p-2 font-bold text-lg font-lato">
                  <div className="flex items-center gap-x-1 p-2">
                    <FontAwesomeIcon icon={faGear} />
                    <a href="/account-settings">Settings</a>
                  </div>
                  <div className="flex items-center gap-x-1 p-2">
                    <FontAwesomeIcon icon={faSignOut} />
                    <a
                      onClick={() => {
                        pb.authStore.clear();
                        router.push("/");
                        deleteCookie("pb_auth");
                        setIsvalid(false);
                      }}
                    >
                      Log out
                    </a>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Drawer_logIn;
