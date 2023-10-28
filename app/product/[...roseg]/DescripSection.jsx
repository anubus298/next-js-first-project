import StarComp from "../../(homePage)/(products section)/StarComp"
import AddToMyCart from "./AddToMyCart";
function DescripSection({ rating, name, description, price, totalRated }) {
  const reg = /\n/;
  return (
    <div className="md:w-1/2 flex flex-col gap-y-10">
      <div>
        <p className="text-lg font-semibold">{name}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-y-5">
          <div className="flex items-end gap-x-2 select-none">
            <StarComp count={rating} size={20} readonly={true} />
            <p className="inline text-sm text-gray-400">
              ({totalRated} users )
            </p>
          </div>
          <p className="text-secondary text-2xl font-bold select-none">
            ${price}
            <span className=" text-xs font-normal">(including VAT)</span>
          </p>
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold mb-5">Product Details :</p>
        <ul className="list-disc">
          {description
            .split(reg)
            .slice(1, description.split(reg).length - 1)
            .map((i, j) => (
              <li className=" text-sm my-2 text-gray-800" key={j * 542}>
                {i}
              </li>
            ))}
        </ul>
      </div>
      <AddToMyCart price={price} />

    </div>
  );
}

export default DescripSection;
