"use client"
import { ColorRing } from "react-loader-spinner";
import Fallback_descripesection from "./Fallback_descripesection";
import Fallback_imgsection from "./Fallback_imgsection";

function Fallback_page() {
  return (
    <>
      <button className="bg-main px-5 py-2  flex items-center justify-center rounded-t-lg min-w-[105px]">
        <ColorRing
          visible={true}
          height="35"
          width="35"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </button>
      <div className="bg-secondarySecondarylight  w-full gap-y-5 flex p-5 md:flex-row flex-col">
        <Fallback_imgsection />
        <Fallback_descripesection />
      </div>
    </>
  );
}

export default Fallback_page;
