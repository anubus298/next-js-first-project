"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
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
      <div className="flex justify-center w-full p-2 text-lg font-bold tracking-widest rounded-t-lg bg-main text-secondary md:shadow-md">
        {props.type[0].toUpperCase() + props.type.slice(1, props.type.length)}
      </div>
      <Suspense fallback={<Fallback_header_swiper />}>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          className=" h-[350px] w-[300px] md:h-[400px] md:w-[300px]"
        >
          {props.products &&
            props.products.map((product, index) => {
              return (
                <SwiperSlide
                  key={product.id + index + 13}
                  className={` overflow-hidden z-[${
                    10 - index
                  }] rounded-b-lg cursor-pointer hover:brightness-95 force-flex flex-col  p-1 items-center font-lato`}
                >
                  <div className="flex items-center justify-center w-full bg-white h-5/6">
                    <Image
                      src={`${process.env.pocketBaseUrl}api/files/${product.collectionId}/${product.id}/${product?.imgs[0]}?thumb=300x300`}
                      alt="SafoMart"
                      onClick={() =>
                        router.push(`/product/${props.type}/${product?.id}?q=1`)
                      }
                      sizes={
                        "(max-width: 768px) 150px ,(max-width: 1000px) 200px,300px"
                      }
                      className="h-auto cursor-pointer"
                      width={200}
                      height={200}
                    />
                  </div>
                  <Link
                    href={`/product/${props.type}/${product?.id}?q=1`}
                    className="flex flex-col justify-center w-full p-5 text-center rounded-b-lg bg-main text-secondarySecondarylight h-1/6"
                  >
                    <p className="font-semibold sm:text-md">{product.name}</p>
                    <p className="text-xs font-semibold tracking-wider">
                      <span className="mx-1 font-medium text-gray-400 line-through">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                      <span className="mx-1 text-secondaryGreen">
                        $
                        {parseFloat(product.price).toFixed(2) -
                          parseFloat(product.price).toFixed(2) *
                            product.sale}{" "}
                        <span className="text-secondaryYellow">
                          {product.sale * 100}%
                        </span>
                      </span>
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
