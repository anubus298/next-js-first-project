"use client";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "public/swiper.css";
import Image from "next/image";

import { Suspense, useEffect, useRef, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useRouter } from "next/navigation";
function Home_slider() {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [width, setwidth] = useState();
  useEffect(() => {
    setwidth(document.documentElement.clientWidth);
  }, []);
  return (
    <div
      ref={swiperRef}
      className="w-full mb-4  select-none h-fit overflow-hidden"
    >
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
          modules={[Navigation, Autoplay]}
          navigation={width > 768}
          slidesPerView={1}
          grabCursor={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          className="relative"
        >
          <SwiperSlide>
            <Image
              alt="ll"
              width={1280}
              height={500}
              src={`/sliders/3${width < 768 ? "_small" : ""}.png`}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="ll"
              width={1280}
              height={500}
              src={`/sliders/4${width < 768 ? "_small" : ""}.png`}
              className="cursor-pointer"
              onClick={() => router.push("/product/mobiles/59kkyk5iv6d61wz")}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="ll"
              width={1280}
              height={500}
              src={`/sliders/5${width < 768 ? "_small" : ""}.png`}
              className="cursor-pointer"
              onClick={() => router.push("/product/mobiles/59kkyk5iv6d61wz")}
            />
          </SwiperSlide>
        </Swiper>
      </Suspense>
    </div>
  );
}

export default Home_slider;
