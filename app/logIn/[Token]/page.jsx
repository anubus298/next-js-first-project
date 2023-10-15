import PocketBase from "pocketbase";
import Login_panel from "./(loginComponents)/login_panel";
function Page({ params }) {
  const pb = new PocketBase("http://127.0.0.1:8090");

  return (
    <div className="flex justify-center items-center w-full bg-main  p-5 sm:p-10 ">
      <Login_panel/>
    </div>
  );
}

export default Page;
