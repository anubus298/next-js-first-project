"use client";

import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, ColorPicker } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../(lib)/context-provider";

function Main_account_information({ info }) {
  const { color, setcolor } = useContext(AuthContext);
  async function handleSave() {
    const res = await fetch("/api/");
    const data = await res.json();
  }
  const birth = new Date(info.birth);
  return (
    <div className="w-full bg-secondarySecondarylight md:w-10/12 md:ps-5">
      <div className="flex flex-col items-center justify-center w-full mt-5 gap-y-6 md:mt-0 md:flex-row md:justify-between">
        <div className="w-full py-2 text-center text-white bg-main md:bg-transparent md:text-main md:py-0">
          <p className="pt-2 text-5xl font-semibold md:text-4xl md:text-start md:bg-transparent">
            Account Information
          </p>
        </div>
      </div>
      <div className="flex flex-col flex-wrap h-full gap-8 px-4 py-2 font-semibold justify- md:py-10">
        <div className="flex justify-center md:justify-normal">
          <div className="flex flex-col justify-center md:justify-normal rounded-lg overflow-hidden h-[180px] w-[180px]">
            <Avatar
              shape="square"
              style={{ backgroundColor: color }}
              className="h-[180px] w-[180px] text-8xl flex justify-center items-center"
            >
              {info.expand.user.username[0].toUpperCase()}
            </Avatar>
            <div className="flex items-center justify-between my-2">
              <ColorPicker onChange={(value, hex) => setcolor(hex)} />
              <button
                style={{ backgroundColor: color }}
                className="text-white p-1 rounded-lg"
              >
                Save color
              </button>
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
          <button className="p-2 font-normal rounded-lg bg-secondaryOrange text-textWhiteWithSecondary">
            change password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main_account_information;
