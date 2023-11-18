import "public/css/globals.css";
import NavbarJS from "./Navbar"
import FooterComp from "./(footer)/Footer";

import { Lato } from "next/font/google";
export const metadata = {
  title: "SafoMart",
  description: "Technology Market",
};
const mooli = Lato({
  weight: ["100", "400", "900", "300", "700"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-Lato",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${mooli.variable} ` + mooli.className}>
        <NavbarJS />
        <div className="container mx-auto ">{children}</div>
        <FooterComp />
      </body>
    </html>
  );
}
