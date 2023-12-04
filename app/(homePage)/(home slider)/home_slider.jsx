"use client";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "public/swiper.css";
import Home_slider_iphone_15 from "./sliders/home_slider_iphone_15";
import Sliders_galaxy_s23 from "./sliders/sliders_galaxy_s23";
import Sliders_surface_14 from "./sliders/sliders_surface_14";
import { Suspense } from "react";
import { ColorRing } from "react-loader-spinner";
function Home_slider() {
  return (
    <div className="w-full mb-4 select-none h-fit overflow-hidden">
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
          navigation={true}
          slidesPerView={1}
          grabCursor={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
        >
          <SwiperSlide>
            <Sliders_galaxy_s23 />
          </SwiperSlide>
          <SwiperSlide>
            <Home_slider_iphone_15 />
          </SwiperSlide>
        </Swiper>
      </Suspense>
    </div>
  );
}

export default Home_slider;
