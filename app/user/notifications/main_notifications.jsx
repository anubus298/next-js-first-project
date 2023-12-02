"use client";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { faBell, faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ConfigProvider, Segmented } from "antd";
import { useAtom } from "jotai";
import { useState, useRef } from "react";
import notificationAtom from "../../(lib)/jotai/notificationAtom";
import Empty_notifications from "./empty_notifications";
import Notification_card from "./notification_card";
function Main_notifications({ notifications }) {
  const [notificationCount, setnotificationCount] = useAtom(notificationAtom);
  const [ismount, setismount] = useState(false);
  const comp = useRef(null);
  async function handleReading(id, collectionName, index) {
    if (ReadedArray[index]) {
      let changed = [...ReadedArray];
      changed[index] = false;
      setReadedArray(changed);
      notificationCount > 0 && setnotificationCount(notificationCount - 1);
      const res = await fetch("/api/userCategories/readRecord", {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          collectionName: collectionName,
        }),
      });
    }
  }
  const [ReadedArray, setReadedArray] = useState(
    notifications.map((i) => {
      if (i.readStatus) {
        return false;
      } else {
        return true;
      }
    })
  );
  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            headerPadding: "0px 0px",
          },
          Button: {
            borderColorDisabled: true,
          },
        },
      }}
    >
      <div className="bg-secondarySecondarylight w-full md:w-10/12 md:max-h-[100vh] overflow-x-hidden ">
        <div className="w-full gap-y-6 flex flex-col mt-5 md:mt-0 md:flex-row justify-center items-center md:justify-between">
          <div className="md:w-full">
            <p className="text-5xl md:text-4xl font-semibold  md:text-start bg-white md:bg-transparent pt-2">Notifications</p>
          </div>
          <Button className="bg-secondaryGreen p-2 h-[40px]  text-white">
            make all readed
          </Button>
        </div>
        <div className="flex flex-col gap-2  font-semibold  py-2 md:py-10 h-full">
          <Segmented
            block
            options={[
              {
                label: (
                  <div
                    onClick={() => setismount(!ismount)}
                    style={{ padding: 4 }}
                    className="flex items-center gap-2 justify-center"
                  >
                    <FontAwesomeIcon icon={faInbox} />
                    <div>Inbox</div>
                  </div>
                ),
                value: "inbox",
              },
              {
                label: (
                  <div
                    style={{ padding: 4 }}
                    className="flex items-center gap-2 justify-center"
                  >
                    <FontAwesomeIcon icon={faBell} />
                    <div>Notifications</div>
                  </div>
                ),
                value: "notifications",
              },
            ]}
          />
          {notifications && (
            <p className="text-center md:text-start text-sm p-1 bg-main text-white md:rounded-lg md:px-4">
              Your have ({notificationCount}) unreaded messages
            </p>
          )}

          <div className="flex gap-3 flex-col w-full ">
            {notifications &&
              notifications.map((item, index) => {
                return (
                  <Notification_card
                    key={item.id + index * 12}
                    item={item}
                    index={index}
                    ReadedArray={ReadedArray[index]}
                    handleReading={handleReading}
                  />
                );
              })}
          </div>

          {notifications.length == 0 && <Empty_notifications />}
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Main_notifications;
