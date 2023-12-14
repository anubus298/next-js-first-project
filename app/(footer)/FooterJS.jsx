"use client";
import { Footer } from "flowbite-react";
import Link from "next/link";

function FooterComp() {
  return (
    <Footer
      container={true}
      className="mt-16 font-semibold rounded-none bg-main"
    >
      <div className="w-full text-center ">
        <div className="justify-between w-full sm:flex sm:items-center sm:justify-between ">
          <Footer.LinkGroup>
            <Link className="mx-2 text-white" href="/info/aboutUs">
              About us
            </Link>
            <Link className="mx-2 text-white" href="/info/privacyPolicy">
              Privacy Policy
            </Link>
            <Link className="mx-2 text-white" href="/info/contact">
              Contact
            </Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          href="#"
          className="text-white"
          by=" SafoMart"
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
}

export default FooterComp;
