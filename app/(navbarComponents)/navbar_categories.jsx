"use client";
import { Menu, Transition } from "@headlessui/react";
import { useState } from "react";
function Navbar_categories() {
  const [isShowing1, setIsShowing1] = useState(false);
  const [isShowing2, setIsShowing2] = useState(false);

  return (
    <div className="flex ">
      <Menu className="relative" as={"menu"}>
        <Menu.Button
          onClick={() => setIsShowing1((isShowing1) => !isShowing1)}
          className="hover:text-secondary transition p-2 "
        >
          Categories
        </Menu.Button>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="bg-secondary flex flex-col rounded-lg gap-y-4 p-4 absolute  w-[150px] left-0 z-50">
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-main"}`}
                  href="/productsSection/Mobile"
                >
                  Mobile
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-main"}`}
                  href="/productsSection/Tablets"
                >
                  Tablets
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-main"}`}
                  href="/productsSection/TVHomes"
                >
                  TV & Homes
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-main"}`}
                  href="/productsSection/PCs"
                >
                  PCs
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-main"}`}
                  href="/productsSection/Accessories"
                >
                  Accessories
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu className="relative" as={"menu"}>
        <Menu.Button
          onClick={() => setIsShowing2((isShowing2) => !isShowing2)}
          className="hover:text-secondary transition p-2 "
        >
          Support
        </Menu.Button>
        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="bg-secondary flex flex-col rounded-lg gap-y-4 p-4 absolute left-0 w-[150px] z-50">
            <Menu.Item>
              {({ active }) => (
                <a className={`${active && "bg-main"}`} href="/WhoWeAre">
                  Who we are
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a className={`${active && "bg-main"}`} href="/WorkWithUs">
                  Work with us
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a className={`${active && "bg-main"}`} href="/Feedback">
                  Feedback
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a className={`${active && "bg-main"}`} href="/ProductSupport">
                  Product Support
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default Navbar_categories;
