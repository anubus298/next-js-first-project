"use client";
import { Collapse } from "antd";

function Notification_card({ item, ReadedArray, index, handleReading }) {
  const firstLineIndex = item.message.indexOf("\n");
  const subjectRegex = new RegExp(`^Subject:\\s*`);
  const date = new Date(item.created);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const formattedDate = date.toLocaleString("en-US", options);

  let firstLine =
    firstLineIndex !== -1
      ? item.message.substring(0, firstLineIndex)
      : item.message;
  firstLine = firstLine.replace(subjectRegex, "");
  return (
    <Collapse
      bordered={false}
      size="small"
      className="text-main bg-white rounded-lg shadow-lg mx-2 md:me-8"
      onChange={() => handleReading(item.id, item.collectionName, index)}
      items={[
        {
          key: "1",
          label: (
            <p className="font-semibold w-full justify-between">
              {firstLine.trim()}
              <span className="text-xs font-normal text-gray-400">   {formattedDate}</span>
            </p>
          ),
          children: (
            <p className="whitespace-pre-line font-normal">{item.message}</p>
          ),
          extra: (
            <>
              {ReadedArray && (
                <div className={"h-3 w-3 bg-secondary rounded-full "}></div>
              )}
            </>
          ),
        },
      ]}
    />
  );
}

export default Notification_card;
