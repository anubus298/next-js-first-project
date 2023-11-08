import Image from "next/image";
function AboutPage() {
  return (
    <div className="w-full  ">
      <div className="flex w-full items-center justify-center p-3 bg-secondarySecondarylight">
        <p className="text-5xl font-extrabold tracking-[.45em]">ABOUT US</p>
      </div>
      <div className="flex items-center justify-between">
        <Image
          alt="About"
          src={"/about/01.png"}
          height={400}
          width={400}
          className="w-auto"
        />
        <div>
          <p className="text-lg font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            temporibus exercitationem assumenda aut commodi fugiat velit nobis
            autem error eaque, culpa ipsa voluptate aperiam, deserunt libero.
            Corporis porro doloribus maxime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
