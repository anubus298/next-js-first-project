"use client";
import Confetti from "react-confetti";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

function Order_Confirmation() {
  const pallete = useRef(null);
  return (
    <div
      ref={pallete}
      className="w-full relative min-h-[450px] overflow-hidden bg-secondarySecondarylight p-4 font-semibold mt-5 flex justify-center items-center"
    >
      <Confetti
        numberOfPieces={400}
        recycle={false}
        className="left-1/2 -translate-x-1/2"
        width={pallete.clientWidth}
        height={pallete.clientHeight}
      />
      <div className=" p-4 text-center  items-center flex flex-col select-none gap-2">
        <Image width={300} height={300} alt="success" src={"/Taskdone.png"} />
        <p className=" text-5xl font-extrabold">Your order is complete !</p>
        <button className="bg-secondaryYellow p-3 hover:bg-yellow-300 transition rounded-md items-center gap-1 flex">
          <FontAwesomeIcon icon={faNoteSticky} />
          <p>Download bill Pdf</p>
        </button>
        <p className="text-green-700 text-sm">
          Your payment has been successfully processed, and your order is
          confirmed. We appreciate your business.
        </p>
        <p className="text-green-700 text-sm">
          You can track your products in real-time by clicking the{" "}
          <span>
            <FontAwesomeIcon icon={faBox} />{" "}
          </span>
          icon.
        </p>
        <p className="text-green-900">
          {" "}
          If you have any questions or need assistance,
          <br /> feel free to contact our customer support at
          <Link href={"/support"}> Support page</Link>
        </p>
        <Link href={"/"}>Back to main page</Link>
      </div>
    </div>
  );
}

export default Order_Confirmation;

{
  /* <br />
Congratulations! Your payment has been successfully processed,
<br />
and your order is confirmed. We appreciate your business
<br />
and can&apos;t wait for you to enjoy your new products
<br />
<br />
To stay updated on the status of your order
<br />
and track your products in real-time by clicking the commands icon
<br />
tracking regularly. or
<Link className="font-bold text-secondary" href={"/commands"}>
   Click here
</Link>
<br />
<br />
If you have any questions or need assistance,
<br /> feel free to contact our customer support at
<span className="font-semibold text-secondary">
  <Link href={"/support"}> Support page</Link>
</span>
<br />
<br />
Thank you again for choosing
<span className="font-extrabold text-lg"> Safomart</span>.<br /> We hope you
have a fantastic experience with your purchase!
<br />
<Link className="font-black" href="/">
  Go back to main page
</Link> */
}
