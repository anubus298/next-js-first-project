"use client";
import {
  faMobile,
  faTv,
  faLaptop,
  faGlasses,
  faTablet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
function Navbar_categories() {
  return (
    <div className="flex ">
      <Menu className="relative" as={"menu"}>
        <Menu.Button className="hover:text-secondary transition p-2 ">
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
                  className={`${
                    active && "bg-main"
                  } flex items-center space-x-3 p-1 rounded-lg transition`}
                  href="/productsSection/Mobiles"
                >
                  <FontAwesomeIcon icon={faMobile} />
                  <p>Mobiles</p>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active && "bg-main"
                  } flex items-center space-x-3 p-1 rounded-lg transition`}
                  href="/productsSection/Tvs"
                >
                  <FontAwesomeIcon icon={faTv} />
                  <p>TVs</p>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active && "bg-main"
                  } flex items-center space-x-3 p-1 rounded-lg transition`}
                  href="/productsSection/Tablets"
                >
                  <FontAwesomeIcon icon={faTablet} />
                  <p>Tablets</p>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active && "bg-main"
                  } flex items-center space-x-3 p-1 rounded-lg transition`}
                  href="/productsSection/Laptops"
                >
                  <FontAwesomeIcon icon={faLaptop} />
                  <p>Laptops</p>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active && "bg-main"
                  } flex items-center space-x-3 p-1 rounded-lg transition`}
                  href="/productsSection/Accessories"
                >
                  <FontAwesomeIcon icon={faGlasses} />
                  <p>Accessories</p>
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu className="relative" as={"menu"}>
        <Menu.Button className="hover:text-secondary transition p-2 ">
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
          <Menu.Items className="bg-secondary flex flex-col rounded-lg gap-y-4 p-4 absolute left-0 w-[180px] z-50">
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active && "bg-main"
                  } transition p-1 rounded-lg `}
                  href="/WhoWeAre"
                >
                  Who we are
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-main"} transition p-1 rounded-lg`}
                  href="/WorkWithUs"
                >
                  Work with us
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-main"} transition p-1 rounded-lg`}
                  href="/Feedback"
                >
                  Feedback
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${active && "bg-main"} transition p-1 rounded-lg`}
                  href="/ProductSupport"
                >
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
