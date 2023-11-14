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
  const reg = /\n/;
  return (
    <div className="md:w-1/2 flex flex-col gap-y-10">
      <div>
        <p className="text-2xl sm:text-3xl font-semibold">{name}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between gap-x-5 items-center">
          <p className="text-secondary text-4xl font-bold select-none">
            ${price}
            <span className=" text-xs font-normal">(including VAT)</span>
          </p>
          <div className="flex items-end gap-x-2 select-none">
            <StarComp count={rating} size={20} readonly={true} />
            <p className="inline text-sm text-gray-400">
              ({totalRated} users )
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold mb-5">Product Details :</p>
        <ul className="list-disc">
          {description &&
            description
              .split(reg)
              .slice(1, description.split(reg).length - 1)
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
