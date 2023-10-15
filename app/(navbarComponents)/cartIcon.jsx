import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CartIcon() {
const pb = new PocketBase("http://127.0.0.1:8090");
const router = useRouter();
  return (  
    <div className=" px-2 flex items-center gap-x-1 ">
      <FontAwesomeIcon
        icon={faCartShopping}
        className="cursor-pointer hover:text-secondary transition"
        onClick={() =>
          router.push(`/mycart/${pb.authStore.token.slice(0, 10)}`)
        }
      />
    </div>
  );
}

export default CartIcon;
