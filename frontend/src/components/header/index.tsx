"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";  // Import useCookies hook
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"; 
import { Bars3Icon, XMarkIcon, UserIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]); // Get and set cookies
  const router = useRouter();

  // Handle logout by clearing the cookie and redirecting to the login page
  const handleLogout = () => {
    removeCookie("auth_token", { path: "/" }); // Clear auth_token cookie
    router.push("/login"); // Redirect to login page
  };

  return (
    <header className="bg-white shadow-sm">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <span className="sr-only">SocialSync AI</span>
          <a href="/" className="text-xl font-bold text-indigo-600">
            SocialSync AI
          </a>
        </div>
        <div className="flex ">
          {cookies.auth_token ? (
            // If cookie exists, show the User menu with dropdown
            <Popover className="relative">
              <PopoverButton className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                <span className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 flex gap-2">
                  User <ChevronDownIcon className="ml-1 w-5 h-5" />
                </span>
              </PopoverButton>
              <PopoverPanel className="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded-md py-1">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </PopoverPanel>
            </Popover>
          ) : (
            // If no cookie exists, show Login button
            <button
              type="button"
              onClick={() => router.push("/login")} // Redirect to login page
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
              >
                Login
              </a>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
