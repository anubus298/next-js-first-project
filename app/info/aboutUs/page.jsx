import {
  faInstagram,
  faLinkedin,
  faUpwork,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

function AboutUs() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center  w-full md:h-[540px] gap-x-16 relative px-2 md:px-0 pt-14 md:pt-0">
      {/* <Image alt="logo" height={200} width={500} src="/logo.svg" /> */}
      <div className="w-full md:w-1/2 ">
        <h1 className="text-6xl font-extrabold text-center md:text-8xl boujee-text md:text-start">
          ABOUT ME
        </h1>
        <p className="text-sm md:text-base">
          Hello there! 👋 I&apos;m Safouane a passionate 20-year-old web
          developer deeply enthralled by the world of technology.
          <br className="mb-1" /> I&apos;ve dedicated myself to mastering the
          art of web development, showcasing my skills through the creation of
          this web app.
          <br className="mb-1" /> Within this digital realm, I excel in
          problem-solving, crafting smart solutions, seamlessly integrating REST
          APIs, designing intuitive interfaces, and putting in the hard work to
          bring ideas to life. <br className="mb-1" />
          Join me on this exciting journey where innovation meets dedication,
          and let&apos;s build a future powered by code!
        </p>
        <div className="flex items-center w-full my-6 gap-x-6 justify-evenly md:w-auto md:justify-normal">
          <a
            className="text-5xl md:text-7xl text-secondary"
            href="https://www.linkedin.com/in/safouane-el-arari/"
            target={"_blank"}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            className="text-5xl md:text-7xl text-secondaryOrange"
            href="https://www.instagram.com/wdyn572/"
            target={"_blank"}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a className="text-5xl md:text-7xl text-secondaryYellow">
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
