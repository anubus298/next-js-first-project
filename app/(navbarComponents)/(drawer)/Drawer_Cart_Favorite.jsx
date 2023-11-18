"use client";
import { useAtom } from "jotai";
import { CartIcon } from "../../(navbarComponents)/cartIcon";
import FavoriteIcon from "../../(navbarComponents)/FavoriteIcon";
import { isValidAtom } from "../navbar_user_icon";
function Drawer_Cart_Favorite() {
  const [isValid, setIsvalid] = useAtom(isValidAtom);
  return (
    isValid && (
      <div className="w-full flex items-center gap-x-4 justify-center text-white">
        <CartIcon size="2x" />
        <FavoriteIcon size="2x" />
      </div>
    )
  );
}

export default Drawer_Cart_Favorite;
