"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import Fallback_header_swiper from "./(fallback)/Fallback_header_swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import "public/swiper.css";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Header_swiper(props) {
  const router = useRouter();
  return (
    <div className="">
      <div className="w-full p-2 flex justify-center bg-main text-white text-lg tracking-widest font-bold rounded-t-lg md:shadow-md"></div>
      <Suspense fallback={<Fallback_header_swiper />}>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className=" h-[350px] w-[300px] md:h-[400px] md:w-[300px]"
        >
          {props.products.map((product, index) => {
            return (
              <SwiperSlide
                key={product.id + index + 13}
                className={` overflow-hidden z-[${
                  10 - index
                }] rounded-b-lg cursor-pointer hover:brightness-95 force-flex flex-col  p-1 items-center font-lato`}
              >
                <div className="flex items-center bg-white h-5/6">
                  <Image
                    src={`${process.env.pocketBaseUrl}api/files/${product.collectionId}/${product.id}/${product.mainImg}?thumb=300x300`}
                    alt="SafoMart"
                    onClick={() =>
                      router.push(
                        `/product/${props.type}s/${product?.Corresponding_id}?q=1`
                      )
                    }
                    sizes={
                      "(max-width: 768px) 150px ,(max-width: 1000px) 200px,300px"
                    }
                    className="cursor-pointer"
                    width={300}
                    height={300}
                  />
                </div>
                <Link
                  href={`/product/${props.type}s/${product?.Corresponding_id}?q=1`}
                  className="bg-main text-secondarySecondarylight rounded-b-lg  p-5 w-full h-1/6
             flex flex-col justify-center text-center "
                >
                  <p className="tracking-widest text-sm sm:text-lg font-semibold">
                    {product.productName}
                  </p>
                  <p className=" tracking-wider text-secondary font-semibold">
                    ${product.price}
                  </p>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Suspense>
    </div>
  );
}

export default Header_swiper;
