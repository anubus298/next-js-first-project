import { Empty } from "antd";
function Empty_purchases() {
  return (
    <div className="w-full h-full p-8 flex justify-center items-center bg-gray-200 flex-col select-none">
      <Empty
        description={<p className="font-semibold text-lg">No purchases</p>}
      />
    </div>
  );
}

export default Empty_purchases;
