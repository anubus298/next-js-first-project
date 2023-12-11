"use client";
import { motion } from "framer-motion";
import { Collapse } from "antd";
import {
  faBell,
  faEnvelope,
  faEnvelopeOpenText,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ConfigProvider, Segmented } from "antd";
import { useAtom } from "jotai";
import { useState } from "react";
import notificationAtom from "../../(lib)/jotai/notificationAtom";
import Empty_notifications from "./empty_notifications";
function Main_notifications({ notifications, inbox }) {
  const [notificationCount, setnotificationCount] = useAtom(notificationAtom);
  const [isInbox, setIsInbox] = useState(true);
  async function handleInboxReading(id, collectionName, index) {
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
  async function handleNotifReading() {
    const list = Promise.all(
      notifications.map(async (item, index) => {
        if (!item.readStatus) {
          const res = await fetch("/api/userCategories/readRecord", {
            method: "PATCH",
            body: JSON.stringify({
              id: item.id,
              collectionName: item.collectionName,
            }),
          });
        }
      })
    );
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
  const [readedArrayInbox, setreadedArrayInbox] = useState(
    inbox.map((i) => {
      if (i.readStatus) {
        return false;
      } else {
        return true;
      }
    })
  );

  async function handleAllRead() {
    const array = isInbox ? [...inbox] : [...notifications];
    const list = await Promise.all(
      array.map(async (item) => {
        if (!item.readStatus) {
          const res = await fetch("/api/userCategories/readRecord", {
            method: "PATCH",
            body: JSON.stringify({
              id: item.id,
              collectionName: item.collectionName,
            }),
          });
          const data = await res.text();
          return 1;
        }
      })
    );

    if (isInbox) {
      setreadedArrayInbox(
        readedArrayInbox.map((item) => {
          if (item) {
          }
          return false;
        })
      );
    } else {
      setReadedArray(
        ReadedArray.map((item) => {
          if (item) {
            console.log("d");
          }
          return false;
        })
      );
    }
    setnotificationCount(notificationCount - list.length);
  }
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
      <div className="w-full bg-secondarySecondarylight md:w-10/12 md:ps-5">
        <div className="flex flex-col items-center justify-center w-full mt-5 gap-y-6 md:mt-0 md:flex-row md:justify-between">
          <div className="w-full py-2 text-center text-white bg-main md:bg-transparent md:text-main md:py-0">
            <p className="pt-2 text-5xl font-semibold md:text-4xl md:text-start md:bg-transparent">
              Messages
            </p>
          </div>
          {((isInbox && inbox.length != 0) ||
            (!isInbox && notifications.length != 0)) && (
            <Button
              disabled={
                (isInbox &&
                  readedArrayInbox.findIndex((i) => i == true) == -1) ||
                (!isInbox && ReadedArray.findIndex((i) => i == true) == -1)
              }
              onClick={() => handleAllRead()}
              className=" p-2 h-[40px]  text-white bg-secondaryGreen"
            >
              make all readed
            </Button>
          )}
        </div>
        <div className="flex flex-col h-full gap-2 py-2 font-semibold md:py-10">
          <Segmented
            block
            options={[
              {
                label: (
                  <div
                    onClick={() => setIsInbox(true)}
                    className="flex items-center justify-center gap-2 py-2"
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
                    onClick={() => {
                      setIsInbox(false);
                      handleNotifReading();
                    }}
                    className="flex items-center justify-center gap-2 py-2"
                  >
                    <FontAwesomeIcon icon={faBell} />
                    <div>Notifications</div>
                  </div>
                ),
                value: "notifications",
              },
            ]}
            id={"top"}
          />

          <div className="flex gap-3 flex-col w-full md:h-[50vh] overflow-x-hidden bg-gray-200">
            {!isInbox && notifications.length != 0 && (
              <motion.div
                className="flex flex-col w-full gap-2 "
                animate={{ opacity: [0, 0.5, 1] }}
              >
                <p className="p-1 text-sm text-center text-white md:text-start bg-main md:rounded-lg md:px-4">
                  Your have ({notificationCount}) unreaded messages
                </p>
                {notifications.map((item, index) => {
                  return (
                    <Notification_card
                      key={item.id + index + 12}
                      item={item}
                      ReadedArray={ReadedArray[index]}
                    />
                  );
                })}
              </motion.div>
            )}

            {isInbox && inbox.length != 0 && (
              <motion.div
                className="flex flex-col w-full gap-2 "
                animate={{ opacity: [0, 0.5, 1] }}
              >
                <p className="p-1 text-sm text-center text-white md:text-start bg-main md:rounded-lg md:px-4">
                  Your have ({notificationCount}) unreaded notifications
                </p>
                {inbox.map((item, index) => {
                  return (
                    <Inbox_card
                      key={item.id + index + 11}
                      item={item}
                      date={true}
                      index={index}
                      ReadedArray={readedArrayInbox[index]}
                      handleReading={handleInboxReading}
                    />
                  );
                })}
              </motion.div>
            )}
            {!isInbox && notifications.length == 0 && (
              <Empty_notifications name={"Notifications"} />
            )}
            {isInbox && inbox.length == 0 && (
              <Empty_notifications name={"Inbox"} />
            )}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}

function Inbox_card({ item, date, ReadedArray, index, handleReading }) {
  const firstLineIndex = item.message.indexOf("\n");
  const subjectRegex = new RegExp(`^Subject:\\s*`);
  1;
  const dateformat = new Date(item.created);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const formattedDate = dateformat.toLocaleString("en-US", options);

  let firstLine =
    firstLineIndex !== -1
      ? item.message.substring(0, firstLineIndex)
      : item.message;
  firstLine = firstLine.replace(subjectRegex, "");
  return (
    <Collapse
      bordered={false}
      size="small"
      expandIcon={() => (
        <FontAwesomeIcon icon={ReadedArray ? faEnvelope : faEnvelopeOpenText} />
      )}
      className="mx-2 bg-white rounded-lg shadow-lg text-main "
      onChange={() => handleReading(item.id, item.collectionName, index)}
      items={[
        {
          key: "1",
          label: (
            <p className="justify-between w-full font-semibold">
              {firstLine.trim()}
              <span className="text-xs font-normal text-gray-400">
                {" "}
                {date ? formattedDate : ""}
              </span>
            </p>
          ),
          children: (
            <div className="flex flex-col justify-end w-full">
              <p className="font-normal whitespace-pre-line">{item.message}</p>
              <a className="text-xs md:hidden text-end" href="#top">
                go top
              </a>
            </div>
          ),
          extra: (
            <>{ReadedArray && <p className={" text-secondary  "}>New</p>}</>
          ),
        },
      ]}
    />
  );
}
function Notification_card({ item, ReadedArray }) {
  return (
    <div className="flex items-center justify-between p-3 mx-2 text-sm bg-white rounded-lg shadow-lg select-none text-main">
      <p>{item.message}</p>
      {ReadedArray && <p className={" text-secondary  "}>New</p>}
    </div>
  );
}
export default Main_notifications;
