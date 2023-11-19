"use client";
import { Footer } from "flowbite-react";

function FooterComp() {
  return (
    <Footer container={true} className="bg-main  rounded-none mt-16 font-semibold">
      <div className="w-full text-center ">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between ">
          <Footer.LinkGroup>
            <Footer.Link className="mx-2 text-white" href="/aboutUs" >
              About us
            </Footer.Link>
            <Footer.Link className="mx-2 text-white" href="/privacy" >
              Privacy Policy
            </Footer.Link>
            <Footer.Link className="mx-2 text-white" href="/ads">
              Ads
            </Footer.Link>
            <Footer.Link className="mx-2 text-white" href="/contact" >
              Contact
            </Footer.Link>
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
