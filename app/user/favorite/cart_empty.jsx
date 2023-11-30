
import { Empty } from "antd";
function Cart_empty() {
  return (
    <div className="w-full h-full p-8 flex justify-center items-center flex-col select-none">
     <Empty description={<p className="font-semibold text-lg">No favorites</p>}/>
    </div>
  );
}

export default Cart_empty;
