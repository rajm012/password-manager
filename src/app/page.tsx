"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser, useAuth  } from "@clerk/nextjs";
import Header from "@/components/Header";


export default function Home() {
  const { isSignedIn } = useUser();
  const [darkMode, setDarkMode] = useState(false);
  const { signOut } = useAuth();

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode)); // Save preference
  };

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-50 to-purple-50"} min-h-screen flex flex-col transition-all duration-300`}>
      {/* Use the Header component */}
      <Header />

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-6">
            Welcome to Password Manager
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Secure, fast, and easy-to-use password manager for all your needs.
          </p>
          <div className="space-x-4">
            {/* Show Dashboard button if logged in */}
            {isSignedIn && (
              <Link
                href="/dashboard"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-300 hover:scale-105"
              >
                Dashboard
              </Link>
            )}

            {/* Show Sign-In and Sign-Up buttons if not logged in */}
            {!isSignedIn && (
              <>
                <Link
                  href="/auth/sign-in"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300 hover:scale-105"
                >
                  Create New Account
                </Link>
              </>
            )}

            {isSignedIn && (
              <>
                
                <button
                    onClick={() => signOut()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 hover:scale-105"
                  >
                    Log Out
                </button>
                
              </>
            )}

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`w-full shadow-md mt-auto ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"}`}>
        <div className="container mx-auto px-6 py-4 text-center">
          <p>© {new Date().getFullYear()} Password Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}