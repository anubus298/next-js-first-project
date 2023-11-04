"use client";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

function Navbar_sign_in() {
  const router = useRouter();
  return (
    <div
      className=" px-2 rounded-lg cursor-pointer text-secondarySecondary"
      onClick={() => router.push("/signIn/fgd")}
    >
      <FontAwesomeIcon icon={faUserPlus} size="1x" className="hover:text-secondary transition" />
    </div>
  );
}

export default Navbar_sign_in;
