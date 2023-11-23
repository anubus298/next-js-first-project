import { atom, useAtom } from "jotai";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ConfigProvider, Popover } from "antd";
export const NotificationFavoriteCount = atom(0);
function FavoriteIcon({ size }) {
  const [notifCount, setnotifCount] = useAtom(NotificationFavoriteCount);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgElevated: "#D64550",
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
          className=" mx-2 flex items-center gap-x-1 cursor-pointer relative"
        >
          {notifCount > 0 && (
            <div
              className={
                "absolute bg-white text-secondary rounded-full top-0 left-2 h-4 w-4 flex justify-center items-center text-xs" +
                (size && "left-[1.5rem] -top-[7px] h-5 w-5")
              }
            >
              <p>{notifCount}</p>
            </div>
          )}
          <FontAwesomeIcon
            icon={faHeart}
            className=" hover:text-secondaryLight text-secondary transition"
            size={size ? size : "1x"}
          />
        </Link>
      </Popover>
    </ConfigProvider>
  );
}

export default FavoriteIcon;
