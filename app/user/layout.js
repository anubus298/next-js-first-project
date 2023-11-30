import BackComp from "../mycart/[slug]/back";
import UserSidePanel from "./userSidePanel";
import VerticalTitle from "./verticalTitle";
export default function RootLayout({ children }) {
  return (
    <>
      <BackComp />
      <div className="flex w-full flex-col md:flex-row">
        <div className="w-full  bg-main md:w-2/12">
          <UserSidePanel />
        </div>
        <div className="w-full md:w-10/12">
          <VerticalTitle />
          {children}
        </div>
      </div>
    </>
  );
}
