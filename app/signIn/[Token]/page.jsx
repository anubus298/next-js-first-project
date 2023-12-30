import SignIn_panel from "./(loginComponents)/signIn_panel";
import Image from "next/image";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "../../../public/css/theme-config.css";
export const metadata = {
  title: 'Sign In',
}
function Page() {
  return (
    <Theme>
      <div className="flex items-center justify-around w-full h-full p-5 sm:my-10 ">
        <SignIn_panel />
        <Image
          className="hidden md:block"
          alt="woman shopping"
          sizes={"(max-width : 767px) 0vw"}
          height={450}
          width={450}
          src="/loginPage/134.png"
        />
      </div>
    </Theme>
  );
}

export default Page;
