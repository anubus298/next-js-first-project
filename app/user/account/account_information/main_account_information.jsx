"use client";

import { faMars, faPen, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, ColorPicker } from "antd";
import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import userColorAtom from "../../../(lib)/jotai/userColor";

function Main_account_information({ info }) {
  const [color, setcolor] = useAtom(userColorAtom);
  const [isChanged, setisChanged] = useState(false);
  const [isloading, setisloading] = useState(false);
  async function handleSave(key, value) {
    setisloading(true);
    const res = await fetch("/api/other/userInfo", {
      method: "PATCH",
      body: JSON.stringify({
        key: key,
        value: value,
        id: info.id,
      }),
    });
    const data = await res.json();
    setisloading(false);
    setisChanged(false);
  }
  const birth = new Date(info.birth);
  return (
    <div className="w-full bg-secondarySecondarylight md:w-10/12 md:ps-5 select-none">
      <div className="flex flex-col items-center justify-center w-full mt-5 gap-y-6 md:mt-0 md:flex-row md:justify-between">
        <div className="w-full flex items-center justify-between py-2 text-center text-white bg-main md:bg-transparent md:text-main md:py-0">
          <p className="pt-2 text-5xl font-semibold md:text-4xl md:text-start md:bg-transparent">
            Account Information
          </p>
          <Link
            href="/user/account"
            className="bg-main text-textWhiteWithSecondary p-2 rounded-lg"
          >
            Go back
          </Link>
        </div>
      </div>
      <div className="flex flex-col flex-wrap h-full gap-8 px-4 py-2 font-semibold justify- md:py-10">
        <div className="flex justify-center md:justify-normal">
          <div className="flex flex-col justify-center md:justify-normal rounded-lg overflow-hidden ">
            <div className="h-[180px] w-[180px]">
              <Avatar
                shape="square"
                style={{ backgroundColor: color }}
                className="h-[180px] w-[180px] text-8xl flex justify-center items-center"
              >
                <p>{info.expand.user.username[0].toUpperCase()}</p>
              </Avatar>
            </div>
            <div className="my-2 flex items-center justify-between h-8">
              <ColorPicker
                format="hex"
                onChange={(value, hex) => {
                  !isChanged && setisChanged(true);
                  setcolor(hex);
                }}
              >
                <FontAwesomeIcon icon={faPen} />
              </ColorPicker>
              {isChanged && (
                <button
                  className="p-1 rounded-lg w-14 flex justify-center"
                  style={{ backgroundColor: color }}
                  onClick={() => handleSave("color", color)}
                >
                  {!isloading ? (
                    <p>Save</p>
                  ) : (
                    <ColorRing
                      visible={true}
                      height="20"
                      width="20"
                      ariaLabel="blocks-loading"
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#e15b64",
                        "#f47e60",
                        "#f8b26a",
                        "#abbd81",
                        "#849b87",
                      ]}
                    />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p>First Name:</p>
          <p className="font-normal ">
            {info.expand.user.username.split("_")[0]}
          </p>
        </div>
        {info.expand.user.username.split("_").length > 1 && (
          <div className="flex items-center justify-between">
            <p>First Name:</p>
            <p className="font-normal ">
              {info.expand.user.username.split("_")[1]}
            </p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <p> Birth:</p>
          <p className="font-normal ">
            {" "}
            {birth.toLocaleString("en-uk", {
              year: "numeric",
              month: "2-digit",
              day: "numeric",
              hour12: false,
            })}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>Gender:</p>
          <FontAwesomeIcon
            icon={info.gender == "male" ? faMars : faVenus}
            className={
              (info.gender == "male" ? "text-blue-600" : "text-pink-700") +
              " text-2xl"
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <p>Phone number:</p>
          <p className="font-normal "> {info.phone}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Email:</p>
          <p className="font-normal "> {info.expand.user.email}</p>
        </div>

        <div className="flex items-center justify-between w-full">
          <p>Password:</p>
          <p className="font-medium  cursor-pointer text-indigo-950">
            change password
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main_account_information;
