"use client"
import { Empty } from "antd";
function Empty_notifications() {
  return (
    <div className="w-full h-full p-8 flex justify-center items-center flex-col select-none">
     <Empty description={<p className="font-semibold text-lg">No notifications</p>}/>
    </div>
  );
}

export default Empty_notifications;
