import React, { useEffect, Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { BsCartCheckFill, BsSearch } from "react-icons/bs";
import { FaCouch } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaUserSecret,
  FaInfoCircle,
  FaHouseUser,
  FaFileAlt,
} from "react-icons/fa";
import { AiOutlineGift, AiOutlineInfoCircle } from "react-icons/ai"; // Pour AiOutlineGift

import logo from "../../assets/images/logo.png";
import LogoutIcon from "../../assets/icons/logout.svg";
import { FaFileCode } from "@fortawesome/free-solid-svg-icons"; // Make sure this is imported at the top of your file

import { MdSchedule, MdContacts, MdOutlineWeb } from "react-icons/md";

const navigation = [
  { name: "Dashboard", href: "/dash-gerant", icon: HiViewGrid, current: true },
  {
    name: "Coach",
    href: "/coach",
    icon: FaUserSecret,
    current: false,
  },
  {
    name: "Accueil",
    href: "/accueil",
    icon: FaHouseUser,
    current: false,
  },

  {
    name: "AboutUs",
    href: "/aboutus",
    icon: FaInfoCircle,
    current: false,
  },

  {
    name: "Programme",
    href: "/program",
    icon: FaFileAlt,
    current: false,
  },
  {
    name: "Gestion Membres",
    href: "/gestion-membres",
    icon: FaUsers,
    current: false,
  },

  {
    name: "Contact",
    href: "/contact",
    icon: MdContacts,
    current: false,
  },
  {
    name: "Footer",
    href: "/footer",
    icon: MdOutlineWeb,
    current: false,
  },
  {
    name: "Nos Offres",
    href: "/nosoffres",
    icon: AiOutlineGift,
    current: false,
  },
  {
    name: "Information Salle",
    href: "/informationslle",
    icon: AiOutlineInfoCircle,
    current: false,
  },
];
const userNavigation = [{ name: "Logout", href: "#" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function SideBarGerant({ menu, children, logout }) {
  console.log("Rendering children:", children);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const isLinkActive = (href) => {
    return location.pathname === href;
  };
  const hundelLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (/login|code2fa/.test(location.pathname)) {
    return children;
  }

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 px-4 flex items-center">
                <img className="h-16 w-auto" src={logo} alt="Workflow" />{" "}
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group rounded-md py-2 px-2 flex items-center text-base font-medium"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          isLinkActive(item.href)
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
          <div className="flex-shrink-0 px-4 flex items-center">
            <img className="h-16 w-auto" src={logo} alt="Workflow" />
          </div>
          <div className="flex-grow mt-5 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    isLinkActive(item.href)
                      ? "bg-gray-300 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group rounded-md py-2 px-2 flex items-center text-sm font-medium"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="md:pl-64">
        <div className="w-full mx-auto flex flex-col md:px-8 xl:px-0">
          <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex justify-center items-center">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <HiViewGrid className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between px-4 md:px-0">
              <div className="flex-1 flex">
                <form
                  className="w-full flex md:ml-0 sr-only"
                  action="#"
                  method="GET"
                >
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <BsSearch className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">View notifications</span>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              onClick={hundelLogout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block py-2 px-4 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-0">
              <div className="px-4 sm:px-6 md:px-0">
                {/* Replace with your content */}
                <div className="py-4">
                  <div className="h-96 p-2 rounded-lg">{children}</div>
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SideBarGerant;
