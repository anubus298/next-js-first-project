"use client";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfigProvider } from "antd";
import { useRouter } from "next/navigation";

function Navbar_sign_in() {
  const router = useRouter();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: "#D64550",
        },
      }}
    >
        <div
          className=" px-2 rounded-lg cursor-pointer text-secondarySecondary"
          onClick={() => router.push("/signIn/fgd")}
        >
          <FontAwesomeIcon
            icon={faUserPlus}
            size="1x"
            className=""
          />
        </div>
    </ConfigProvider>
  );
}

export default Navbar_sign_in;
