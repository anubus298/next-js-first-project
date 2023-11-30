"use client";
import PocketBase from "pocketbase";
import { Checkbox } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { getCookie } from "../../../functions/cookiesFunctions";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ColorRing } from "react-loader-spinner";
import { AuthContext } from "../../../(lib)/context-provider";
import Link from "next/link";
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

  const [isloading, setisloading] = useState(false);
  const router = useRouter();
  function ONSubmit(data) {
    setErrorMsg("");
    setisloading(true);
    fetch(`/api/login?survive=${data.remember}`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(data),
      headers: {
        remember: data.remember,
      },
    })
      .then((res) => {
        res.json();
        setisloading(false);
      })
      .catch((e) => setErrorMsg(e))
      .then((data) => {
        pb.authStore.loadFromCookie(getCookie("pb_auth"));
        if (pb.authStore.isValid) {
          setisValid(false);
          setisValid(true);
        }
        pb.authStore.isValid && router.push("/");
      });
  }

  return (
    <div className="bg-secondarySecondarylight  h-[500px] w-full md:w-1/2  sm:px-10 flex flex-col justify-evenly  text-main text-center font-bold select-none font-lato">
      <div className=" text-center md:text-start">
        <p className="text-2xl md:text-4xl mb-2">Login to Safomart</p>
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
            value={"araristaf@gmail.com"}
            type="email"
            placeholder="email"
            className="w-full text-lg  border-2 border-main text-main  font-semibold py-2 md:py-6 px-3  placeholder:text-red-200 focus-visible:outline-none"
            {...register("email", { required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>

        <div className="flex gap-x-3 w-full p-2 justify-start items-center">
          <input
            autoComplete="off"
            value={"987612345saf"}
            type="password"
            placeholder="password"
            className="w-full text-lg  border-2 border-main text-main  font-semibold py-2 md:py-6 px-3  placeholder:text-red-200 focus-visible:outline-none"
            {...register("password", { required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <div className="flex px-4 md:px-0 w-full justify-between items-center">
          <div className="flex  items-center space-x-2">
            <input
              type={"checkbox"}
              className="cursor-pointer bg-secondary text-secondary"
              {...register("remember", { required: false })}
            />
            <p>Remember me</p>
          </div>
          <Link href="/forgot-password" className="text-gray-500 text-sm">
            forgot password?
          </Link>
        </div>
        <button
          className="bg-secondary  p-2 text-white w-full flex justify-center items-center"
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
        <p>Or</p>
      </div>
    </div>
  );
}
export default Login_panel;
