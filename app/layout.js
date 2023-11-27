import "./globals.css";
import NavbarJS from "./NavbarJS";
import FooterComp from "./(footer)/FooterJS";
import { Lato } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import StyledComponentsRegistry from "./(lib)/AntdRegistry";
import Providers from "./providers";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
export const metadata = {
  title: "SafoMart",
  description: "Technology Market",
};
const mooli = Lato({
  weight: ["400", "700","100", "300", "900"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-Lato",
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${mooli.variable} ` + mooli.className}>
        <Providers>
          <NavbarJS />
          <div className="container mx-auto ">
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </div>
        </Providers>
        <FooterComp />
      </body>
    </html>
  );
}
