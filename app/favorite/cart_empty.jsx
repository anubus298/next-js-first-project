import ShopNow from "./shopNow";
import Image from "next/image";
function Cart_empty() {
  return (
    <div className="w-full p-8 flex justify-center items-center flex-col select-none">
      <Image
        src="/empty_cart.png"
        height={100}
        width={100}
        alt="empty cart icon"
      />
      <p className="text-xl font-semibold">No Favorite</p>
      <ShopNow />
    </div>
  );
}

export default Cart_empty;
