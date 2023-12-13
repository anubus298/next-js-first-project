export const fetchCache = "default-cache";
import ProductSection from "./(homePage)/(products section)/productSection";
import Featured from "./(homePage)/(featured)/featured";
import Newsletter_main from "./(homePage)/(newsletter)/Newsletter_main";
import Home_slider from "./(homePage)/(home slider)/home_slider";
import "swiper/css";
import "swiper/css/navigation";
import "public/swiper.css";
import 'swiper/css/effect-fade';
export default function Page() {
  return (
    <div className="w-full bg-secondarySecondary">
      <Home_slider />
      <Featured />
      <ProductSection
        showHeader={true}
        cache={true}
        count={16}
        type={"laptops"}
      />
      <ProductSection
        showHeader={true}
        cache={true}
        count={16}
        type={"mobiles"}
      />
      <ProductSection showHeader={true} cache={true} count={16} type={"tvs"} />
      <ProductSection
        showHeader={true}
        cache={true}
        count={16}
        type={"tablets"}
      />
      <Newsletter_main />
    </div>
  );
}
