"use client";

import Image from "next/image";
import Link from "next/link";

function ConfirmationIcon({ statue }) {
  return (
    statue == "success" && (
      <div className="w-full h-[90vh] flex flex-col justify-center items-center bg-secondarySecondarylight">
        <div className="text-sm bg-white p-4 w-full md:w-4/12 text-center rounded-xl flex flex-col items-center justify-center gap-1">
          <Image height={300} width={350} alt="success" src={"/Taskdone.png"} />
          <p className="font-semibold text-xl">
            Your email has been successfully validated.
          </p>
          <p className="text-green-700">
            Thank you for confirming your email address. You are now all set to
            enjoy our services to the fullest.
          </p>
          <Link href={"/logIn/QDAZF?c=1"} className="font-medium">
            To login Page
          </Link>
        </div>
      </div>
    )
  );
}

export default ConfirmationIcon;
