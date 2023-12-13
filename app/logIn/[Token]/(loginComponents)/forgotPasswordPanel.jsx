"use client";
import PocketBase from "pocketbase";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";

import { useForm } from "react-hook-form";
function ForgotPasswordPanel({ setisLoginPanel }) {
  const {
    register,
    handleSubmit,
    watch,reset,
    formState: { errors },
  } = useForm();
  async function ONSubmit(data) {
    setisloading(true);
    const res = await fetch(`/api/login/forgetPassword`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(data),
    });
    const Json = await res.json();
    setisloading(false);
reset()
    setisSent(
      "If your email is in our database, you will receive a password reset email shortly. Please check your inbox for further instructions on resetting your password."
    );
  }
  const [isloading, setisloading] = useState(false);
  const [isSent, setisSent] = useState("");
  const pb = new PocketBase(process.env.pocketBaseUrl);
  return (
    < >
      <div className=" text-center md:text-start">
        <p className="text-2xl md:text-4xl mb-2 font-bold">Password reset</p>
        <p className="text-gray-400 text-sm md:text-base font-normal">
          Type in your email to reset your SafoMart account password
        </p>
      </div>
      <p className="text-xs">{isSent}</p>
      <form
        onSubmit={handleSubmit(ONSubmit)}
        className="flex flex-col gap-y-5 justify-center items-center "
      >
        <div className="flex gap-x-3 w-full p-2 justify-start items-center">
          <input
            autoComplete="off"
            type="email"
            placeholder="email"
            className="w-full text-lg  border-2 border-main text-main  font-medium py-2 md:py-6 px-3 placeholder:text-gray-400 focus-visible:outline-none"
            {...register("email", { required: true })}
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
          {!isloading && <p>Reset my password</p>}
        </button>
      </form>
      <button
        className="text-gray-500 text-sm font-semibold"
        onClick={() => setisLoginPanel(true)}
      >
        Go back to login
      </button>{" "}
    </>
  );
}

export default ForgotPasswordPanel;
