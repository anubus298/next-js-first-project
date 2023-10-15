"use client";
import { Menu, Transition } from "@headlessui/react";
import { useState } from "react";
function Navbar_explore() {
  const [isShowing1, setIsShowing1] = useState(false);
  const [isShowing2, setIsShowing2] = useState(false);

  return (
    <div>
      <Menu>
        <Menu.Button
          onClick={() => setIsShowing1((isShowing1) => !isShowing1)}
          className="hover:text-secondary transition p-2 "
        >
          Explore
        </Menu.Button>

        <Menu.Items className="bg-secondary flex flex-col rounded-lg gap-y-4 p-4 absolute z-50">
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && "bg-main"}`} href="/account-settings">
                Mobile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && "bg-main"}`} href="/account-settings">
                Tablets
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && "bg-main"}`} href="/account-settings">
                TV & Homes
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && "bg-main"}`} href="/account-settings">
                PCs
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && "bg-main"}`} href="/account-settings">
                Accessories
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <Menu>
        <Menu.Button
          onClick={() => setIsShowing2((isShowing2) => !isShowing2)}
          className="hover:text-secondary transition p-2 "
        >
          Support
        </Menu.Button>

        <Menu.Items className="bg-secondary flex flex-col rounded-lg gap-y-4 p-4 absolute z-50">
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && "bg-main"}`} href="/account-settings">
                Who we are
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && "bg-main"}`} href="/account-settings">
                Work with us
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && "bg-main"}`} href="/account-settings">
                Feedback
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a className={`${active && "bg-main"}`} href="/account-settings">
                Product Support
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default Navbar_explore;
