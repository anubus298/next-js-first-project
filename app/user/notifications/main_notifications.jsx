"use client";

import { Collapse } from "antd";
import { useAtom } from "jotai";
import { useState, useRef } from "react";
import notificationAtom from "../../(lib)/jotai/notificationAtom";
import Empty_notifications from "./empty_notifications";
function Main_notifications({ notifications }) {
  const [notificationCount, setnotificationCount] = useAtom(notificationAtom);
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
    <div className="bg-secondarySecondarylight w-full md:h-[75vh] overflow-x-auto">
      <div className="flex flex-col gap-2  font-semibold overflow-y-auto py-10 h-full">
        {notifications && (
          <div className="px-2 w-full">
            <p className="font-extrabold text-lg p-1">
              Your have ({notificationCount}) unreaded messages
            </p>
          </div>
        )}
        {notifications &&
          notifications.map((item, index) => {
            const firstLineIndex = item.message.indexOf("\n");
            const subjectRegex = new RegExp(`^Subject:\\s*`);
            let firstLine =
              firstLineIndex !== -1
                ? item.message.substring(0, firstLineIndex)
                : item.message;
            firstLine = firstLine.replace(subjectRegex, "");
            return (
              <Collapse
              bordered={false}
                key={item.id + index * 12}
                size="small"
                className="text-main bg-white p-4 rounded-lg shadow-lg mx-8"
                onChange={() =>
                  handleReading(item.id, item.collectionName, index)
                }
                items={[
                  {
                    key: "1",
                    label: (
                      <p className="font-extrabold ">{firstLine.trim()}</p>
                    ),
                    children: (
                      <p className="whitespace-pre-line">{item.message}</p>
                    ),
                    extra: (
                      <>
                        {ReadedArray[index] && (
                          <div
                            className={"h-3 w-3 bg-secondary rounded-full "}
                          ></div>
                        )}
                      </>
                    ),
                  },
                ]}
              />
            );
          })}
        {notifications.length == 0 && <Empty_notifications />}
      </div>
    </div>
  );
}

export default Main_notifications;
