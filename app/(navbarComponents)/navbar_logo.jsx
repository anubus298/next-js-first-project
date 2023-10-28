"use client";
import Image from "next/image";
function Navbar_logo() {
  return (
    <a href="/" className="cursor-pointer" >
      
      <Image
        src={"/logo.svg"}
        width={200}
        height={200}
        alt="SafoMart"
      />
    </a>
  );
}

export default Navbar_logo;
