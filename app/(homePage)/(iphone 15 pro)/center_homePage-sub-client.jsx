import Image from "next/image";
import Iphone_15_Buy_now_icon from "./buy_no_iphone";
function Center_homePageSubClient() {
  return (
    <>
      <div className="w-full pro-15-video mb-16  md:flex flex-col justify-center items-center text-white">
        <video className=" hidden sm:block" autoPlay >
          <source src="15Pro.mp4" type="video/mp4" />
        </video>
<div className="flex justify-center sm:hidden">
<Image src="/15ProSmall.jpg" alt="ff" width={380} height={380} />

</div>
        <div className="flex-col flex sm:flex-row  justify-around w-full  mt-10 sm:mt-32 ">
          <div className="flex text-center sm:text-start px-12 my-12 sm:my-0 sm:px-0 flex-col gap-y-12">
            <p className="text-4xl font-extrabold">IPHONE 15 PRO</p>
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
        <div className="mt-32 flex gap-y-10 flex-col items-center justify-center ">
          <p className="text-5xl font-bold text-center md:text-start">Designed to make a difference.</p>
          <Image
            src={"/iphone_15pro__3nx4u28gc026_large.jpg"}
            alt="iphone 15"
            width={268}
            height={380}
          />
          <Iphone_15_Buy_now_icon />
        </div>
      </div>
    </>
  );
}

export default Center_homePageSubClient;
