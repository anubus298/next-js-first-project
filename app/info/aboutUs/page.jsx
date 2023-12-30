import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const metadata = {
  title: "About Us",
};

function AboutUs() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full md:h-[540px] gap-x-16 relative px-2 md:px-0 pt-14 md:pt-0">
      <div className="w-full md:w-1/2">
        <h1 className="text-6xl font-extrabold text-center md:text-8xl boujee-text md:text-start">
          About Us
        </h1>
        <p className="text-sm md:text-base">
          Hi, I&apos;m Safouane El Arari, the creator of this web app. I&apos;ve
          designed this space to provide you with a straightforward and
          enjoyable shopping experience.
        </p>
        <p className="text-lg font-semibold text-secondary">Visit me here</p>
        <div className="flex items-center w-full mt-2 gap-x-6 justify-evenly md:w-auto md:justify-normal">
          <a
            className="text-xl md:text-5xl text-secondary"
            href="https://www.linkedin.com/in/safouane-el-arari/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            className="text-xl md:text-5xl text-secondaryOrange"
            href="https://www.instagram.com/wdyn572/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://safouane-portfolio.vercel.app/"
            className="text-xl md:text-5xl text-secondaryYellow"
          >
            <FontAwesomeIcon icon={faGlobe} />
          </a>
        </div>
      </div>
      <div className="relative flex w-full h-full overflow-visible md:w-1/2">
        <Image
          quality={100}
          fill
          sizes="50vw"
          style={{
            objectFit: "cover",
          }}
          alt="wave"
          src={"/about/wave.svg"}
        />
        <Image
          height={50}
          width={50}
          alt="idea"
          src={"/about/Idea.svg"}
          className="z-20 w-auto p-2 md:p-0"
        />
      </div>
    </div>
  );
}

export default AboutUs;
