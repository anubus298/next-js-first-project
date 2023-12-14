"use client";
function Counter({ i, arrayOfproductCounts, setarrayOfproductCounts }) {
  return (
    <div className="flex justify-center w-full ">
      <div className="flex flex-col md:flex-row">
        <div
          className="p-1 bg-white cursor-pointer md:p-2 text-main"
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
        <div className="w-10 p-1 text-center text-white md:p-2 bg-main">
          {arrayOfproductCounts[i]}
        </div>
        <div
          className="p-1 bg-white cursor-pointer md:p-2 text-main hover:outline-2 outline-black"
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
