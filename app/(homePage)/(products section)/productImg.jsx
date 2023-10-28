"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ProductImg({ name,width,height, src, clickable, id, type ,fill}) {
  const router = useRouter();

  return (
    <Image
      className={clickable && "cursor-pointer"}
      onClick={() => clickable && router.push(`/product/${type}/${id}`)}
      alt={name}
      fill={fill}
      sizes={!fill && "(max-width: 768px) 100vw 700px"}
      width={!fill && width}
      height={!fill && height}
      src={src}
    />
  );
}

export default ProductImg;
