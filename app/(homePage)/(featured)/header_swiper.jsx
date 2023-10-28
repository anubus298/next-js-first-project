"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-cards";
import "public/swiper.css";
function Header_swiper(props) {
  let vv = "fff";
  vv.toUpperCase;

  return (
    <div className="">
      <div className="w-full p-2 flex justify-center bg-main text-white text-lg tracking-widest font-bold rounded-t-lg"></div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className=" h-[250px] w-[200px] md:h-[400px] md:w-[300px]"
      >
        {props.products.map((product, index) => {
          return (
            <SwiperSlide
              key={product.id}
              className={` overflow-hidden z-[${
                10 - index
              }] rounded-b-lg cursor-pointer hover:brightness-90 force-flex flex-col  p-1 items-center `}
            >
              <div className="flex items-center bg-white h-5/6">
                <Image
                  src={`http://127.0.0.1:8090/api/files/${product.collectionId}/${product.id}/${product.mainImg}?thumb=300x300`}
                  alt="SafoMart"
                  width={300}
                  height={300}
                />
              </div>
              <div
                className="bg-main text-secondarySecondarylight rounded-b-lg  p-5 w-full h-1/6
             flex flex-col justify-center text-center "
              >
                <p className="tracking-widest font-bolder text-sm sm:text-lg">
                  {product.productName}
                </p>
                <p className="text-sm tracking-wider text-secondary ">
                  {product.price}$
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Header_swiper;
