"use client";
import Confetti from "react-confetti";
import Link from "next/link";
import { useRef } from "react";

function Order_Confirmation({ data }) {
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
      <p class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4">
        🎉 <strong>Thank You for Your Purchase!</strong> 🎉
        <br />
        Congratulations! Your payment has been successfully processed,
        <br />
        and your order is confirmed. We appreciate your business
        <br />
        and can&apos;t wait for you to enjoy your new products
        <br />
        <br />
        <strong>Order Details:</strong>
        <br />- Order Number: <span class="font-bold">[XXXXXX]</span>
        <br />- Date: <span class="font-bold">[Date]</span>
        <br />- Total Amount: <span class="font-bold">[Amount]</span>
        <br />
        <br />
        <strong>Shipping Information:</strong>
        <br />
        Your <span class="font-bold">[product/service]</span> will be shipped
        to:
        <br />
        [Customer Name]
        <br />
        [Shipping Address]
        <br />
        <br />
        <strong>Estimated Delivery Time:</strong>
        <br />
        [Provide an estimated delivery time if applicable]
        <br />
        <br />
        <strong>Track Your Order:</strong>
        <br />
        Thank you for your purchase! To stay updated on the status of your order
        <br />
        and track your products in real-time by clicking the commands icon
        <br />
        tracking regularly.
        <br />
        <br />
        If you have any questions or need assistance,
        <br /> feel free to contact our customer support at
        <span class="font-semibold text-secondary">
          <Link href={"/support"}> Support page</Link>
        </span>
        <br />
        <br />
        Thank you again for choosing
        <span class="font-extrabold"> Safomart</span>.<br /> We hope you have a
        fantastic experience with your purchase!
      </p>
    </div>
  );
}

export default Order_Confirmation;
