import Navbar_explore from "./(navbarComponents)/navbar_explore";
import Navbar_logo from "./(navbarComponents)/navbar_logo";
import Account_logic from "./(navbarComponents)/account_logic";
import Navbar_ship_to_region from "./(navbarComponents)/navbar_ship_to_region";
import ShowAuth from "./ShowAuth";

function Navbar() {
  return (
    <div className="bg-main rounded-t-lg  text-secondarySecondarylight w-full justify-between flex gap-x-5 p-5 mb-10 items-center  font-semibold  mt-2  ">
      <div className="flex items-center gap-x-5">
        <Navbar_logo />
        <Navbar_ship_to_region />
      </div>
      <div className="flex items-center gap-x-5">
        <Navbar_explore />
        <ShowAuth/>
        <Account_logic />
      </div>
    </div>
  );
}

export default Navbar;
