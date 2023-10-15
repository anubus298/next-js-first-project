import FooterComp from "./(footer)/footer";
import ProductSection from "./(homePage)/(products section)/productSection";
import Header_homePage from "./(homePage)/(section 1)/header_homePage";
import Center_homePage from "./(homePage)/(iphone 15 pro)/center_homePage";

export default function Page() {
  return (
    <div className="w-full bg-secondarySecondary">
      <Header_homePage />
      <Center_homePage/>
      <ProductSection type={'laptops'}/>
      <ProductSection type={'mobiles'}/>
      <ProductSection type={'tvs'}/>
      <ProductSection type={'tablets'}/>
      <FooterComp/>
    </div>
  );
}
