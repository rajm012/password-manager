"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

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
      {/* Header */}
      <header className={`w-full shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
            Password Manager
          </h1>
          <div className="flex items-center space-x-4">
            <Link href="/auth/sign-in" className={`font-medium ${darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-blue-600"}`}>
              Sign In
            </Link>
            <Link href="/auth/sign-up" className={`font-medium ${darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-blue-600"}`}>
              Sign Up
            </Link>
            <Link href="/dashboard" className={`font-medium ${darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-700 hover:text-blue-600"}`}>
              Dashboard
            </Link>
            {/* Dark Mode Toggle Button */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 transition duration-300 hover:scale-110"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className={`text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Welcome to Password Manager
          </h1>
          <p className={`text-xl mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Secure, fast, and easy-to-use password manager for all your needs.
          </p>
          <div className="space-x-4">
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
              Sign Up
            </Link>
            <Link
              href="/dashboard"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-300 hover:scale-105"
            >
              Dashboard
            </Link>
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