import { atom, useAtom } from "jotai";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const NotificationCount = atom(0);
function CartIcon({ size }) {
  const [notifCount, setnotifCount] = useAtom(NotificationCount);

  return (
    <a
      href="/mycart/user"
      onClick={() => {
        setnotifCount(0);
        localStorage.setItem("NotificationCount", 0);
      }}
      className=" me-2 flex items-center gap-x-1 cursor-pointer relative"
    >
      {notifCount > 0 && (
        <div
          className={
            "absolute bg-secondary text-white rounded-full top-0 left-2 h-4 w-4 flex justify-center items-center text-xs " +
            (size && "left-[1.5rem] -top-[7px] h-5 w-5")
          }
        >
          <p>{notifCount}</p>
        </div>
      )}
      <FontAwesomeIcon
        icon={faCartShopping}
        className=" hover:text-secondary transition"
        size={size ? size : "1x"}
      />
    </a>
  );
}

export { CartIcon };
