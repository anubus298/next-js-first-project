import {
  faMobile,
  faTv,
  faLaptop,
  faGlasses,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SwiperProducts from "./swiper_products";

async function getPro(type) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/Pro${
      type[0].toUpperCase() + type.slice(1, type.length)
    }/records?page=1&perPage=500&skipTotal=1&expand=brand`
  );
  let content = await res.json();

  return content;
}

async function ProductSection({ type }) {
  let data = await getPro(type);
  return (
    <div className="bg-main">
      <div className="   border-white w-full flex justify-start  font-extrabold pt-2 px-2 ">
        <div className="bg-black select-none cursor-pointer text-secondary flex pt-2 px-2 rounded-t-lg justify-center text-center items-center gap-x-3 text-4xl py-2">
          <p className="">{type.toUpperCase()}</p>
          {type === "laptops" ? (
            <FontAwesomeIcon size="1x" icon={faLaptop} />
          ) : type == "mobiles" ? (
            <FontAwesomeIcon size="1x" icon={faMobile} />
          ) : type == "tvs" ? (
            <FontAwesomeIcon size="1x" icon={faTv} />
          ) : (
            <FontAwesomeIcon size="1x" icon={faGlasses} />
          )}
        </div>
      </div>
      <div>
        <SwiperProducts type={type} data={data} />
      </div>
    </div>
  );
}

export default ProductSection;
