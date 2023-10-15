import { useRouter } from "next/navigation";

function ProductDescription({ text, classes, id ,add,type}) {
  const router = useRouter();
  return (
    <p
      onClick={() => router.push(`/product/${type}/${id}`)}
      className={`cursor-pointer md:text-lg font-semibold hover:text-secondary  ${classes} ` }
    >
      {add ? add + text : text}
    </p>
  );
}

export default ProductDescription;
