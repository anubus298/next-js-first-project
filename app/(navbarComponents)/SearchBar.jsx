"use client";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function SearchBar() {
  const [value, setvalue] = useState("");
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = (data) => {
    router.push("/search?for=" + data.search.split(" ").join("+"));
  };
  return (
    searchParams == "" && (
      <div className="rounded-lg bg-white p-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center font-lato"
        >
          <input
            type="text"
            name="searchValue"
            autoComplete="off"
            onChange={(e) => setvalue(e.target.value)}
            className="placeholder:bg-white placeholder:font-lato placeholder:text-lg text-lg p-2 md:py-0 md:pe-0 md:ps-1 focus-visible:outline-none text-main placeholder:text-gray-500  w-full md:w-auto"
            placeholder="Search"
            {...register("search", { required: true })}
          />
          <button type="submit" className="text-main cursor-pointer">
            <FontAwesomeIcon icon={faSearch} size="1x" />
          </button>
        </form>
      </div>
    )
  );
}

export default SearchBar;
