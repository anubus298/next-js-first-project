"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

function Newsletter_main() {
  async function OnSubmit(data) {
    await fetch(`http://localhost:8000/api/newsletter`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(data),
    });
    setDone(true);
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [Done, setDone] = useState(false);
  return (
    <div className="w-full bg-secondary text-textWhiteWithSecondary columns-2 font-lato p-2 py-4 md:p-8 md:py-16 flex flex-col md:flex-row select-none overflow-hidden">
      <div className="flex text-center md:text-start flex-col items-center justify-center gap-y-2 md:gap-y-5 w-full md:w-7/12">
        <p className="text-6xl font-bold">Spark Your Tech Adventure</p>
        <p className="font-semibold text-sm">
          Embark on a journey through the latest and greatest in technology with
          our newsletter.
          <br /> Immerse yourself in the world of cutting-edge electronic
          devices, where innovation knows no bounds.
          <br /> From futuristic wearables to high-performance gadgets, get
          ready for exclusive insights, expert reviews, and unbeatable deals.
        </p>
      </div>
      <div className="flex px-2 md:px-0 gap-y-2 flex-wrap md:flex-nowrap justify-center h-[150px] w-full md:w-5/12 items-end">
        <form onSubmit={handleSubmit(OnSubmit)} className="w-full">
          <input
            className={"focus-visible:outline-none mb-2 md:mb-0  font-bold placeholder:text-lg rounded-lg md:rounded-r-none md:rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white placeholder:font-lato w-full md:w-9/12 " + (Done && "cursor-not-allowed bg-gray-400")}
            placeholder="your@mail.com"
            autoComplete="off"
            type={"email"}
            {...register("email", { required: true })}
            disabled={Done}
          />
          <button
            disabled={Done}
            type="submit"
            className={
              "rounded-lg md:rounded-s-none md:rounded-r-lg  font-bold p-4 uppercase  border-t border-b border-r w-full md:w-3/12 text-textWhiteWithSecondary bg-main border-main"
            }
          >
            {!Done ? (
              <p>Subscribe</p>
            ) : (
              <p className="text-green-500">Done✅</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Newsletter_main;
