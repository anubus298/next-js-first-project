"use client";
import PocketBase from "pocketbase";

import {
  faBagShopping,
  faCreditCard,
  faGear,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, ConfigProvider } from "antd";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import notificationAtom from "../(lib)/jotai/notificationAtom";
import { AuthContext } from "../(lib)/context-provider";
import userColorAtom from "../(lib)/jotai/userColor";
function UserSidePanel() {
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const pathname = usePathname();
  const [notiCount, setnotiCount] = useAtom(notificationAtom);
  const [username, setusername] = useState("");
  const [color, setcolor] = useAtom(userColorAtom);

  const [email, setemail] = useState("");
  const [ColoredArray, setColoredArray] = useState([
    {
      name: "Account",
      icon: <FontAwesomeIcon icon={faGear} />,
      current: false,
    },
    {
      name: "Notifications",
      icon: (
        <Badge offset={[8, 0]} size="small" count={notiCount}>
          <FontAwesomeIcon className="text-white" icon={faMessage} />
        </Badge>
      ),
      current: false,
    },
    {
      name: "Favorite",
      icon: <FontAwesomeIcon icon={faBagShopping} />,
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
    let index = ColoredArray.findIndex((item) => {
      let word = "/user/" + item.name.toLowerCase();
      return word == pathname;
    });
    let arr = ColoredArray.map((item) => {
      item.current = false;
      return item;
    });
    if (pathname.startsWith("/user/account")) {
      arr[0].current = true;
    } else {
      arr[index].current = true;
    }
    setColoredArray(arr);
  }, [pathname]);
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
    setusername(pb.authStore?.model?.username);
    setemail(pb.authStore?.model?.email);
  }, []);
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
      <div className="flex w-full pb-4 md:py-4 px-2 md:ps-8 md:pe-4 md:min-h-[75vh] flex-col md:gap-y-10  justify-between md:justify-center text-main border-gray-300 border-r-2">
        <div className="w-full justify-center  md:bg-transparent py-2 px-1 md:p-3 flex flex-col font  items-center md:items-start select-none">
          <Avatar
            icon={<FontAwesomeIcon icon={faUser} size="2x" />}
            shape="square"
            size={"large"}
            className=" flex justify-center items-center mb-1"
            style={{ backgroundColor: color }}
          />
          <p className="text-2xl font-bold">{username}</p>
          <p className="text-gray-500 font-normal">{email}</p>
        </div>
        <div className="flex flex-row justify-between md:justify-between w-full md:w-auto items-center md:gap-y-5 md:flex-col">
          {ColoredArray.map((item, index) => {
            return (
              <div
                key={index * 45 + "dok"}
                className={
                  "flex justify-center items-center md:w-full gap-1 transition  "
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
                  <Avatar
                    shape="square"
                    className={
                      "flex  justify-center transition items-center text-sm md:text-lg text-white "
                    }
                    style={{ backgroundColor: item.current ? color : "black" }}
                  >
                    {item.icon}
                  </Avatar>
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
