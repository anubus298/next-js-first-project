"use client";
import { useContext } from "react";
import { CartIcon } from "../../(navbarComponents)/cartIcon";
import FavoriteIcon from "../../(navbarComponents)/FavoriteIcon";
import { AuthContext } from "../../(lib)/context-provider";

function Drawer_Cart_Favorite() {
  const { isValid, setisValid } = useContext(AuthContext);
  return (
    isValid && (
      <div className="w-full flex items-center gap-x-4 justify-center text-white">
        <CartIcon size="2x" />
      </div>
    )
  );
}

export default Drawer_Cart_Favorite;
