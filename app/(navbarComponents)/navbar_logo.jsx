"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
function Navbar_logo() {
  const router = useRouter();
  return (
    <div className="cursor-pointer" onClick={() => router.push("/")}>
      
      <Image
        src={"/logo.svg"}
        width={200}
        height={200}
        alt="SafoMart"
      />
    </div>
  );
}

export default Navbar_logo;
