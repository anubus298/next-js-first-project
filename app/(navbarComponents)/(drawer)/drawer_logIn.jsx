"use client";
import {
  faBox,
  faChevronRight,
  faGear,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCookie, getCookie } from "../../functions/cookiesFunctions";
import { Collapse } from "antd";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { AuthContext } from "../../(lib)/context-provider";
import { useContext } from "react";
import Link from "next/link";
import Avatar from "antd/es/avatar/avatar";

function Drawer_logIn() {
  const { isValid, setisValid } = useContext(AuthContext);
  const pb = new PocketBase("http://127.0.0.1:8090");
  const router = useRouter();
  return !isValid ? (
    <div className="w-full flex flex-col gap-y-1">
      <Link
        href="/logIn/sfqpbk55"
        className="w-full bg-secondarySecondarylight text-main font-bold text-center rounded-lg text-lg p-2"
      >
        Log in
      </Link>
      <Link
        href="/signIn/"
        className="w-full  text-secondarySecondarylight border-secondarySecondarylight border-2 font-bold text-center rounded-lg text-lg p-2"
      >
        Sign up
      </Link>
    </div>
  ) : (
    <div className="w-full flex flex-col gap-y-1 text-white">
      <div className="flex flex-col items-center gap-x-2 justify-center">
        <Avatar size="default" className="bg-green-500">
          {pb.authStore.model?.username[0].toUpperCase()}
        </Avatar>
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
                    <Link className="text-white" href="/account-settings">
                      Account
                    </Link>
                  </div>
                  <div className="flex items-center gap-x-1 p-2">
                    <FontAwesomeIcon icon={faBox} />
                    <Link className="text-white" href="/account-settings">
                      Commands
                    </Link>
                  </div>
                  <div className="flex items-center gap-x-1 p-2">
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
  );
}

export default Drawer_logIn;
