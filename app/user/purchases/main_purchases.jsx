"use client";
import Empty_purchases from "./empty_purchases";
import Bill_card from "./bill_card";
function Main_purchases({ purchases }) {
  return (
    <div className="w-full bg-secondarySecondarylight md:w-10/12 md:ps-5">
      <div className="flex flex-col items-center justify-center w-full mt-5 gap-y-6 md:mt-0 md:flex-row md:justify-between">
        <div className="w-full py-2 text-center text-white bg-main md:bg-transparent md:text-main md:py-0">
          <p className="pt-2 text-5xl font-semibold md:text-4xl md:text-start md:bg-transparent">
            Purchases
          </p>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-x-2 gap-y-6 py-2 md:my-10 h-[75vh] overflow-y-auto justify-evenly bg-gray-200">
        {purchases.map((item, index) => {
          return <Bill_card item={item} key={index * 112 + index + 45} />;
        })}
        {purchases.length == 0 && <Empty_purchases />}
      </div>
    </div>
  );
}

export default Main_purchases;
