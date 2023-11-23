import Image from "next/image";
import Link from "next/link";
function Sliders_galaxy_s23() {
  return (
    <div className="flex justify-center relative h-[500px]">
      <Image
        className="absolute "
        quality={100}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        src={"/slidersImgs/home_s23.jpeg"}
        alt="home"
        fill
        sizes="(max-width: 768px) 100vw,80vw"
      />
     
      <div className="z-20 w-full md:p-16 flex  ">
        <div className="flex justify-center items-center">
          <div className="flex flex-col text-center text-white sm:text-start px-12 my-12 sm:my-0 sm:px-0 md:flex-col gap-y-12">
            <div className="flex space-x-1">
              <p className="text-5xl font-extrabold">Galaxy S23 Ultra</p>
            </div>
            <div className="flex flex-col gap-y-5 md:w-1/2">
              <p className="text-4xl font-extrabold">Ultra Evolved</p>
              <p className="hidden sm:block font-semibold">
                Get ready to become your group&apos;s go-to photographer.
                We&apos;ve packed Galaxy&apos;s biggest sensor, light-absorbing
                pixels and video stabilization technology into one epic camera
                for life&apos;s most share-worthy moments.
              </p>
              <Link
                className="text-secondaryLight text-2xl font-extrabold"
                href="/product/mobiles/59kkyk5iv6d61wz"
              >
                Buy now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sliders_galaxy_s23;
