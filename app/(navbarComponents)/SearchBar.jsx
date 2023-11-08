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
  const [width, setwidth] = useState(0);
  const searchParams = useSearchParams();
  useEffect(() => {
    setwidth(document.documentElement.clientWidth);
  }, []);
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
    width > 750 &&
    searchParams == "" && (
      <div className="rounded-lg bg-white p-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="searchValue "
            onChange={(e) => setvalue(e.target.value)}
            className="placeholder:bg-white ps-1 focus-visible:outline-none text-main placeholder:text-gray-500  "
            placeholder="Search"
            {...register("search", { required: true })}
          />
          <button
            type="submit"
            className="text-main cursor-pointer hover:text-secondary transition"
            href={"/search?for=" + value.split(" ").join("+")}
          >
            <FontAwesomeIcon icon={faSearch} size="1x" />
          </button>
        </form>
      </div>
    )
  );
}

export default SearchBar;
