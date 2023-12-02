import BackComp from "../mycart/[slug]/back";
import UserSidePanel from "./userSidePanel";
import VerticalTitle from "./verticalTitle";
export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col bg-secondarySecondarylight">
      <VerticalTitle />
      <div className="flex w-full flex-col md:flex-row ">
        <div className="w-full md:w-3/12">
          <UserSidePanel />
        </div>
        <div className="w-full md:w-9/12">{children}</div>
      </div>
    </div>
  );
}
