import Image from "next/image";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Home_slider_iphone_15() {
  return (
    <div className="w-full  h-full p-16 md:flex flex-col justify-center items-center bg-black text-white">
      <div className="flex-col flex sm:flex-row items-center md:items-start justify-around w-full ">
        <div className="flex text-center sm:text-start px-12 my-12 sm:my-0 sm:px-0 flex-col gap-y-12">
          <div className="flex flex-col md:flex-row space-x-1">
            <p className="text-4xl font-extrabold">IPHONE 15 PRO</p>
            <a
              href="/product/mobiles/15"
              className=" text-black  bg-white my-2 md:px-2 text-xl rounded-lg font-extrabold flex justify-center items-center gap-x-2 font-bolder transition hover:text-secondary "
            >
              <p>BUY NOW</p>
              <FontAwesomeIcon icon={faAngleRight} />
            </a>
          </div>
          <div className="md:flex gap-x-3 items-center hidden">
            <Image
              src="/icon_a17__dlzu2u0shq2q_large.png"
              width={50}
              height={50}
              alt="icon"
            />
            <div className="">
              <p>
                A17 Pro chip <br />
                with 6-core GPU
              </p>
            </div>
          </div>
          <div className="md:flex gap-x-3 items-center hidden">
            <Image
              src="/icon_3camera__gci3u4rfz0y2_large.png"
              width={50}
              height={50}
              alt="icon"
            />
            <div className="">
              <p>Pro camera system</p>
              <p className="text-gray-400">
                48MP Main camera
                <br />
                3x or 5x Telephoto camera
              </p>
            </div>
          </div>
          <div className="md:flex gap-x-3 items-center hidden">
            <Image
              src="/icon_battery__fztnats2mpme_large.png"
              width={50}
              className="h-auto w-auto"
              height={50}
              alt="icon"
            />
            <div className="">
              <p>Up to 29 hours video playback</p>
            </div>
          </div>
        </div>
        <div className="  md:w-1/2">
        <Image
          src="/pro15all_colors.jpg"
          alt="ff"
          width={500}
          className="w-auto h-auto"
          height={300}
          sizes="(max-width: 768px) 50vw,50vw"
        />
        </div>
      </div>
    </div>
  );
}

export default Home_slider_iphone_15;
