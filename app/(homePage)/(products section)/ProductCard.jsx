import Image from "next/image";
import ProductDescription from "./productdescription";
import ProductImg from "./productImg";
import StarComp from "./StarComp";
function ProductCard({ item, type }) {
  let wdth = 0;
  let wdth5 = 0;
  const reg = /[,|]/;
  if (item.expand?.brand) {
    wdth = 30;
    if (item.expand?.brand.brandName == "lenovo") wdth = 120;
    if (item.expand?.brand.brandName == "acer") wdth = 50;
    if (item.expand?.brand.brandName == "honor") wdth = 70;
    if (item.expand?.brand.brandName == "samsung") wdth = 53;
    if (item.expand?.brand.brandName == "asus") wdth = 65;
    if (item.expand?.brand.brandName == "oppo") wdth = 65;
    if (item.expand?.brand.brandName == "lg") wdth = 70;
    if (item.expand?.brand.brandName == "nokia") wdth = 90;
  }
  type == "mobiles" ? (wdth5 = 150) : (wdth5 = 250);

  return (
    <div className="flex justify-center h-[380px] select-none">
      <div className=" sm:w-[300px] bg-secondarySecondarylight  h-full md:rounded-lg p-5">
        <div className="flex justify-center h-[180px] relative">
          <ProductImg
            width={wdth5}
            fill={type != "mobiles" && true}
            id={item.id}
            type={type}
            clickable={true}
            height={280}
            name={item.name.split(" ", 2).join(" ")}
            src={`http://127.0.0.1:8090/api/files/${item.collectionId}/${item.id}/${item.imgs[0]}?thumb=Wx0`}
          />
        </div>
        <div className="h-[0.5px] bg-black w-full  "></div>
        <div className="h-[100px] overflow-hidden flex items-center justify-center text-center ">
          <ProductDescription
            text={item.name.split(reg, 3).join(",") }
            type={type}
            classes={"transition"}
            id={item.id}
          />
        </div>
        {item.expand && (
          <div className="h-[30px] flex justify-center ">
            <ProductImg
              width={wdth}
              height={250}
              name={""}
              src={`http://127.0.0.1:8090/api/files/${item.expand?.brand.collectionId}/${item.expand?.brand.id}/${item.expand?.brand.img}?thumb=0x30`}
            />
          </div>
        )}
        <div className="flex justify-evenly items-center mt-auto">
          <ProductDescription
            classes="text-secondary text-2xl "
            add="$"
            text={item.price}
            type={type}
            id={item.id}
          />
          <StarComp count={item.rating} size={15} readonly={true} />
          <p className="text-secondary text-xs">({item.totalRated} user)</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
