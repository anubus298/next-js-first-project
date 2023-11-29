import {  useAtom } from "jotai";
import { atomWithStorage } from 'jotai/utils'

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Badge, ConfigProvider, Popover } from "antd";
export const NotificationFavoriteCount = atomWithStorage("NotificationFavoriteCount", 0);
function FavoriteIcon({ size }) {
  const [notifCount, setnotifCount] = useAtom(NotificationFavoriteCount);
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
      <Popover content={<p className="font-bold text-white">My wishlist</p>}>
        <Link
          href="/favorite"
          onClick={() => {
            setnotifCount(0);
            localStorage.setItem("NotificationFavoriteCount", 0);
          }}
          className=" mx-2 flex items-center gap-x-1 cursor-pointer "
        >
          <Badge size="small" count={notifCount}>
            <FontAwesomeIcon
              icon={faHeart}
              className="text-secondary transition"
              size={size ? size : "xl"}
            />
          </Badge>
        </Link>
      </Popover>
    </ConfigProvider>
  );
}

export default FavoriteIcon;
