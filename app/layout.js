import "public/css/globals.css";
import Navbar from "./Navbar";
import FooterComp from "./(footer)/Footer";

import { Ubuntu } from "next/font/google";
export const metadata = {
  title: "SafoMart",
  description: "Technology Market",
};
const mooli = Ubuntu({
  weight: ["400", "300", "500", "700"],
  subsets: ["latin"],
  style: ["normal"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mooli.className}>
        <Navbar />
        <div className="container mx-auto">
          {children}
        </div>
          <FooterComp />
      </body>
    </html>
  );
}
