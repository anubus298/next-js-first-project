import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function CartIcon() {
  return (
    <a
      href="/mycart/user"
      className=" mx-2 flex items-center gap-x-1 cursor-pointer"
    >
      <FontAwesomeIcon
        icon={faCartShopping}
        className=" hover:text-secondary transition"
      />
    </a>
  );
}

export default CartIcon;
