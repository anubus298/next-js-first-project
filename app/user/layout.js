import BackComp from "../mycart/[slug]/back";

export default function RootLayout({ children }) {
  return (
    <>
      <BackComp />
      <div className="flex w-full">
        <div className="h-[600px] bg-main w-3/12"></div>
        <div className="w-9/12">{children}</div>
      </div>
    </>
  );
}
