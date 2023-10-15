'use client'
import { useRouter } from "next/navigation";
    
function Navbar_sign_in() {
    const router = useRouter()
    return ( <div className=" px-2 rounded-lg cursor-pointer text-secondarySecondary" onClick={()=>router.push('/signIn/fgd')}>
        <p>Sign in</p>
    </div> );
}

export default Navbar_sign_in;