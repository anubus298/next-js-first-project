import Image from "next/image";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Home_slider_iphone_15() {
  return (
    <div className="w-full h-full p-16 md:flex flex-col justify-center items-center bg-black text-white">
      <div className="flex justify-center sm:hidden">
        <Image src="/15ProSmall.jpg" alt="ff" width={380} height={380} />
      </div>
      <div className="flex-col flex sm:flex-row  justify-around w-full ">
        <div className="flex text-center sm:text-start px-12 my-12 sm:my-0 sm:px-0 flex-col gap-y-12">
          <div className="flex space-x-1">
            <p className="text-4xl font-extrabold">IPHONE 15 PRO</p>
            <a
              href="/product/mobiles/15"
              className=" text-black bg-white my-2 px-2 text-xl rounded-lg font-extrabold flex items-center gap-x-2 font-bolder transition hover:text-secondary "
            >
              <p>BUY NOW</p>
              <FontAwesomeIcon icon={faAngleRight} />
            </a>
          </div>
          <div className="flex gap-x-3 items-center">
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
          <div className="flex gap-x-3 items-center">
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
          <div className="flex gap-x-3 items-center">
            <Image
              src="/icon_battery__fztnats2mpme_large.png"
              width={50}
              height={50}
              alt="icon"
            />
            <div className="">
              <p>Up to 29 hours video playback</p>
            </div>
          </div>
        </div>
        <Image src="/pro15all_colors.jpg" alt="ff" width={468} height={547} />
      </div>
    </div>
  );
}

export default Home_slider_iphone_15;
