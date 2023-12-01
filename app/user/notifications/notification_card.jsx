"use client";
import { Collapse } from "antd";

function Notification_card({ item, ReadedArray,index,handleReading }) {
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
      size="small"
      className="text-main bg-white p-4 rounded-lg shadow-lg mx-8"
      onChange={() => handleReading(item.id, item.collectionName, index)}
      items={[
        {
          key: "1",
          label: <p className="font-extrabold ">{firstLine.trim()}</p>,
          children: <p className="whitespace-pre-line">{item.message}</p>,
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
