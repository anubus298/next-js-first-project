"use client";
import PocketBase from "pocketbase";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

function Home({ params }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  async function ONSubmit(data) {
    setisloading(true);
    const res = await fetch(`/api/login/confirmPassword`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({ ...data, token: params.token }),
    });
    reset();
    const Json = await res.json();

    setisloading(false);
    if (Json.success) {
      router.push("/logIn/dafsfqf");
    } else {
      setErrorMsg(Json.error);
    }
  }
  const [errorMsg, setErrorMsg] = useState("");
  const [isloading, setisloading] = useState(false);
  const pb = new PocketBase(process.env.pocketBaseUrl);
  return (
    <div className="flex justify-center w-full">
      <div className="bg-secondarySecondarylight  min-h-[500px] w-full md:w-1/2 pt-2 md:pt-5 sm:px-10 flex flex-col justify-evenly  text-main text-center select-none font-lato">
        <div className=" text-center md:text-start">
          <p className="text-2xl md:text-4xl mb-2 text-center font-bold">
            Password reset
          </p>
          <p className="text-gray-400 text-sm md:text-base text-center font-normal">
            Confirm your new password
          </p>
          {errorMsg && <p className="text-xs text-center text-red-700">{errorMsg}</p>}
        </div>
        <form
          onSubmit={handleSubmit(ONSubmit)}
          className="flex flex-col gap-y-5 justify-center items-center "
        >
          <div className="flex gap-x-3 w-full p-2 justify-start items-center">
            <input
              autoComplete="off"
              type="password"
              placeholder="password"
              className="w-full text-lg  border-2 border-main text-main  font-medium py-2 md:py-6 px-3 placeholder:text-gray-400 focus-visible:outline-none"
              {...register("password", { required: true })}
            />

            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <div className="flex gap-x-3 w-full p-2 justify-start items-center">
            <input
              autoComplete="off"
              type="password"
              placeholder="password confirmation"
              className="w-full text-lg  border-2 border-main text-main  font-medium py-2 md:py-6 px-3 placeholder:text-gray-400 focus-visible:outline-none"
              {...register("passwordConfirmation", { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </div>
          <button
            className="bg-secondary font-semibold p-2 text-white w-full flex justify-center items-center"
            type="submit"
          >
            <ColorRing
              visible={isloading}
              height="25"
              width="25"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
            {!isloading && <p>Confirm change</p>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
