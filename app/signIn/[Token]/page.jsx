import { Sigmar } from "next/font/google";
import PocketBase from "pocketbase";
import SignIn_panel from "./(loginComponents)/signIn_panel";
function Page({ params }) {
  const pb = new PocketBase("http://127.0.0.1:8090");

  return (
    <div className="flex justify-center items-center w-full bg-main  p-5 sm:p-10 ">
      <SignIn_panel />
    </div>
  );
}

export default Page;
