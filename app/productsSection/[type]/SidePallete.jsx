"use client";
import CountUp from "react-countup";

function SidePallete({ count, type }) {
  return (
    <div className="p-2 border-[.5px] border-main rounded-lg flex flex-col space-y-3 h-full">
      <CountUp delay={2} start={0} end={count} duration={5}>
        {({ countUpRef }) => (
          <div className="select-none ">
            <p className="text-gray-900 font-semibold">Currently we have:</p>
            <p className="text-3xl font-extrabold text-center w-full">
              <span className="text-6xl text-secondary" ref={countUpRef} />
              {" " +type + "!"}
            </p>
          </div>
        )}
      </CountUp>
      <a
        className="bg-secondary text-white p-1 rounded-md ps-3"
        href="/productsSection/Mobiles"
      >
        Mobiles
      </a>
    </div>
  );
}

export default SidePallete;
