"use client";
import {
  faBox,
  faChevronRight,
  faGear,
  faMessage,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCookie } from "../../functions/cookiesFunctions";
import { Collapse, ConfigProvider } from "antd";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { AuthContext } from "../../(lib)/context-provider";
import { useContext } from "react";
import Link from "next/link";
import Avatar from "antd/es/avatar/avatar";
import userColorAtom from "../../(lib)/jotai/userColor";
import { useAtom } from "jotai";

function Drawer_logIn() {
  const { isValid, setisValid } = useContext(AuthContext);
  const [color, setcolor] = useAtom(userColorAtom);
  const pb = new PocketBase(process.env.pocketBaseUrl);
  const router = useRouter();
  return !isValid ? (
    <div className="flex flex-col w-full gap-y-1">
      <Link
        href="/logIn/sfqpbk55"
        className="w-full p-2 text-lg font-bold text-center rounded-lg bg-secondarySecondarylight text-main"
      >
        Log in
      </Link>
      <Link
        href="/signIn/afesq"
        className="w-full p-2 text-lg font-bold text-center border-2 rounded-lg text-secondarySecondarylight border-secondarySecondarylight"
      >
        Sign up
      </Link>
    </div>
  ) : (
    <ConfigProvider theme={{ token: { motionDurationMid: 0 } }}>
      <div className="flex flex-col w-full text-white gap-y-1">
        <div className="flex flex-col items-center justify-center gap-x-2">
          <Avatar
            size="large"
            shape="square"
            style={{ backgroundColor: color }}
            className="flex items-center justify-center w-20 h-20 text-5xl font-semibold "
          >
            {pb.authStore.model?.username[0].toUpperCase()}
          </Avatar>
          <Collapse
            className="text-white"
            ghost
            expandIconPosition="end"
            expandIcon={({ isActive }) => (
              <FontAwesomeIcon
                className="text-white duration-100 ease-out"
                icon={faChevronRight}
                size="2x"
                rotation={isActive ? 90 : 0}
              />
            )}
            items={[
              {
                key: "1",
                label: (
                  <p className="text-lg font-bold text-white font-lato">
                    {pb.authStore.model?.username}
                  </p>
                ),
                children: (
                  <div className="flex flex-col p-2 text-lg font-bold text-white rounded-lg bg-secondary gap-y-2 font-lato">
                    <div className="flex items-center p-2 gap-x-1">
                      <FontAwesomeIcon icon={faGear} />
                      <Link className="text-white" href="/user/account/">
                        Account
                      </Link>
                    </div>
                    <div className="flex items-center p-2 gap-x-1">
                      <FontAwesomeIcon icon={faBox} />
                      <Link className="text-white" href="/commands">
                        Commands
                      </Link>
                    </div>
                    <div className="flex items-center p-2 gap-x-1">
                      <FontAwesomeIcon icon={faMessage} />
                      <Link className="text-white" href="/user/notifications">
                        Messages
                      </Link>
                    </div>
                    <div className="flex items-center p-2 gap-x-1">
                      <FontAwesomeIcon icon={faSignOut} />
                      <a
                        className="text-white"
                        onClick={() => {
                          pb.authStore.clear();
                          router.push("/");
                          deleteCookie("pb_auth");
                          setisValid(false);
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
    </ConfigProvider>
  );
}

export default Drawer_logIn;
