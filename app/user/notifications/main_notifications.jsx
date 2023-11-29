"use client";

import { Collapse } from "antd";
import { useAtom } from "jotai";
import { useState } from "react";
import notificationAtom from "../../(lib)/jotai/notificationAtom";

function Main_notifications({ notifications }) {
  const [notificationCount, setnotificationCount] = useAtom(notificationAtom);
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
    <div className="bg-secondarySecondarylight w-full h-full">
      <div className="bg-main text-3xl text-secondary w-full p-2 font-black text-center">
        <p>Notifications</p>
      </div>
      <div className="flex flex-col gap-2  font-semibold overflow-y-auto my-3 h-full">
        {notifications.map((item, index) => {
          const firstLineIndex = item.message.indexOf("\n");
          const subjectRegex = new RegExp(`^Subject:\\s*`);
          let firstLine =
            firstLineIndex !== -1
              ? item.message.substring(0, firstLineIndex)
              : item.message;
          firstLine = firstLine.replace(subjectRegex, "");
          return (
            <Collapse
              key={item.id + index * 12}
              size="small"
              className="text-main bg-white p-4 rounded-lg shadow-md mx-8"
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
      </div>
    </div>
  );
}

export default Main_notifications;
