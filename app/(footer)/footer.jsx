"use client";
import { Footer } from "flowbite-react";

function FooterComp() {
  return (
    <Footer container={true} className="bg-main text-white rounded-none mt-16 font-bold">
      <div className="w-full text-center ">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between ">
          <Footer.LinkGroup>
            <Footer.Link className="mx-2" >
              About us
            </Footer.Link>
            <Footer.Link className="mx-2" >
              Privacy Policy
            </Footer.Link>
            <Footer.Link className="mx-2" >
              Ads
            </Footer.Link>
            <Footer.Link className="mx-2" >
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
