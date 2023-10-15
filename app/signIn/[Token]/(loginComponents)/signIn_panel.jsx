"use client";
import PocketBase from "pocketbase";
import { isValidAtom } from "@/app/(navbarComponents)/navbar_user_icon";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
function SignIn_panel() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const pb = new PocketBase("http://127.0.0.1:8090");
  const router = useRouter();
  const [isValid, setIsvalid] = useAtom(isValidAtom);

  const [errorMsg, setErrorMsg] = useState("");
  const onSubmit = async (datara) => {
    // try {
    //   setErrorMsg("");
    //   await pb.collection("users").create(data);

    //   router.push("/");
    // } catch (e) {
    //   console.log(e);
    //   setErrorMsg("invalid input");
    // }
    try {
      // setErrorMsg("");
      // const response = await fetch("/api/auth/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(datara),
      // });
      await pb.collection("users").authWithPassword(data.email, data.password);
      if (pb.authStore.isValid) {
        setIsvalid(true);
        router.push("/");
      }
      // if (!response.ok) {
      //   setError("Failed to authenticate user");
      //   return;
      // }
      // const data = await response.json();
      // if (data?.token) {
      //   router.push("/");
      //   setIsvalid(true);
      // } else {
      //   setError("Failed to authenticate user");
      // }
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
        <div className="flex gap-x-3 w-full p-2 justify-end items-center">
          <label className="w-1/3">Username</label>
          <input
            type="text"
            className="w-2/3 bg-secondaryLight font-normal py-2 rounded-lg"
            {...register("username", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div className="flex gap-x-3 w-full p-2 justify-end items-center">
          <label className="w-1/3">Email</label>
          <input
            type="email"
            className="w-2/3 bg-secondaryLight font-normal py-2 rounded-lg"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className="flex gap-x-3 w-full p-2 justify-end items-center">
          <label className="w-1/3">password</label>
          <input
            type="password"
            className="w-2/3 bg-secondaryLight font-normal py-2 rounded-lg"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <div className="flex gap-x-3 w-full p-2 justify-end items-center">
          <label className="w-1/3">confirm password</label>
          <input
            type="password"
            className="w-2/3 bg-secondaryLight font-normal py-2 rounded-lg"
            {...register("passwordConfirm", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <button
          className="bg-secondary p-2 rounded-lg text-white w-fit"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default SignIn_panel;
