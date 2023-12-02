"use client";

import StarComp from "../../(homePage)/(products section)/StarComp";
import AddToMyCart from "./AddToMyCart";
import AddToMyFavorite from "./AddToMyFavorite";

function DescripSection({
  rating,
  name,
  description,
  alreadyForCart,
  alreadyForFavorite,
  price,
  totalRated,
  collectionName,
  id,
}) {
  return (
    <div className="md:w-1/2 flex flex-col gap-y-10">
      <div className=" flex gap-x-4 items flex-col ">
        <p className="text-secondaryGreen text-xl font-black">In stock</p>
        <p className="text-2xl sm:text-3xl font-black">{name}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between gap-x-5 items-center">
          <p className="text-secondary text-4xl font-black select-none">
            ${price}
            <span className="block md:inline text-xs ">(including VAT)</span>
          </p>
          <div className="flex items-end gap-x-2 select-none">
            <StarComp count={rating} size={20} readonly={true} />
            <p className="block md:inline text-sm text-gray-400">
              ({totalRated} users )
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-lg font-black mb-5">Product Details :</p>
        <ul className="list-disc min-h-[300px] font-semibold">
          {description &&
            description
              .split(/\n/)
              .slice(1, description.split(/\n/).length - 1)
              .map((i, j) => (
                <li className=" text-sm my-2 text-gray-800" key={j * 542}>
                  {i}
                </li>
              ))}
        </ul>
      </div>

      <div className="flex space-x-1">
        <AddToMyFavorite
          already={alreadyForFavorite}
          collectionName={collectionName}
          id={id}
        />
        <AddToMyCart
          already={alreadyForCart}
          collectionName={collectionName}
          id={id}
        />
      </div>
    </div>
  );
}

export default DescripSection;
