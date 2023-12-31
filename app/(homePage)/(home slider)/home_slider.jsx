"use client";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

import { Suspense, useEffect, useRef, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import SkeletonImage from "antd/es/skeleton/Image";
function Home_slider() {
  const swiperRef = useRef(null);
  const [domloaded, setdomloaded] = useState(false);
  const [width, setwidth] = useState();
  useEffect(() => {
    setwidth(document.documentElement.clientWidth);
    setdomloaded(true);
  }, []);
  return (
    <div ref={swiperRef} className="w-full overflow-hidden select-none h-fit">
      <Suspense
        fallback={
          <div className="w-full h-full">
            <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        }
      >
        <Swiper
          modules={[Autoplay, EffectFade]}
          slidesPerView={1}
          effect="fade"
          grabCursor={false}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          className="relative"
        >
          <SwiperSlide>
            {domloaded ? (
              <div className="flex justify-center">
                <Image
                  alt="laptop sale 30%"
                  quality={100}
                  width={1280}
                  height={500}
                  src={`/sliders/3${width < 768 ? "_small" : ""}.png`}
                />
              </div>
            ) : (
              <div className="w-full h-[40vh] md:h-[500px] flex justify-center items-center">
                <SkeletonImage />
              </div>
            )}
          </SwiperSlide>
          <SwiperSlide>
            {domloaded ? (
              <div className="flex justify-center">
                <Image
                  alt="laptop sale 30%"
                  quality={100}
                  width={1280}
                  height={500}
                  src={`/sliders/4${width < 768 ? "_small" : ""}.png`}
                />
              </div>
            ) : (
              <div className="w-full h-[40vh] md:h-[500px] flex justify-center items-center">
                <SkeletonImage />
              </div>
            )}
          </SwiperSlide>
          <SwiperSlide>
            {domloaded ? (
              <div className="flex justify-center">
                <Image
                  alt="laptop sale 30%"
                  quality={100}
                  width={1280}
                  height={500}
                  src={`/sliders/5${width < 768 ? "_small" : ""}.png`}
                />
              </div>
            ) : (
              <div className="w-full h-[40vh] md:h-[500px] flex justify-center items-center">
                <SkeletonImage />
              </div>
            )}
          </SwiperSlide>
        </Swiper>
      </Suspense>
    </div>
  );
}

export default Home_slider;
