import Link from "next/link";
import { useRouter } from "next/navigation";

function ProductDescription({ text, classes, id, add, type, sale }) {
  return (
    <>
      {sale == 0 && (
        <Link
          href={`/product/${type}/${id}`}
          className={`cursor-pointer text-xs md:text-lg font-semibold hover:text-secondary  ${classes} `}
        >
          {add ? add + text : text}
        </Link>
      )}
      {sale != undefined && sale != 0 && (
        <div className="flex flex-row text-xs md:flex-col md:text-base">
          <Link
            href={`/product/${type}/${id}`}
            className={`cursor-pointer font-semibold text-gray-600 line-through decoration-black   text-xs md:text-sm`}
          >
            {"$" + text}
          </Link>
          <Link
            href={`/product/${type}/${id}`}
            className={`cursor-pointer text-xs md:text-base font-semibold   ${classes} `}
          >
            <span className="text-green-600">
              {add
                ? add + (text - text * sale).toFixed(2)
                : text - (text * sale).toFixed(2)}
            </span>
          </Link>
        </div>
      )}
    </>
  );
}

export default ProductDescription;
