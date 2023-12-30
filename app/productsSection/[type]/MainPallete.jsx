"use client";
import { Popover, Rate } from "antd";
import { ColorRing } from "react-loader-spinner";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Fallback_card from "./(fallback)/fallback_card";
import FilterPallete from "./FilterPallete";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
function MainPallete({ data, typeForHref }) {
  let brandList = data.map((i) => {
    if (i.expand?.brand?.brandName) {
      return i.expand.brand.brandName;
    }
  });
  brandList = brandList.filter((i) => {
    return i !== undefined;
  });
  brandList = [...new Set(brandList)];
  const [arrangment, setarrangment] = useState(data);
  const [IsLoading, setIsLoading] = useState(false);
  const [domloaded, setdomloaded] = useState(false);
  const [RememberBrand, setRememberBrand] = useState("default");
  const [Reference, setReference] = useState(data);
  const [FilterParams, setFilterParams] = useState({
    Price: "default",
    Rating: "default",
    Brand: "default",
    reset: false,
  });
  useEffect(() => {
    if (FilterParams.reset == true) {
      setarrangment(Reference);
      setFilterParams({
        Price: "default",
        Rating: "default",
        Brand: "default",
        reset: false,
      });
    }
    if (FilterParams.Price != "default") {
      let Ref = [...arrangment];
      if (FilterParams.Price == "Desc") {
        Ref.sort((a, b) => {
          return b.price - a.price;
        });
        console.log("desc");
        console.log(Ref);
        setarrangment(Ref);
      } else if (FilterParams.Price == "Asc") {
        Ref.sort((a, b) => {
          return a.price - b.price;
        });
        console.log("Asc");
        console.log(Ref);
        setarrangment(Ref);
      }
    }
    if (FilterParams.Rating !== "default") {
      let Ref2 = [...arrangment];
      if (FilterParams.Rating == "Asc") {
        Ref2.sort((a, b) => {
          return b.rating - a.rating;
        });
        setarrangment(Ref2);
      } else if (FilterParams.Rating == "Desc") {
        Ref2.sort((a, b) => {
          return a.rating - b.rating;
        });
        setarrangment(Ref2);
      }
    }
    if (FilterParams.Brand !== "default") {
      if (FilterParams.Brand !== RememberBrand) {
        setRememberBrand(FilterParams.Brand);
        let Ref3 = [...arrangment];
        Ref3 = Ref3.filter((a) => {
          return a.expand?.brand?.brandName == FilterParams.Brand;
        });
        setarrangment(Ref3);
        setIsLoading(false);
      }
    }
  }, [FilterParams]);
  useEffect(() => {
    setdomloaded(true);
  }, []);
  const router = useRouter();

  return (
    <div className="rounded-lg">
      <div className="p-1 flex items-center md:pe-0 md:py-4 md:ps-4 rounded-t-md h-14 border-[.5px] border-secondarySecondarylight">
        <FilterPallete
          Reference={Reference}
          setIsLoading={setIsLoading}
          setarrangment={setarrangment}
          FilterParams={FilterParams}
          setFilterParams={setFilterParams}
          brandList={brandList}
        />
      </div>
      <div className="flex flex-wrap h-full p-1  md:p-4 rounded-b-md bg-secondarySecondarylight justify-evenly md:justify-normal gap-y-4 md:gap-x-6 md:gap-y-8">
        {!domloaded && (
          <div className="w-full h-[300px] flex justify-center items-center">
            <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        )}
        {arrangment.map((product, index) => {
          return (
            domloaded && (
              <Suspense
                key={product.id + index * 113}
                fallback={<Fallback_card />}
              >
                <Card
                  bordered={true}
                  className={
                    "w-44 md:w-56 h-80 py-2 md:py-4 hover:shadow-lg hover:-translate-y-1 duration-200 ease-out font-lato "  
                      
                  }
                  cover={
                    <Image
                      alt="ss"
                      className="h-[150px] w-auto mx-auto cursor-pointer"
                      src={`${process.env.pocketBaseUrl}api/files/${product.collectionId}/${product.id}/${product.imgs[0]}`}
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
                        price={parseFloat(product.price).toFixed(2)}
                        sale={product.sale}
                        rating={product.rating}
                        id={product.id}
                        totalRated={product.totalRated}
                        typeForHref={typeForHref}
                      />
                    }
                  ></Meta>
                </Card>
              </Suspense>
            )
          );
        })}
        {IsLoading && (
          <div className="h-[320px] flex justify-center items-center">
            <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        )}
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
            src={`${process.env.pocketBaseUrl}api/files/${collectionId}/${brandId}/${img}?thumb=0x30`}
          />
        )}
      </div>
      <Link href={`/product/${typeForHref}/${id}`} className="text-main">
        <p className="text-sm md:text-base">{name}</p>
      </Link>
    </div>
  );
}
function CardDescription({ price, sale, rating, id, typeForHref, totalRated }) {
  return (
    <div className="flex flex-col items-center justify-evenly">
      <Popover
        content={
          <div className="flex flex-col items-center">
            <p className="font-extrabold ">{rating}/5</p>
            <p className="text-xs text-gray-600">({totalRated})</p>
          </div>
        }
      >
        <Rate
          allowHalf={true}
          className="text-xs gap-x-2 "
          defaultValue={rating}
          disabled
        />
      </Popover>
      {sale == 0 && (
        <Link
          href={`/product/${typeForHref}/${id}`}
          className="text-lg font-bold text-secondary"
        >
          ${price}
        </Link>
      )}
      {sale != 0 && (
        <div className="flex flex-col text-center">
          <p className="line-through decoration-black">${price}</p>
          <Link
            href={`/product/${typeForHref}/${id}`}
            className="text-lg font-bold text-green-600"
          >
            ${price - price * sale}
            <span className="text-sm"> ({sale * 100 + "% OFF"})</span>
          </Link>
        </div>
      )}
    </div>
  );
}
export default MainPallete;
