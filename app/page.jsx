import FooterComp from "./(footer)/footer";
import ProductSection from "./(homePage)/(products section)/productSection";
import Featured from "./(homePage)/(featured)/featured";
import Home_slider from "./(homePage)/(home slider)/home_slider"
export default function Page() {
  return (
    <div className="w-full bg-secondarySecondary">
      <Home_slider/>
      <Featured />
      <ProductSection type={'laptops'}/>
      <ProductSection type={'mobiles'}/>
      <ProductSection type={'tvs'}/>
      <ProductSection type={'tablets'}/>
      <FooterComp/>
    </div>
  );
}
