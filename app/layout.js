import "./globals.css";
import NavbarServer from "./NavbarServer";
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
  title: {
    template: "SafoMart | %s",
    default: "SafoMart",
  },
  description:
    "Discover the Latest Tech Gadgets, Electronics, and Innovations at Unbeatable Prices!",
  keywords: [
    "technology",
    "gadgets",
    "electronics",
    "innovation",
    "online marketplace",
    "smart devices",
    "wearables",
    "consumer electronics",
    "tech deals",
    "future tech",
    "digital innovation",
    "gaming gear",
    "cutting-edge tech",
    "virtual reality",
    "drones",
    "smart home",
    "wearable tech",
    "STEM education",
    "robotics",
    "Internet of Things",
  ],
  author: "SafoMart Team",
};
const mooli = Poppins({
  weight: ["300", "100", "100", "600", "200", "400", "700", "500", "300"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-Lato",
  preload: true,
});
import { Poppins } from "next/font/google";
import Image from "next/image";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${mooli.variable} ` + mooli.className + " relative"}>
        <Providers>
          <JotaiProviders>
            <NavbarServer />
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
