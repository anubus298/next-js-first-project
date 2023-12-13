"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";
import { Popover } from "antd";
import {
  emailSchema,
  NameSchema,
  passwordSchema,
  Term,
} from "../../../(lib)/Zod/schema";
function Login_panel() {
  const zodSchema = z.object({
    password: passwordSchema,
    passwordConfirm: passwordSchema,
    email: emailSchema,
    first_name: NameSchema,
    last_name: NameSchema,
    Term: Term,
    Subscribe: z.boolean(),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(zodSchema) });

  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [isPasswordShowen, setisPasswordShowen] = useState(false);

  async function onSubmiter(data) {
    try {
      if (data.password != data.passwordConfirm) {
        throw new Error("no matching");
      }
      const res = await fetch("/api/register?subscribe=" + data.Subscribe, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(data),
      });
      reset();
      const datares = await res.json();
      !datares.success && setErrorMsg(datares.error);
      datares.success && router.push("/sentByServer/email_verification");
    } catch (error) {
      reset();
      setErrorMsg(error.message);
    }
  }
  return (
    <div className="bg-secondarySecondarylight  min-h-[500px] w-full md:w-1/2 pt-2 md:pt-5 sm:px-10 flex flex-col justify-evenly  text-main text-center select-none font-lato">
      <div className="font-bold text-center md:text-start">
        <p className="text-2xl md:text-4xl mb-2">Create an account</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmiter)}
        className="flex flex-col gap-y-5 justify-center items-center font-lato"
      >
        <div className="flex gap-x-3 w-full p-2 justify-start items-center relative">
          <input
            autoComplete="off"
            type="text"
            placeholder="First name"
            className="w-full text-lg text-main border-main border-2 py-1 font-medium md:py-4 px-3  focus-visible:outline-none"
            {...register("first_name")}
          />
          {errors.first_name && (
            <p className="absolute -bottom-4 font-semibold text-xs text-red-600">
              {errors.first_name.message}
            </p>
          )}
          <input
            autoComplete="off"
            type="text"
            placeholder="Last name"
            className="w-full text-lg text-main border-main border-2 py-1 font-medium md:py-4 px-3  focus-visible:outline-none"
            {...register("last_name")}
          />
          {errors.last_name && (
            <p className="absolute -bottom-4 right-36 font-semibold text-xs text-red-600">
              {errors.last_name.message}
            </p>
          )}
        </div>
        <div className="flex gap-x-3 w-full p-2 justify-start items-center relative">
          <input
            autoComplete="off"
            type="email"
            placeholder="Email"
            className="w-full text-lg text-main border-main border-2 py-1 font-medium md:py-4 px-3   focus-visible:outline-none"
            {...register("email")}
          />
          {errors.email && (
            <p className="absolute -bottom-4 font-semibold text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex gap-x-3 w-full p-2 justify-start items-center relative">
          <input
            autoComplete="off"
            type={isPasswordShowen ? "text" : "password"}
            placeholder="Password"
            className="w-full text-lg text-main border-main border-2 py-1 font-medium md:py-4 px-3  focus-visible:outline-none"
            {...register("password")}
          />
          <Popover
            className="absolute -right-4 "
            placement="right"
            content={
              <p className=" text-sm">
                At least 8 characters long.
                <br />
                At least one lowercase letter.
                <br />
                At least one uppercase letter.
                <br /> At least one digit (0-9).
              </p>
            }
            title={<p className="font-semibold">Password rules :</p>}
          >
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="text-2xl absolute right-2 -translate-x-1/2"
            />
          </Popover>
          {errors.password && (
            <p
              className="absolute -bottom-6 font-semibold text-xs text-red-600"
              onClick={() => console.log(errors)}
            >
              {errors.password.message}
            </p>
          )}
          <FontAwesomeIcon
            icon={isPasswordShowen ? faEye : faEyeSlash}
            onClick={() => setisPasswordShowen(!isPasswordShowen)}
            className="absolute top-1/2 -translate-y-1/2 right-12 cursor-pointer"
          />
        </div>
        <div className="flex gap-x-3 w-full p-2 justify-start items-center relative">
          <input
            autoComplete="off"
            type="password"
            placeholder="Confirm password"
            className="w-full text-lg text-main border-main border-2 py-1 font-medium md:py-4 px-3  focus-visible:outline-none"
            {...register("passwordConfirm")}
          />
          {errorMsg && (
            <p className="absolute -bottom-4 font-semibold text-xs text-red-600">
              {errorMsg}
            </p>
          )}
        </div>
        <div className="flex-col flex w-full justify-between space-y-3">
          <div className="flex  items-center space-x-2 relative">
            <input
              type={"checkbox"}
              className="cursor-pointer "
              {...register("Term", { required: true })}
            />
            <p className="font-medium">
              Accept{" "}
              <span className="cursor-pointer">
                <Link href="/termOfUse" className="underline text-indigo-950">
                  term of use
                </Link>
              </span>
            </p>
            {errors.Term && (
              <p className=" font-semibold text-xs text-red-600">Required</p>
            )}
          </div>
          <div className="flex  items-center space-x-2">
            <input
              type={"checkbox"}
              {...register("Subscribe", { required: false })}
            />
            <p className="font-medium">Subscribe to email notifications</p>
          </div>
        </div>
        <button
          className="bg-secondaryYellow text-main transition p-2 font-semibold rounded-lg  w-full"
          type="submit"
        >
          Create account
        </button>
      </form>
      <div className="flex justify-start w-full">
        <Link
          href="/logIn/new"
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
