import { useRouter } from "next/navigation";

function ProductDescription({ text, classes, id, add, type, sale }) {
  const router = useRouter();
  return (
    <>
      {sale == 0 && (
        <p
          onClick={() => router.push(`/product/${type}/${id}`)}
          className={`cursor-pointer text-lg font-semibold hover:text-secondary  ${classes} `}
        >
          {add ? add + text : text}
        </p>
      )}
      {sale != undefined && sale != 0 && (
        <div className="flex flex-col text-base">
          <p
            onClick={() => router.push(`/product/${type}/${id}`)}
            className={`cursor-pointer font-semibold text-gray-600 line-through decoration-black   text-sm`}
          >
            {"$" + text}
          </p>
          <p
            onClick={() => router.push(`/product/${type}/${id}`)}
            className={`cursor-pointer text-base font-semibold   ${classes} `}
          >
            <span className="text-green-600">
              {add ? add + (text - text * sale) : text - text * sale}
            </span>
          </p>
        </div>
      )}
    </>
  );
}

export default ProductDescription;
