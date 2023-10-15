"use client";
import PocketBase from "pocketbase";
import { useAtom } from "jotai";
import { isValidAtom } from "../../../(navbarComponents)/navbar_user_icon";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
function Login_panel() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const pb = new PocketBase("http://127.0.0.1:8090");
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isValid, setIsvalid] = useAtom(isValidAtom);

  const onSubmit = async (data) => {
    try {
      setErrorMsg("");

      await pb.collection("users").authWithPassword(data.email, data.password);
      if (pb.authStore.isValid) {
        setIsvalid(true);
        router.push("/");
      }
    } catch (e) {
      console.log(e);
      setErrorMsg("no such email or password");
    }
  };
  return (
    <div className="bg-secondarySecondarylight rounded-lg p-6  sm:p-10 flex flex-col justify-center text-main text-center font-bold">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 justify-center items-center"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex gap-x-3 w-full p-2 justify-end items-center">
          <label className="w-1/3">Email</label>
          <input
            type="email"
            className="w-2/3 bg-secondaryLight font-normal py-2 rounded-lg"
            {...register("email", { required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>

        <div className="flex gap-x-3 w-full p-2 justify-end items-center">
          <label className="w-1/3">password</label>
          <input
            type="password"
            className="w-2/3 bg-secondaryLight font-normal py-2 rounded-lg"
            {...register("password", { required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}
        <button
          className="bg-secondary p-2 rounded-lg text-white w-fit"
          type="submit"
        >
          Connect
        </button>
      </form>
    </div>
  );
}

export default Login_panel;
