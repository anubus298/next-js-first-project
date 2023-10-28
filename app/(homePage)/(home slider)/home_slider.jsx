"use client";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "public/swiper.css";
import Home_slider_iphone_15 from "../(iphone 15 pro)/home_slider_iphone_15";
import Sliders_galaxy_s23 from "./sliders/sliders_galaxy_s23"
import Sliders_surface_14 from "./sliders/sliders_surface_14"
function Home_slider() {
  return (
    <div className="w-full mb-16 select-none">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={true}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        <SwiperSlide>
         <Sliders_galaxy_s23/>
        </SwiperSlide>
        <SwiperSlide>
          <Home_slider_iphone_15 />
        </SwiperSlide>
        <SwiperSlide>
            <Sliders_surface_14/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Home_slider;
