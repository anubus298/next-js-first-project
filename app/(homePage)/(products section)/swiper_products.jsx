"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

function SwiperProducts(props) {
  const [swiperPerview, setSwiperPerview] = useState(4);
  useEffect(() => {
    if (document.documentElement.clientWidth < 1024) {
      setSwiperPerview(3);
    }
    if (document.documentElement.clientWidth < 768) {
      setSwiperPerview(2);
    }
  }, []);
  return (
    <div className="text-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        className=""
        slidesPerView={swiperPerview}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        {props.data.items.map((item) => {
          return (
            <SwiperSlide className="flex justify-center " key={item.id}>
              <ProductCard item={item} type={props.type} />;
            </SwiperSlide>
          );
        })}
        ;
      </Swiper>
    </div>
  );
}

export default SwiperProducts;
