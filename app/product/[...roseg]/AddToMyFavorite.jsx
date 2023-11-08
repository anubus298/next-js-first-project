"use client";
import { NotificationFavoriteCount } from "../../(navbarComponents)/FavoriteIcon";

import { ColorRing } from "react-loader-spinner";

import { useAtom } from "jotai";
import addToFavorite from "../../functions/addToFavorite";
import "@radix-ui/themes/styles.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
function AddToMyFavorite({ collectionName, id }) {
  const [isloading, setisloading] = useState(false);
  const router = useRouter();
  const [notifCount, setnotifCount] = useAtom(NotificationFavoriteCount);
  async function handleFavorite(collectionName, id) {
    setisloading(true);

    let res = await addToFavorite(collectionName, id);
    setisloading(false);

    if (res.status == 401) {
      router.push("/logIn/QCqsf8q9");
    }
    if (res.status == 200) {
      localStorage.setItem("NotificationFavoriteCount", Number(notifCount + 1));
      setnotifCount(notifCount + 1);
    }
    if (res.status == 400) {
    }
  }
  return (
    <button
      onClick={() => {
        handleFavorite(collectionName, id);
      }}
      className="bg-main w-1/5 text-white  flex justify-center items-center  transition rounded-lg md:rounded-e-none font-bold p-2"
    >
      {!isloading && (
        <FontAwesomeIcon icon={faHeart} className="text-red-600 " size="2x" />
      )}
      <ColorRing
        visible={isloading}
        height="25"
        width="25"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </button>
  );
}

export default AddToMyFavorite;
