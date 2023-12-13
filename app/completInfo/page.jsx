"use client";
import PocketBase from "pocketbase";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  ageGreaterThan18Schema,
  genderSchema,
  phoneNumberSchema,
} from "../(lib)/Zod/schema";
import z from "zod";
function HomeCompletInfo() {
  const router = useRouter();
  const zodSchema = z.object({
    birth: ageGreaterThan18Schema,
    phone: phoneNumberSchema,
    gender: genderSchema,
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(zodSchema) });
  async function ONSubmit(data) {
    setisloading(true);
    const res = await fetch(`/api/login/addInfo`, {
      method: "PATCH",
      "Content-Type": "application/json",
      body: JSON.stringify(data),
    });
    reset();
    const Json = await res.json();

    setisloading(false);
    if (Json.success) {
      router.push("/");
    } else {
      setErrorMsg(Json.error.message);
    }
  }
  const [errorMsg, setErrorMsg] = useState("");
  const [isloading, setisloading] = useState(false);
  return (
    <div className="flex justify-center w-full">
      <div className="bg-secondarySecondarylight  min-h-[500px] w-full md:w-1/2 pt-2 md:pt-5 sm:px-10 flex flex-col justify-evenly  text-main text-center select-none font-lato">
        <div className=" text-center md:text-start">
          <p className="text-2xl md:text-4xl mb-2 text-center font-bold">
            Complete Your Information
          </p>
          <p className="text-gray-400 text-sm md:text-base text-center font-normal">
            Confirm your new password
          </p>
          {errorMsg && (
            <p className="text-xs text-center text-red-700">{errorMsg}</p>
          )}
        </div>
        <form
          onSubmit={handleSubmit(ONSubmit)}
          className="flex flex-col gap-y-5 justify-center items-center "
        >
          <div className="flex gap-x-3 flex-col w-full p-2 justify-start items-start  ">
            <input
              autoComplete="off"
              type="date"
              placeholder="birth"
              className="w-full text-lg  border-2 border-main text-main  font-medium py-2 md:py-6 px-3 placeholder:text-gray-400 focus-visible:outline-none"
              {...register("birth", { required: true })}
            />

            {errors.birth && (
              <p className="text-red-700">{errors.birth.message}</p>
            )}
          </div>
          <div className="flex gap-x-3 flex-col w-full p-2 justify-start items-start  ">
            <input
              autoComplete="off"
              type="text"
              placeholder="Phone number (optional)"
              className="w-full text-lg  border-2 border-main text-main  font-medium py-2 md:py-6 px-3 placeholder:text-gray-400 focus-visible:outline-none"
              {...register("phone", { required: false })}
            />
            {errors.phone && (
              <p className="text-red-700">{errors.phone.message}</p>
            )}
          </div>
          <div className="flex gap-x-3 flex-col w-full p-2 justify-start items-start  ">
            <select
              className="block w-full py-2 pl-3 pr-10 mt-1 leading-5 focus:outline-none focus:ring-secondary focus:border-main placeholder:font-normal sm:text-sm bg-white "
              {...register("gender", { required: true })}
            >
              <option>(gender)</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-700">{errors.gender.message}</p>
            )}
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
            {!isloading && <p>Complete</p>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default HomeCompletInfo;
