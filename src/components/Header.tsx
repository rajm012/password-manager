"use client";
import { useUser, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // Fallback icon for profile picture

export default function Header() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="w-full shadow-md bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Password Manager
        </h1>
        <div className="flex items-center space-x-4">
          {/* Show Sign-In/Sign-Up buttons if not logged in */}
          {!isSignedIn && (
            <div className="flex space-x-4">
              <Link
                href="/auth/sign-in"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Show Profile Button and Logout if logged in */}
          {isSignedIn && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                {
                  <FaUserCircle className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                }
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-54 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                    <p className="text-gray-800 dark:text-white">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {user?.primaryEmailAddress?.emailAddress.slice(0,11) || "Email"}
                    </p>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}