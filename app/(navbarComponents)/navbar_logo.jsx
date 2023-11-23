"use client"
import Image from "next/image";
import Link from "next/link";

function Navbar_logo() {
  return (
    <Link href="/" className="cursor-pointer">
      <Image
        className="w-auto"
        src={"/logo.svg"}
        width={200}
        height={200}
        alt="SafoMart"
      />
    </Link>
  );
}

export default Navbar_logo;
