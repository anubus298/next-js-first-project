"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ConfigProvider } from "antd";
import { Router } from "next/router";
import { AuthContext } from "../(lib)/context-provider";
import { useContext } from "react";

function VerticalTitle() {
  const pathname = usePathname();
  const router = useRouter();
  const { isValid, setisValid } = useContext(AuthContext);
  const [title, settitle] = useState("");

  const pb = new PocketBase(process.env.pocketBaseUrl);
  function deleteCookie(name) {
    setCookie(name, "", {
      "max-age": -1,
    });
  }
  function setCookie(name, value, options = {}) {
    options = {
      path: "/",
      ...options,
      secure: true,
      expires: new Date(Date.now() + 86400e3).toUTCString(),
    };

    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }
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
    const match = pathname.match(/\/user\/([^\/]+)/);
    settitle(match[1]);
  }, [pathname]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            dangerColor: "#FF8B37",
          },
        },
      }}
    >
      <div className="w-full flex-col p-4">
        <div className="flex items-center justify-between p-3">
          <p className="font-semibold text-xl md:text-3xl">Personal account</p>
          <Button
            className="font-semibold w-[200px] py-2 h-[50px] text-white bg-main hover:bg-main  "
            type="primary"
            onClick={() => {
              router.push("/");
              setisValid(false);
              pb.authStore.clear();
              deleteCookie("pb_auth");
              Router;
            }}
          >
            Sign out
          </Button>
        </div>
        <div className="w-full h-[1px] bg-gray-300"></div>
      </div>
    </ConfigProvider>
  );
}

export default VerticalTitle;
