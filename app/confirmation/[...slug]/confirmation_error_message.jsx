"use client";
import Image from "next/image";
import Link from "next/link";
function Confirmation_error_message() {
  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center bg-secondarySecondarylight">
      <div className="text-sm  p-4 w-full md:w-4/12 text-center rounded-xl flex flex-col items-center justify-center gap-1">
        <Image height={300} width={350} alt="success" src={"/Code.png"} />
        <p className="font-semibold text-xl">
          Unfortunately, there was an error during the validation process for
          your email.
        </p>
        <p className="text-red-700">
          We apologize, but there was an issue confirming your email address.
          Please review your information and try again to access our services.
        </p>
        <Link href={"/"} className="font-medium">
          To Home page
        </Link>
      </div>
    </div>
  );
}

export default Confirmation_error_message;
