"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
    <motion.div
      animate={{ opacity: [0, 0.5, 1] }}
      className="bg-secondarySecondarylight  min-h-[500px] w-full md:w-1/2 pt-2 md:pt-5 sm:px-10 flex flex-col justify-evenly  text-main text-center select-none font-lato"
    >
      <div className="font-bold text-center md:text-start">
        <p className="mb-2 text-2xl md:text-4xl">Create an account</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmiter)}
        className="flex flex-col items-center justify-center gap-y-5 font-lato"
      >
        <div className="relative flex items-center justify-start w-full p-2 gap-x-3">
          <input
            autoComplete="off"
            type="text"
            placeholder="First name"
            className="w-full px-3 py-1 text-lg font-medium border-2 text-main border-main md:py-4 focus-visible:outline-none"
            {...register("first_name")}
          />
          {errors.first_name && (
            <p className="absolute text-xs font-semibold text-red-600 -bottom-4">
              {errors.first_name.message}
            </p>
          )}
          <input
            autoComplete="off"
            type="text"
            placeholder="Last name"
            className="w-full px-3 py-1 text-lg font-medium border-2 text-main border-main md:py-4 focus-visible:outline-none"
            {...register("last_name")}
          />
          {errors.last_name && (
            <p className="absolute text-xs font-semibold text-red-600 -bottom-4 right-36">
              {errors.last_name.message}
            </p>
          )}
        </div>
        <div className="relative flex items-center justify-start w-full p-2 gap-x-3">
          <input
            autoComplete="off"
            type="email"
            placeholder="Email"
            className="w-full px-3 py-1 text-lg font-medium border-2 text-main border-main md:py-4 focus-visible:outline-none"
            {...register("email")}
          />
          {errors.email && (
            <p className="absolute text-xs font-semibold text-red-600 -bottom-4">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="relative flex items-center justify-start w-full p-2 gap-x-3">
          <input
            autoComplete="off"
            type={isPasswordShowen ? "text" : "password"}
            placeholder="Password"
            className="w-full px-3 py-1 text-lg font-medium border-2 text-main border-main md:py-4 focus-visible:outline-none"
            {...register("password")}
          />
          <Popover
            className="absolute -right-4 "
            placement="right"
            content={
              <p className="text-sm ">
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
              className="absolute text-2xl -translate-x-1/2 right-2"
            />
          </Popover>
          {errors.password && (
            <p
              className="absolute text-xs font-semibold text-red-600 -bottom-6"
              onClick={() => console.log(errors)}
            >
              {errors.password.message}
            </p>
          )}
          <FontAwesomeIcon
            icon={isPasswordShowen ? faEye : faEyeSlash}
            onClick={() => setisPasswordShowen(!isPasswordShowen)}
            className="absolute -translate-y-1/2 cursor-pointer top-1/2 right-12"
          />
        </div>
        <div className="relative flex items-center justify-start w-full p-2 gap-x-3">
          <input
            autoComplete="off"
            type="password"
            placeholder="Confirm password"
            className="w-full px-3 py-1 text-lg font-medium border-2 text-main border-main md:py-4 focus-visible:outline-none"
            {...register("passwordConfirm")}
          />
          {errorMsg && (
            <p className="absolute text-xs font-semibold text-red-600 -bottom-4">
              {errorMsg}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-between w-full space-y-3">
          <div className="relative flex items-center space-x-2">
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
              <p className="text-xs font-semibold text-red-600 ">Required</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type={"checkbox"}
              {...register("Subscribe", { required: false })}
            />
            <p className="font-medium">Subscribe to email notifications</p>
          </div>
        </div>
        <button
          className="w-full p-2 font-semibold transition rounded-lg bg-secondaryYellow text-main"
          type="submit"
        >
          Create account
        </button>
      </form>
      <div className="flex justify-start w-full">
        <Link
          href="/logIn/new"
          className="flex items-center p-2 space-x-2 transition rounded-lg  text-main hover:text-gray-900 w-fit"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <p>Log in instead</p>
        </Link>
      </div>
    </motion.div>
  );
}
export default Login_panel;
