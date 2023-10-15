export const fetchCache = "force-no-store";
import BackComp from "./back";
import Cart_order_summary from "./cart_order_summary";
import Cart_payment_methods from "./cart_payment_methods";
import Cart_product_section from "./cart_product_section";
import PocketBase from "pocketbase";

async function Page() {
  
  return (
    <>
      <BackComp />
      <div className="w-full bg-secondarySecondarylight md:px-8 flex md:flex-row flex-col ">
        <Cart_product_section  />
        <div className="flex gap-y-5 flex-col items-center  w-full md:w-1/5">
          <Cart_order_summary />
          <Cart_payment_methods />
        </div>
      </div>
    </>
  );
}

export default Page;
