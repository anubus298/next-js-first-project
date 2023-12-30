"use client";

import StarComp from "../../(homePage)/(products section)/StarComp";
import AddToMyCart from "./AddToMyCart";
import AddToMyFavorite from "./AddToMyFavorite";
import ShareButton from "./ShareButton";
function DescripSection({
  rating,
  name,
  description,
  alreadyForCart,
  alreadyForFavorite,
  price,
  totalRated,
  sale,
  collectionName,
  imgs,
  id,
}) {
  return (
    <div className="flex flex-col md:w-1/2 gap-y-10">
      <div className="flex flex-col gap-x-4 items">
        <p className="text-xl font-black text-secondaryGreen">
          In stock{" "}
          {sale != 0 && (
            <span className="p-1 mx-2 text-sm rounded-lg bg-secondary text-textWhiteWithSecondary">
              {sale * 100}% OFF
            </span>
          )}
        </p>
        <p className="text-2xl font-black sm:text-3xl">{name}</p>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full gap-x-5">
          <div className="flex flex-col">
            {sale != 0 && (
              <>
                <p className="text-3xl font-semibold text-gray-500 line-through select-none decoration-black">
                  ${parseFloat( price).toFixed(2)}
                </p>
                <p className="text-4xl font-semibold text-green-600 select-none">
                  ${parseFloat( price).toFixed(2) - parseFloat( price).toFixed(2) * sale}
                  <span className="block text-xs md:inline ">
                    (including VAT)
                  </span>
                </p>
              </>
            )}
            {sale == 0 && (
              <p className="text-4xl font-semibold select-none text-indigo-950">
                ${parseFloat( price).toFixed(2)}
                <span className="block text-xs md:inline ">
                  (including VAT)
                </span>
              </p>
            )}
          </div>

          <div className="flex flex-col items-end select-none md:flex-row gap-x-2">
            <StarComp count={rating} size={20} readonly={true} />
            <p className="block text-sm text-gray-400 md:inline">
              ({totalRated} users )
            </p>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-5 text-lg font-black">Product Details :</p>
        <ul className="list-disc min-h-[300px] font-medium">
          {description && (
            <div className="max-h-[50vh] overflow-y-auto">
              {description
                .split(/\n/)
                .slice(1, description.split(/\n/).length - 1)
                .map((i, j) => (
                  <li className="my-2 text-sm text-gray-800 " key={j * 542}>
                    {i}
                  </li>
                ))}
            </div>
          )}
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
        <ShareButton cId={collectionName} url={imgs[0]} id={id} name={name} />
      </div>
    </div>
  );
}

export default DescripSection;
