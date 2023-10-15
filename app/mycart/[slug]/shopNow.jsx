'use client'
import { useRouter } from "next/navigation";

function ShopNow() {
const router = useRouter()
    return (
    <button className="bg-black py-2 px-4 text-lg font-semibold rounded-lg text-secondarySecondarylight my-4" onClick={()=>router.push('/')}>
      Shop now
    </button>
  );
}

export default ShopNow;
