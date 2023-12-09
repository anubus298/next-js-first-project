"use client"
import Image from "next/image";
import Link from "next/link";

function Navbar_logo({height,width}) {
  return (
    <Link href="/" className="cursor-pointer">
      <Image
        className="w-auto"
        src={"/logo.svg"}
        width={height}
        quality={100}
        height={width}
        alt="SafoMart logo"
      />
    </Link>
  );
}

export default Navbar_logo;
