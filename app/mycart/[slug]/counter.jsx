"use client";
function Counter({
  quantity,
  setquantity,
  setsign,
  sign,
}) {
  return (
    <div className="w-full flex justify-center  ">
    <div className=" flex   ">
      <div
        className=" bg-white text-main p-2 cursor-pointer"
        onClick={() => {
          if (quantity > 1) {
            setquantity(quantity - 1);
            sign == 1 && setsign(-1);
          }
        }}
      >
        -
      </div>
      <div className=" bg-main text-white p-2 w-10 text-center ">
        {quantity}
      </div>
      <div
        className=" bg-white text-main p-2 cursor-pointer hover:outline-2 outline-black"
        onClick={() => {
          if (quantity <= 15) {
            setquantity(quantity + 1);
            sign == -1 && setsign(1);
          }
        }}
      >
        +
      </div>
    </div>
    </div>
  );
}

export default Counter;
