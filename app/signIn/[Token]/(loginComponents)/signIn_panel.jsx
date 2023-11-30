"use client";
import PocketBase from "pocketbase";
import { Checkbox } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { getCookie } from "../../../functions/cookiesFunctions";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../(lib)/context-provider";
import { useContext } from "react";
import Link from "next/link";
import { Popover } from "antd";
function Login_panel() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const pb = new PocketBase(process.env.pocketBaseUrl);

  const [errorMsg, setErrorMsg] = useState("");
  const { isValid, setisValid } = useContext(AuthContext);

  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      setErrorMsg("");
      const res = await fetch("/api/register?subscribe=" + data.Subscribe, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
      setErrorMsg("error : " + e.message);
    }
  };
  return (
    <div className="bg-secondarySecondarylight font-lato font-semibold px-6 h-[620px] w-full md:w-1/2  sm:px-10 flex flex-col justify-evenly  text-main text-center select-none">
      <div className="font-extrabold text-center md:text-start">
        <p className="text-2xl md:text-4xl mb-2">Create an account</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 justify-center items-center font-lato"
      >
        <div className="flex gap-x-3 w-full p-2 justify-start items-center relative">
          <input
            autoComplete="off"
            type="text"
            placeholder="First name"
            className="w-full text-lg text-main border-main border-2 font-semibold py-1 md:py-4 px-3  focus-visible:outline-none"
            {...register("first_name", {
              required: true,
              pattern: /^[a-zA-ZÀ-ÖØ-öø-ÿ']+$/,
            })}
          />
          {errors.first_name && (
            <p className="absolute -bottom-4 font-black text-red-600">
              Invalid first name
            </p>
          )}
          <input
            autoComplete="off"
            type="text"
            placeholder="Last name"
            className="w-full text-lg text-main border-main border-2 font-semibold py-1 md:py-4 px-3  focus-visible:outline-none"
            {...register("last_name", {
              required: true,
              pattern: /^[a-zA-ZÀ-ÖØ-öø-ÿ']+$/,
            })}
          />
          {errors.last_name && (
            <p className="absolute -bottom-4 right-36 font-black text-red-600">
              Invalid last name
            </p>
          )}
        </div>
        <div className="flex gap-x-3 w-full p-2 justify-start items-center relative">
          <input
            autoComplete="off"
            type="email"
            placeholder="Email"
            className="w-full text-lg text-main border-main border-2 font-semibold py-1 md:py-4 px-3   focus-visible:outline-none"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && (
            <p className="absolute -bottom-4 font-black text-red-600">
              Invalid Email
            </p>
          )}
        </div>

        <div className="flex gap-x-3 w-full p-2 justify-start items-center relative">
          <input
            autoComplete="off"
            type="password"
            placeholder="Password"
            className="w-full text-lg text-main border-main border-2 font-semibold py-1 md:py-4 px-3  focus-visible:outline-none"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
            })}
          />
          <Popover
            className="absolute -right-4 "
            placement="right"
            content={
              <p className=" text-sm font-semibold">
                - At least 8 characters long.
                <br />
                - Must contain at least one lowercase letter.
                <br />
                - Must contain at least one uppercase letter.
                <br />- Must include at least one digit (0-9).
              </p>
            }
            title={<p className="font-extrabold">Password rules :</p>}
          >
            <div className="bg-main text-textWhiteWithSecondary p-1 w-5 h-5 rounded-full flex justify-center items-center relative">
              <FontAwesomeIcon icon={faExclamation} />
            </div>
          </Popover>
          {errors.password && (
            <p className="absolute -bottom-4 font-black text-red-600">
              Invalid input
            </p>
          )}
        </div>
        <div className="flex gap-x-3 w-full p-2 justify-start items-center relative">
          <input
            autoComplete="off"
            type="password"
            placeholder="Confirm password"
            className="w-full text-lg text-main border-main border-2 font-semibold py-1 md:py-4 px-3  focus-visible:outline-none"
            {...register("passwordConfirm", {
              required: true,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
            })}
          />
          {errors.passwordConfirm && (
            <p className="absolute -bottom-4 font-black text-red-600">
              Invalid matching
            </p>
          )}
        </div>
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <div className="flex-col flex w-full justify-between space-y-3">
          <div className="flex  items-center space-x-2 relative">
            <input
              type={"checkbox"}
              className="cursor-pointer"
              {...register("Term", { required: true })}
            />
            <p>
              Accept
              <span className="cursor-pointer">
                <Link href="/termOfUse "> term of use</Link>
              </span>
            </p>
            {errors.Term && (
              <p className=" font-black text-red-600">Required</p>
            )}
          </div>
          <div className="flex  items-center space-x-2">
            <input
              type={"checkbox"}
              {...register("Subscribe", { required: false })}
            />
            <p>Subscribe to email notifications</p>
          </div>
        </div>
        <button
          className="bg-secondaryYellow text-main transition p-2 rounded-lg  w-full"
          type="submit"
        >
          create account
        </button>
      </form>
      <div className="flex justify-start w-full">
        <Link
          href="/Login/new"
          className=" p-2 rounded-lg text-main hover:text-gray-900 transition w-fit flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <p>Log in instead</p>
        </Link>
      </div>
    </div>
  );
}
export default Login_panel;
