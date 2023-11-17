"use client";
import { useForm } from "react-hook-form";
function Step1() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {};
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-5 justify-center items-center "
    >
      <div className="flex gap-x-3 w-full p-2 justify-start items-center">
        <input
          autoComplete="off"
          type="text"
          placeholder="First name"
          className="w-full text-lg text-white bg-secondary font-normal py-2 md:py-4 px-3 rounded-md  placeholder:text-red-200 focus-visible:outline-none"
          {...register("FirstName", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
      </div>
      <div className="flex gap-x-3 w-full p-2 justify-start items-center">
        <input
          autoComplete="off"
          type="text"
          placeholder="Last name"
          className="w-full text-lg text-white bg-secondary font-normal py-2 md:py-4 px-3 rounded-md  placeholder:text-red-200 focus-visible:outline-none"
          {...register("LastName", { required: true })}
        />
        {errors.exampleRequired && <span>This field is required</span>}
      </div>
    </form>
  );
}

export default Step1;
