"use client";
import { Footer } from "flowbite-react";

function FooterComp() {
  return (
    <Footer container={true} className="bg-main  rounded-none mt-16 font-bold">
      <div className="w-full text-center text-white">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between ">
          <Footer.LinkGroup>
            <Footer.Link className="mx-2" href="/aboutUs" >
              About us
            </Footer.Link>
            <Footer.Link className="mx-2" href="/privacy" >
              Privacy Policy
            </Footer.Link>
            <Footer.Link className="mx-2" href="/ads">
              Ads
            </Footer.Link>
            <Footer.Link className="mx-2" href="/contact" >
              Contact
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          href="#"
          by=" SafoMart"
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
}

export default FooterComp;
