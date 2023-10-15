"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ProductImg({ name,width,height, src, clickable, id, type }) {
  const router = useRouter();

  return (
    <Image
      className={clickable && "cursor-pointer"}
      onClick={() => clickable && router.push(`/product/${type}/${id}`)}
      alt={name}
      width={width}
      height={height}
      src={src}
    />
  );
}

export default ProductImg;
