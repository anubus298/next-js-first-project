import {  useAtom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Badge, ConfigProvider, Popover } from "antd";
export const NotificationCount = atomWithStorage("NotificationCount",0);
function CartIcon({ size }) {
  const [notifCount, setnotifCount] = useAtom(NotificationCount);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: "#D64550",
          colorError: "#D64550",
          colorBorderBg: "#000000",
        },
      }}
    >
      <Popover content={<p className="font-bold text-white">My cart</p>}>
        <Link
          href="/mycart/user"
          onClick={() => {
            setnotifCount(0);
            localStorage.setItem("NotificationCount", 0);
          }}
          className=" me-2 flex items-center gap-x-1 cursor-pointer "
        >
          <Badge size="small" count={notifCount}>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-white"
              size={size ? size : "xl"}
            />
          </Badge>
        </Link>
      </Popover>
    </ConfigProvider>
  );
}

export { CartIcon };
