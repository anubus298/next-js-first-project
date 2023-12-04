"use client";
import Empty_purchases from "./empty_purchases";
import Bill_card from "./bill_card";
function Main_purchases({ purchases }) {
  return (
    <div className="bg-secondarySecondarylight w-full md:w-10/12 ps-5">
      <div className="w-full gap-y-6 flex flex-col mt-5 md:mt-0 md:flex-row justify-center items-center md:justify-between">
        <div className="md:w-full">
          <p className="text-5xl md:text-4xl font-semibold  md:text-start bg-white md:bg-transparent pt-2">
            Purchases
          </p>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-x-2 gap-y-6 py-10 h-[75vh] overflow-y-auto justify-evenly">
        {purchases.map((item, index) => {
          return <Bill_card item={item} key={index * 112 + index + 45} />;
        })}
        {purchases.length == 0 && <Empty_purchases />}
      </div>
    </div>
  );
}

export default Main_purchases;
