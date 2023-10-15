"use client";
import { useEffect, useState } from "react";
import { Form } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { Menu, Transition } from "@headlessui/react";

function AddToMyCart({ price }) {
  const [count, setcount] = useState(1);
  useEffect(() => {
    setcount(1);
  }, []);
  const [open, setopen] = useState(false);
  function closing() {
    return 0;
  }
  return (
    <>
      <div className="bg-main transition w-full p-5 px-8  text-white flex gap-2 flex-col font-bold select-none">
        <button
          onClick={() => setopen(false)}
          className="bg-secondary hover:bg-secondaryLight hover:text-black transition rounded-lg font-bold p-2"
        >
          <p>ADD TO CART</p>
        </button>
      </div>
    </>
  );
}

export default AddToMyCart;
