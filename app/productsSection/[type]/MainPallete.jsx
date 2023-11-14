"use client";
import { Rate } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FilterPallete from "./FilterPallete";
function MainPallete({ data, typeForHref }) {
  const router = useRouter();

  return (
    <div className="rounded-lg">
      <div className="filterpallete p-1 md:p-4 rounded-t-md h-14 border-[.5px] border-secondarySecondarylight">
        <FilterPallete data={data} />
      </div>
      <div className=" p-1 md:p-4 rounded-b-md bg-secondarySecondarylight h-full flex justify-evenly md:justify-normal gap-y-4 md:gap-x-6 md:gap-y-8 flex-wrap">
        {data.map((product) => {
          return (
            <Card
              key={product.id}
              bordered={true}
              className="w-44 md:w-56 h-72 py-2 md:py-4 hover:shadow-lg"
              cover={
                <Image
                  alt="ss"
                  className="h-[150px] w-auto mx-auto cursor-pointer"
                  src={`http://127.0.0.1:8090/api/files/${product.collectionId}/${product.id}/${product.imgs[0]}`}
                  height={150}
                  width={150}
                  onClick={() =>
                    router.push(`/product/${typeForHref}/${product.id}`)
                  }
                />
              }
            >
              <Meta
                title={
                  <CardTitle
                    collectionId={product.expand?.brand.collectionId}
                    img={product.expand?.brand.img}
                    brandId={product.expand?.brand.id}
                    id={product.id}
                    name={product.name}
                    typeForHref={typeForHref}
                  />
                }
                description={
                  <CardDescription
                    price={product.price}
                    rating={product.rating}
                    id={product.id}
                    totalRated={product.totalRated}
                    typeForHref={typeForHref}
                  />
                }
              ></Meta>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function CardTitle({ collectionId, img, id, brandId, name, typeForHref }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-[30px] flex items-center justify-center">
        {brandId && (
          <Image
            width={30}
            alt="brandName"
            className=""
            height={30}
            src={`http://127.0.0.1:8090/api/files/${collectionId}/${brandId}/${img}?thumb=0x30`}
          />
        )}
      </div>
      <a href={`/product/${typeForHref}/${id}`}>
        <h4>{name}</h4>
      </a>
    </div>
  );
}
function CardDescription({ price, rating, id, typeForHref }) {
  return (
    <div className="flex items-center justify-evenly">
      <a
        href={`/product/${typeForHref}/${id}`}
        className="text-secondary font-bold text-lg"
      >
        ${price}
      </a>
      <Rate className="text-xs gap-x-2 " defaultValue={rating} disabled />
    </div>
  );
}
export default MainPallete;
