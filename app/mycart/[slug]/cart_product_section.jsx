import ShopNow from "./shopNow";
import Image from "next/image";

function Cart_product_section() {
  return (
    <div className="w-full md:w-4/5 p-8 flex justify-center items-center flex-col select-none">
      <Image
        src="/empty_cart.png"
        height={100}
        width={100}
        alt="empty cart icon"
      />
      <p className="text-xl font-semibold">Your cart is empty</p>
      <ShopNow />
    </div>
  );
}

export default Cart_product_section;
