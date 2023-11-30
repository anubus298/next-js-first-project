"use client";

import {
  faBell,
  faCreditCard,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "antd";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import notificationAtom from "../(lib)/jotai/notificationAtom";
function UserSidePanel() {
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
          <FontAwesomeIcon icon={faBell} />
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
    <div className="flex py-4 md:h-[75vh] flex-row md:flex-col md:gap-y-10  justify-between md:justify-center p-1 text-white font-semibold ">
      {ColoredArray.map((item, index) => {
        return (
          <div
            key={index * 45 + "dok"}
            className={
              "flex justify-center items-center  gap-1 transition  " +
              (item.current && "text-secondary")
            }
          >
            <div
              className="flex flex-col md:-flex-row items-center cursor-pointer"
              onClick={() => router.push("/user/" + item.name.toLowerCase())}
            >
              <div
                className={
                  "flex justify-center transition items-center rounded-full md:w-7 md:h-7 h-5 w-5 p-1 text-sm md:text-lg text-main " +
                  (item.current && "bg-secondary ") +
                  (!item.current && " bg-white ")
                }
              >
                {item.icon}
              </div>
              <p>{item.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserSidePanel;
