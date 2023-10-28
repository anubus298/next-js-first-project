import Image from "next/image";
function Sliders_surface_14() {
  return (
    <div className="flex justify-center relative h-[500px]">
      <Image
        className="absolute "
        quality={100}
        style={{
          objectFit: "cover",
        }}
        src={"/home_surface14.avif"}
        alt="home"
        height={500}
        width={1200}
      />
      <div className="z-20 w-full p-16 flex  ">
        <div className="flex w-full justify-between items-center">
          <div className="flex text-center text-black sm:text-start px-12 my-12 sm:my-0 sm:px-0 flex-col gap-y-12 w-[250px]">
            <div className="flex space-x-1">
              <p className="text-5xl font-extrabold text-center">
                Surface Laptop <br /> 14
              </p>
            </div>
            <div className="flex flex-col gap-y-5 ">
              <p className="text-4xl font-extrabold text-center">
                Power to do what you want
              </p>
              <p className="text-center">
                The speed and style you need to power through projects and
                assignments.
              </p>
            </div>
          </div>
          <a
            href="/product/laptops/f5yn23myfd2poue"
            className="self-end bg-orange-500 text-white p-2 px-16 rounded-lg border-white  border-2"
          >
            Buy now
          </a>

          <div className="flex text-center text-black sm:text-start px-12 my-12 sm:my-0 sm:px-0 flex-col gap-y-12 w-[250px]">
            <div className="flex flex-col gap-y-5 ">
              <p className="text-4xl font-extrabold">Ultra Evolved</p>
              <p>
                The speed and style you need to power through projects and
                assignments.
              </p>
              <p className="text-xl font-extrabold">
                - Look and sound your best{" "}
              </p>
              <p className="text-xl font-extrabold">
                - Serious multitasking power{" "}
              </p>
              <p className="text-xl font-extrabold">- Slim, sleek design </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sliders_surface_14;
