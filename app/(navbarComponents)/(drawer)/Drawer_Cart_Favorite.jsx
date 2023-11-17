"use client";
import { CartIcon } from "../../(navbarComponents)/cartIcon";
import FavoriteIcon from "../../(navbarComponents)/FavoriteIcon";
function Drawer_Cart_Favorite() {
  return (
    <div className="w-full flex items-center gap-x-4 justify-center text-white">
      <CartIcon size="2x" />
      <FavoriteIcon size="2x" />
    </div>
  );
}

export default Drawer_Cart_Favorite;
