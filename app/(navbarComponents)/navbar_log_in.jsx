"use client";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ConfigProvider } from "antd";
import { useRouter } from "next/navigation";
function Navbar_log_in() {
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
          className="px-2 py-1 rounded-lg cursor-pointer bg-secondarySecondarylight text-main"
          onClick={() => router.push("/logIn/pch46f5f6qqaaz=")}
        >
          <FontAwesomeIcon
            icon={faRightToBracket}
            size="1x"
            className=""
          />
        </div>
    </ConfigProvider>
    
  );
}

export default Navbar_log_in;
