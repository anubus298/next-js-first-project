"use client";

import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

function Refresh() {
  const router = useRouter();
  return (
    <div className="w-[50px] h-[50px] p-2 text-main flex justify-center items-center self-end absolute left-0 bottom-0">
      <FontAwesomeIcon
        icon={faRefresh}
        className="cursor-pointer text-xl"
        onClick={() => router.refresh()}
      />
    </div>
  );
}

export default Refresh;
