"use client";
import { Badge } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import notificationAtom from "../../(lib)/jotai/notificationAtom";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
function Category_notification() {
  const router = useRouter();
  const [notificationsCountAtom] = useAtom(notificationAtom);
  return (
    <div
      className={
        " p-1  flex items-center gap-x-2 cursor-pointer transition ease-out " +
        ` transition p-1 rounded-lg`
      }
      onClick={() => {
        router.push("/user/notifications");
      }}
    >
      <Badge size="small" count={notificationsCountAtom}>
        <FontAwesomeIcon className="text-white" icon={faBell} />
      </Badge>
      <p>Notification</p>
    </div>
  );
}

export default Category_notification;
