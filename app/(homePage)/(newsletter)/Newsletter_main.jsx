"use client";
import { useAtom } from "jotai";
import Confetti from "react-confetti";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import isUserProvidedNewsLetter from "../../(lib)/jotai/isUserProvidedNewsLetter";
function Newsletter_main() {
  const pallete = useRef(null);

  const [provided, setprovided] = useAtom(isUserProvidedNewsLetter);
  const [showconfetti, setshowconfetti] = useState(false);
  async function OnSubmit(data) {
    await fetch(`/api/newsletter`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(data),
    });
    setDone(true);
    setprovided(true);
    setshowconfetti(true);
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [Done, setDone] = useState(false);
  return (
    <div
      className="w-full bg-secondary text-textWhiteWithSecondary columns-2 font-lato p-2 py-4 md:p-8 md:py-16 flex flex-col md:flex-row select-none overflow-hidden relative"
      ref={pallete}
    >
      {showconfetti && (
        <Confetti
          numberOfPieces={400}
          recycle={false}
          className="left-1/2 -translate-x-1/2"
          width={pallete.clientWidth}
          height={pallete.clientHeight}
        />
      )}
      <div className="flex text-center md:text-start flex-col items-center justify-center gap-y-2 md:gap-y-5 w-full md:w-7/12">
        <p className="text-6xl font-extrabold">Spark Your Tech Adventure</p>
        <p className="font-semibold text-sm">
          Embark on a journey through the latest and greatest in technology with
          our newsletter.
          <br /> Immerse yourself in the world of cutting-edge electronic
          devices, where innovation knows no bounds.
          <br /> From futuristic wearables to high-performance gadgets, get
          ready for exclusive insights, expert reviews, and unbeatable deals.
        </p>
      </div>
      <div className="flex flex-col items-center px-2 md:px-0 gap-y-2 flex-wrap md:flex-nowrap justify-end md:h-[150px] w-full md:w-5/12 ">
        <form onSubmit={handleSubmit(OnSubmit)} className="w-full shadow-md">
          <input
            className={
              "focus-visible:outline-none mb-2 md:mb-0  font-bold placeholder:text-lg  md:rounded-r-none  p-4 border-t mr-0 border-b border-l text-gray-800 border-main  bg-white placeholder:font-lato w-full md:w-9/12 " +
              ((Done || provided) && "cursor-not-allowed bg-gray-400")
            }
            placeholder="your@mail.com"
            autoComplete="off"
            type={"email"}
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            disabled={Done || provided}
          />
          <button
            disabled={Done || provided}
            type="submit"
            className={
              "rounded-lg md:rounded-s-none md:rounded-r-lg  font-bold p-4 uppercase  border-t border-b border-r w-full md:w-3/12 text-main  transition " +
              (Done || provided
                ? "bg-green-500 border-green-500"
                : "bg-secondaryYellow border-secondaryYellow")
            }
          >
            {!(Done || provided) ? (
              <p className="text-main">Subscribe</p>
            ) : (
              <p className="text-white ">thanks!</p>
            )}
          </button>
        </form>
        {provided && <p className="text-sm">You already subscribed , gracias ! </p>}
      </div>
    </div>
  );
}

export default Newsletter_main;
