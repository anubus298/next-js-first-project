"use client";
import PocketBase from "pocketbase";
import { Checkbox } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { getCookie } from "../../../functions/cookiesFunctions";
import { useState } from "react";
import { useAtom } from "jotai";
import { isValidAtom } from "../../../(navbarComponents)/navbar_user_icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function Login_panel() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const pb = new PocketBase("http://127.0.0.1:8090");
  const [errorMsg, setErrorMsg] = useState("");
  const [isValid, setIsvalid] = useAtom(isValidAtom);
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      setErrorMsg("");
      const res = await fetch("http://localhost:8000/api/signIn", {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(data),
        headers: {
          remember: data.remember,
        },
      });
      if (res.status == 200) {
        pb.authStore.loadFromCookie(getCookie("pb_auth"));
        try {
          pb.authStore.isValid && (await pb.collection("users").authRefresh());
        } catch (_) {
          pb.authStore.clear();
        }
        setIsvalid(true);
        router.push("/");
      } else throw new Error();
    } catch (e) {
      console.log(e);
      setErrorMsg("error : " + e);
    }
  };
  return (
    <div className="bg-secondarySecondarylight rounded-lg px-6 h-[620px] w-full md:w-1/2  sm:px-10 flex flex-col justify-evenly  text-main text-center font-bold select-none">
      <div className=" text-center md:text-start">
        <p className="text-2xl md:text-4xl mb-2">Create an account</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-5 justify-center items-center "
      >
        <div className="flex gap-x-3 w-full p-2 justify-start items-center">
          <input
            autoComplete="off"
            type="text"
            placeholder="username"
            className="w-full text-lg text-white bg-secondary font-normal py-2 md:py-4 px-3 rounded-md  placeholder:text-red-200 focus-visible:outline-none"
            {...register("username", { required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        <div className="flex gap-x-3 w-full p-2 justify-start items-center">
          <input
            autoComplete="off"
            type="email"
            placeholder="email"
            className="w-full text-lg text-white bg-secondary font-normal py-2 md:py-4 px-3 rounded-md  placeholder:text-red-200 focus-visible:outline-none"
            {...register("email", { required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>

        <div className="flex gap-x-3 w-full p-2 justify-start items-center">
          <input
            autoComplete="off"
            type="password"
            placeholder="password"
            className="w-full text-lg text-white bg-secondary font-normal py-2 md:py-4 px-3 rounded-md placeholder:text-red-200 focus-visible:outline-none"
            {...register("password", { required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        <div className="flex gap-x-3 w-full p-2 justify-start items-center">
          <input
            autoComplete="off"
            type="password"
            placeholder="confirm password"
            className="w-full text-lg text-white bg-secondary font-normal py-2 md:py-4 px-3 rounded-md placeholder:text-red-200 focus-visible:outline-none"
            {...register("passwordConfirm", { required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </div>
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}

        <div className="flex-col flex w-full justify-between space-y-3">
          <div className="flex  items-center space-x-2">
            <Checkbox color="red" {...register("Term", { required: true })} />
            <p>
              Accept
              <span className="cursor-pointer">
                <a href="/termOfUse "> term of use</a>
              </span>
            </p>
          </div>
          <div className="flex  items-center space-x-2">
            <Checkbox
              color="red"
              {...register("Subscibe", { required: false })}
            />
            <p>Subscribe to email notifications</p>
          </div>
        </div>
        <button
          className="bg-main hover:bg-gray-950 transition p-2 rounded-lg text-white w-full"
          type="submit"
        >
          create account
        </button>
      </form>
      <div className="flex justify-start w-full">
        <a
          href="/Login/new"
          className=" p-2 rounded-lg text-main hover:text-gray-900 transition w-fit flex items-center space-x-2"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <p>Log in instead</p>
        </a>
      </div>
    </div>
  );
}
export default Login_panel;

// "use client";
// import PocketBase from "pocketbase";
// import { setCookie } from "../../../functions/cookiesFunctions";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAtom } from "jotai";
// import { isValidAtom } from "../../../(navbarComponents)/navbar_user_icon";
// function SignIn_panel() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const pb = new PocketBase("http://127.0.0.1:8090");
//   const router = useRouter();
//   const [isValid, setIsvalid] = useAtom(isValidAtom);

//   const [errorMsg, setErrorMsg] = useState("");
//   const onSubmit = async (data) => {
//     try {
//       setErrorMsg("")
//       await pb.collection("users").create(data);
//       await pb.collection('users').requestVerification(data.email);
//       if (pb.authStore.isValid) {
//         setIsvalid(true);
//         document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
//       }
//     } catch (e) {
//       setErrorMsg("Error : " + e);
//     }
//     router.push("/");

//   };
//   return (
//     <div className="bg-secondarySecondarylight rounded-lg p-6  sm:p-10 flex flex-col justify-center text-main text-center font-bold">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col gap-y-5 justify-center items-center"
//       >
//         <div className="flex gap-x-3 w-full p-2 justify-end items-center">
//           <label className="w-1/3">Username</label>
//           <input
//             type="text"
//             className="w-2/3 bg-secondaryLight font-normal py-2 rounded-lg"
//             {...register("username", { required: true })}
//           />
//           {errors.email && <span>This field is required</span>}
//         </div>
//         <div className="flex gap-x-3 w-full p-2 justify-end items-center">
//           <label className="w-1/3">Email</label>
//           <input
//             type="email"
//             className="w-2/3 bg-secondaryLight font-normal py-2 rounded-lg"
//             {...register("email", { required: true })}
//           />
//           {errors.email && <span>This field is required</span>}
//         </div>

//         <div className="flex gap-x-3 w-full p-2 justify-end items-center">
//           <label className="w-1/3">password</label>
//           <input
//             type="password"
//             className="w-2/3 bg-secondaryLight font-normal py-2 rounded-lg"
//             {...register("password", { required: true })}
//           />
//           {errors.password && <span>This field is required</span>}
//         </div>
//         <div className="flex gap-x-3 w-full p-2 justify-end items-center">
//           <label className="w-1/3">confirm password</label>
//           <input
//             type="password"
//             className="w-2/3 bg-secondaryLight font-normal py-2 rounded-lg"
//             {...register("passwordConfirm", { required: true })}
//           />
//           {errors.password && <span>This field is required</span>}
//         </div>
//         {errorMsg && <p className="text-red-600">{errorMsg}</p>}

//         <button
//           className="bg-secondary p-2 rounded-lg text-white w-fit"
//           type="submit"
//         >
//           Sign in
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignIn_panel;
