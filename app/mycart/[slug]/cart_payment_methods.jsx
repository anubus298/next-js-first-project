import Image from "next/image";

function Cart_payment_methods() {
    return ( <div className="bg-main h-fit w-full py-6  px-8 md:px-2 text-white flex flex-col items-center gap-y-5 select-none">
    <p className="text-lg font-bold">Payment methods </p>
    <div className="flex items-center gap-x-2 flex-wrap">
      <Image height={50} width={50} src="/paymethods/1.webp" alt="1" />
      <div className="bg-white rounded-lg">
        <Image
          height={50}
          width={50}
          src="/paymethods/2.webp"
          alt="2"
        />
      </div>
      <Image
        height={50}
        width={50}
        className="rounded-sm"
        src="/paymethods/3.webp"
        alt="3"
      />
      <Image height={50} width={50} src="/paymethods/4.webp" alt="4" />
    </div>
  </div> );
}

export default Cart_payment_methods;