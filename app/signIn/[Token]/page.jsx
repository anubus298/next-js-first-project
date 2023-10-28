import SignIn_panel from "./(loginComponents)/signIn_panel";
import Image from "next/image";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "../../../public/css/theme-config.css";
function Page() {
  return (
    <Theme>
      <div className="flex justify-around items-center w-full h-full  p-5 sm:my-10 ">
        <SignIn_panel />
        <Image
          alt="woman shopping"
          height={450}
          width={450}
          src="/loginPage/134.png"
        />
      </div>
    </Theme>
  );
}

export default Page;
