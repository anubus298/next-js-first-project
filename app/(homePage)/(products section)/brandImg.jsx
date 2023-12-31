"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
function BrandImg({ name, src, clickable, id, type, width, height }) {
  const router = useRouter();
  return (
    <Image
      className={(clickable && "cursor-pointer") + "w-auto h-auto"}
      onClick={() => clickable && router.push(`/product/${type}/${id}`)}
      alt={name}
      sizes={"80px"}
      width={width}
      height={height}
      src={src}
    />
  );
}

export default BrandImg;
