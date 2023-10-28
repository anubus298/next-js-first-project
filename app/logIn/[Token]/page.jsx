import Image from "next/image";
import Login_panel from "./(loginComponents)/login_panel";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import "../../../public/css/theme-config.css";
function Page() {

  return (
    <Theme>
      <div className="flex justify-around items-center w-full h-full  p-5 sm:p-10 ">
        <Image
          alt="woman shopping"
          height={450}
          width={450}
          src="/loginPage/x35.png"
        />
        <Login_panel />
      </div>
    </Theme>
  );
}

export default Page;
