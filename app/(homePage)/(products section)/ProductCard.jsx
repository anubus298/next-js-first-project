import ProductDescription from "./productdescription";
import ProductImg from "./productImg";
import BrandImg from "./brandImg";
import StarComp from "./StarComp";
import { useEffect, useState } from "react";
function ProductCard({ item, type }) {
  const reg = /[,|]/;
  const [isMobileScreen, setisMobileScreen] = useState(false);

  useEffect(() => {
    if (document.documentElement.clientWidth < 768) {
      setisMobileScreen(true);
    }
  }, []);

  return (
    <div className="flex justify-center h-[220px] md:h-[380px] select-none w-11/12 md:w-auto rounded-lg md:rounded-none">
      <div className="w-full sm:mx-0 sm:w-[300px] bg-secondarySecondarylight  h-full rounded-lg pt-2 p-1 md:p-5">
        <div className="flex justify-center h-[80px] md:h-[180px] relative">
          <ProductImg
            fill={type != "mobiles" && true}
            id={item.id}
            type={type}
            clickable={true}
            height={isMobileScreen ? 40 : 280}
            width={isMobileScreen ? 40 : 280}
            name={item.name.split(" ", 2).join(" ")}
            src={`${process.env.pocketBaseUrl}api/files/${item.collectionId}/${item.id}/${item.imgs[0]}?thumb=Wx0`}
          />
        </div>
        <div className="h-[0.5px] bg-gray-300 w-full  "></div>
        <div className="h-[70px] md:h-[100px] overflow-hidden flex items-center justify-center text-center ">
          <ProductDescription
            text={item.name.split(reg, 3).join(",")}
            type={type}
            sale={0}
            classes={""}
            id={item.id}
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <div className="h-[15px] md:h-[30px]  ">
            {item.expand && (
              <BrandImg
                height={isMobileScreen ? 20 : 30}
                width={isMobileScreen ? 20 : 30}
                name={item.expand?.brand.name}
                src={`${process.env.pocketBaseUrl}api/files/${item.expand?.brand.collectionId}/${item.expand?.brand.id}/${item.expand?.brand.img}?thumb=0x30`}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center mt-1 md:mt-auto justify-evenly md:flex-row">
          <ProductDescription
            classes="text-indigo-950 text-2xl "
            add="$"
            text={parseFloat(item.price).toFixed(2)}
            sale={item.sale}
            type={type}
            id={item.id}
          />
          <div className="flex flex-row items-center md:flex-col">
            <StarComp
              count={item.rating}
              size={isMobileScreen ? 10 : 15}
              readonly={true}
            />
            <p className="text-xxs md:text-xs text-indigo-950">
              ({item.totalRated} {!isMobileScreen ? "user" : ""})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
