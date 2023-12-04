"use client"
import { Empty } from "antd";
function Empty_notifications({name}) {
  return (
    <div className="w-full h-full p-8 flex justify-center items-center bg-gray-200 h-full flex-col select-none">
     <Empty description={<p className="font-semibold text-lg">No {name}</p>}/>
    </div>
  );
}

export default Empty_notifications;
