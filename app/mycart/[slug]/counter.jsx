"use client";
function Counter({
  i,
  arrayOfproductCounts,
  setarrayOfproductCounts,
}) {
  return (
    <div className="w-full flex justify-center  ">
      <div className=" flex   ">
        <div
          className=" bg-white text-main p-2 cursor-pointer"
          onClick={() => {
            if (arrayOfproductCounts[i] > 1) {
              let buz = [...arrayOfproductCounts];
              buz[i] -= 1;
              setarrayOfproductCounts(buz);
            }
          }}
        >
          -
        </div>
        <div className=" bg-main text-white p-2 w-10 text-center ">
          {arrayOfproductCounts[i]}
        </div>
        <div
          className=" bg-white text-main p-2 cursor-pointer hover:outline-2 outline-black"
          onClick={() => {
            if (arrayOfproductCounts[i] <= 15) {
              let buz = [...arrayOfproductCounts];
              buz[i] += 1;
              setarrayOfproductCounts(buz);
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
