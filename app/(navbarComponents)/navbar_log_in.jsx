"use client";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
function Navbar_log_in() {
  const router = useRouter();
  return (
    <div
      className="bg-secondarySecondarylight px-2 py-1 rounded-lg cursor-pointer text-main"
      onClick={() => router.push("/logIn/pch46f5f6qqaaz=")}
    >
      <FontAwesomeIcon icon={faRightToBracket} size="1x" className="hover:text-secondary transition" />
    </div>
  );
}

export default Navbar_log_in;
