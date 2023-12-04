import "./globals.css";
import NavbarJS from "./NavbarJS";
import FooterComp from "./(footer)/FooterJS";
import { Analytics } from "@vercel/analytics/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import StyledComponentsRegistry from "./(lib)/AntdRegistry";
import Providers from "./providers";
import JotaiProviders from "./jotaiProvider";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
export const metadata = {
  title: "SafoMart",
  description: "Technology Market",
};
const mooli = Poppins({
  weight: ["100", "100", "600", "200", "400", "700", "500", "300"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-Lato",
  preload: true,
});
import { Poppins } from "next/font/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${mooli.variable} ` + mooli.className}>
        <Providers>
          <JotaiProviders>
            <NavbarJS />
            <div className="container mx-auto ">
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </div>
          </JotaiProviders>
        </Providers>
        <FooterComp />
        <Analytics />
      </body>
    </html>
  );
}
