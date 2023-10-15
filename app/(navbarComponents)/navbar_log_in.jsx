'use client'
import { useRouter } from "next/navigation";
function Navbar_log_in() {
    const router = useRouter()
    return ( <div className="bg-secondarySecondarylight p-2 rounded-lg cursor-pointer text-main" onClick={()=>router.push('/logIn/pch46f5f6qqaaz=')}>
        <p>Log in</p>
    </div> );
}

export default Navbar_log_in;