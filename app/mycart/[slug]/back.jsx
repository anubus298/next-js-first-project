"use client";
import { useRouter } from "next/navigation";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BackComp() {
  const router = useRouter();
  return (
    <button
      className="bg-main px-5 py-2 w-full md:w-auto cursor-pointer flex justify-center text-white flex items-center gap-x-3 md:rounded-t-lg"
      onClick={() => router.back()}
    >
      <FontAwesomeIcon icon={faArrowLeft} className="font-semibold" />
      <p className="font-semibold">BACK</p>
    </button>
  );
}

export default BackComp;
