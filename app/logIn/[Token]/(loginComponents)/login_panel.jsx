"use client";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { getCookie } from "../../../functions/cookiesFunctions";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ColorRing } from "react-loader-spinner";
import { AuthContext } from "../../../(lib)/context-provider";
import Link from "next/link";
import userColorAtom from "../../../(lib)/jotai/userColor";
import Image from "next/image";
function Login_panel({ setisLoginPanel ,providers}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const pb = new PocketBase(process.env.pocketBaseUrl);

  const [errorMsg, setErrorMsg] = useState("");
  const { isValid, setisValid } = useContext(AuthContext);
  const [color, setcolor] = useState(userColorAtom);
  const [isloading, setisloading] = useState(false);
  const router = useRouter();
  async function ONSubmit(data) {
    setErrorMsg("");
    setisloading(true);
    const res = await fetch(`/api/login?survive=${data.remember}`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(data),
      headers: {
        remember: data.remember,
      },
    });
    const Json = await res.json();
    setcolor(Json.color);
    reset();
    if (Json.success) {
      pb.authStore.loadFromCookie(getCookie("pb_auth"));
      if (pb.authStore.isValid) {
        setisValid(true);
        router.push("/");
      } else {
        setisloading(false);
        setErrorMsg("error happend");
      }
    } else {
      setisloading(false);
      setErrorMsg(Json.msg);
    }
  }

  async function handleAuthO2(provider) {
    const res = await fetch("/api/oauth2-redirect", {
      method: "POST",
      body: JSON.stringify({
        provider: provider,
      }),
    });
  }
  return (
    <div className="bg-secondarySecondarylight  min-h-[500px] w-full md:w-1/2 pt-2 md:pt-5 sm:px-10 flex flex-col justify-evenly  text-main text-center select-none font-lato">
      <div className=" text-center md:text-start">
        <p className="text-2xl md:text-4xl mb-2 font-bold">Login to Safomart</p>
        <p className="text-gray-400 text-sm md:text-base font-normal">
          Login to your SafoMart account to be able to purchase items, customize
          your cart and benefit from the best sales in your country.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(ONSubmit)}
        className="flex flex-col gap-y-5 justify-center items-center "
      >
        {/* register your input into the hook by invoking the "register" function */}
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

        <div className="flex gap-x-3 w-full p-2 justify-start items-center">
          <input
            autoComplete="off"
            type="password"
            placeholder="password"
            className="w-full text-lg  border-2 border-main text-main  font-medium py-2 md:py-6 px-3  placeholder:text-gray-400 focus-visible:outline-none"
            {...register("password", { required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        {errorMsg && <p className="text-red-600 font-medium">{errorMsg}</p>}

        <div className="flex px-4 md:px-0 w-full justify-between items-center">
          <div className="flex  items-center space-x-2">
            <input
              type={"checkbox"}
              className="cursor-pointer bg-secondary text-secondary"
              {...register("remember", { required: false })}
            />
            <p className="font-medium">Remember me</p>
          </div>
          <button
            className="text-gray-500 text-sm font-semibold"
            onClick={() => setisLoginPanel(false)}
          >
            forgot password?
          </button>{" "}
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
          {!isloading && <p>Connect</p>}
        </button>
      </form>
      <div className="flex justify-end w-full">
        <Link
          href="/signIn/new"
          className=" p-2 rounded-lg text-main hover:text-gray-900 transition w-fit flex items-center space-x-2"
        >
          <p>Sign up</p>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <div className="text-center w-full font-semibold">
        {/* <p>Or</p>
        <a
        target={"_blank"}
          className="bg-white flex justify-center items-center w-full px-1 py-3 my-3 h-[50px] gap-4"
          href={providers[0].authUrl + "/"}
        >
          <Image
            src={"/loginPage/google.png"}
            alt="google logo"
            height={30}
            width={30}
          />
          <p className="text-sm">Sign in with google</p>
        </a>
        <button className="bg-blue-700 text-white flex justify-center items-center w-full px-1 py-3 my-3 h-[50px] gap-4">
          <FontAwesomeIcon icon={faFacebook} className="h-[2  0px]" />

          <p className="text-sm">Sign in with Facebook</p>
        </button> */}
      </div>
    </div>
  );
}

export default Login_panel;
