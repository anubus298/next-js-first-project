"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ProductImg({ name, width, height, src, clickable, id, type, fill }) {
  const router = useRouter();

  return (
    
    <Image
      className={clickable && "cursor-pointer h-auto w-auto"}
      onClick={() => clickable && router.push(`/product/${type}/${id}`)}
      alt={name}
      height={180}
      width={180}
      sizes={"(max-width: 768px) 150px ,(max-width: 1000px) 200px,280px"}
      src={src}
    />
  );
}

export default ProductImg;
