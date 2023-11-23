"use client";

import Image from "next/image";
import Link from "next/link";
function StepTwo({ data }) {
  return (
    <div className="w-full h-[450px] bg-secondarySecondarylight p-4 font-semibold mt-5 flex basis-1/2">
      <div className=" overflow-y-auto">
        {data.products.map((product, index) => {
          return (
            <div
              key={(index + index * 0.32543) * 10}
              className="flex md:flex-row flex-col items-center space-x-5 h-[90px] overflow-auto sm:overflow-hidden"
            >
              <div className="h-full flex items-center">
                <Image
                  src={`http://127.0.0.1:8090/api/files/${product.collectionId}/${product.id}/${product.imgs[0]}`}
                  alt=""
                  height={70}
                  width={50}
                  className="w-auto h-auto cursor-pointer"
                  onClick={() =>
                    router.push("/product" + "/" + "/" + product.id)
                  }
                />
              </div>
              <Link
                className="text-lg font-bold"
                href={"/product" + "/" + "/" + product.id}
              >
                {product.name}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="">
        <p>hello brother</p>
      </div>
    </div>
  );
}

export default StepTwo;
