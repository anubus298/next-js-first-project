import ProductDescription from "./productdescription";
import ProductImg from "./productImg";
import BrandImg from "./brandImg";
import StarComp from "./StarComp";
function ProductCard({ item, type }) {
  const reg = /[,|]/;

  return (
    <div className="flex justify-center h-[380px] select-none w-11/12 md:w-auto rounded-lg md:rounded-none">
      <div className="w-full mx-5 sm:mx-0 sm:w-[300px] bg-secondarySecondarylight  h-full rounded-lg p-5">
        <div className="flex justify-center h-[180px] relative">
          <ProductImg
            fill={type != "mobiles" && true}
            id={item.id}
            type={type}
            clickable={true}
            height={280}
            name={item.name.split(" ", 2).join(" ")}
            src={`${process.env.pocketBaseUrl}api/files/${item.collectionId}/${item.id}/${item.imgs[0]}?thumb=Wx0`}
          />
        </div>
        <div className="h-[0.5px] bg-gray-300 w-full  "></div>
        <div className="h-[100px] overflow-hidden flex items-center justify-center text-center ">
          <ProductDescription
            text={item.name.split(reg, 3).join(",")}
            type={type}
            classes={"transition"}
            id={item.id}
          />
        </div>

        <div className="h-[30px] flex justify-center relative ">
          {item.expand && (
            <BrandImg
              name={item.expand?.brand.name}
              src={`${process.env.pocketBaseUrl}api/files/${item.expand?.brand.collectionId}/${item.expand?.brand.id}/${item.expand?.brand.img}?thumb=0x30`}
            />
          )}
        </div>
        <div className="flex justify-evenly items-center mt-auto">
          <ProductDescription
            classes="text-indigo-950 text-2xl "
            add="$"
            text={item.price}
            type={type}
            id={item.id}
          />
          <StarComp count={item.rating} size={15} readonly={true} />
          <p className="text-indigo-950 text-xs font-semibold">({item.totalRated} user)</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
