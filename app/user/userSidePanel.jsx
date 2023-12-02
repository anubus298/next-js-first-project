"use client";
import PocketBase from "pocketbase";

import {
  faBell,
  faCreditCard,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, ConfigProvider } from "antd";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import notificationAtom from "../(lib)/jotai/notificationAtom";
function UserSidePanel() {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const pathname = usePathname();
  const [notiCount, setnotiCount] = useAtom(notificationAtom);
  const [ColoredArray, setColoredArray] = useState([
    {
      name: "Account",
      icon: <FontAwesomeIcon icon={faUser} />,
      current: false,
    },
    {
      name: "Notifications",
      icon: (
        <Badge offset={[8, 0]} size="small" count={notiCount}>
          <FontAwesomeIcon className="text-white" icon={faBell} />
        </Badge>
      ),
      current: false,
    },
    {
      name: "Favorite",
      icon: <FontAwesomeIcon icon={faHeart} />,
      current: false,
    },
    {
      name: "Purchases",
      icon: <FontAwesomeIcon icon={faCreditCard} />,
      current: false,
    },
  ]);
  const router = useRouter();
  useEffect(() => {
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
    pb.authStore.loadFromCookie(getCookie("pb_auth"));

    let index = ColoredArray.findIndex((item) => {
      let word = "/user/" + item.name.toLowerCase();
      return word == pathname;
    });
    let arr = ColoredArray.map((item) => {
      item.current = false;
      return item;
    });
    arr[index].current = true;
    setColoredArray(arr);
  }, [pathname]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Avatar: {
            containerSizeLG: 80,
          },
        },
      }}
    >
      <div className="flex w-full py-1 md:py-4 px-2 md:px-8 md:min-h-[75vh] flex-col md:gap-y-10  justify-between md:justify-center text-main ">
        <div className="w-full justify-center bg-white md:bg-transparent py-2 px-1 md:p-3 flex flex-col font  items-center md:items-start select-none">
          <Avatar
            icon={<FontAwesomeIcon icon={faUser} size="2x" />}
            shape="square"
            size={"large"}
            className="bg-secondaryGreen flex justify-center items-center mb-1"
          />
          <p className="text-2xl font-bold">{pb.authStore.model.username}</p>
          <p className="text-gray-500 font-normal">
            {pb.authStore.model.email}
          </p>
        </div>
        <div className="h-[1px] w-full bg-gray-400 my-2"></div>
        <div className="flex flex-row justify-between md:justify-evenly w-full md:w-auto items-center md:gap-y-5 md:flex-col">
          {ColoredArray.map((item, index) => {
            return (
              <div
                key={index * 45 + "dok"}
                className={
                  "flex justify-center items-center md:w-full gap-1 transition  " +
                  (item.current && "text-secondary")
                }
              >
                <div
                  className="flex flex-col md:-flex-row items-center cursor-pointer w-full md:flex-row justify-start gap-x-3 md:px-5"
                  onClick={() =>
                    router.push("/user/" + item.name.toLowerCase(), {
                      scroll: false,
                    })
                  }
                >
                  <div
                    className={
                      "flex  justify-center transition items-center rounded-full md:w-7 md:h-7 h-4 w-4 p-3 text-sm md:text-lg text-white " +
                      (item.current && " bg-secondary ") +
                      (!item.current && " bg-main ")
                    }
                  >
                    {item.icon}
                  </div>
                  <p className="font-semibold text-xs md:text-base">
                    {item.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default UserSidePanel;
