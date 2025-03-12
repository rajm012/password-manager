"use client";

import { ReactNode, useState, useEffect } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-50 to-purple-50"}`}>
      {/* Cool Header */}
      <header className={`w-full shadow-md ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <a
              href="./"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
            >
              Home
            </a>
            <a
              href="/dashboard/save-password"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
            >
              Save Password
            </a>
            <a
              href="/dashboard/saved-passwords"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
            >
              Saved Passwords
            </a>
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

      {/* Body */}
      <main className="container mx-auto p-6">
        {/* Navigation Buttons in Body */}
        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="./"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 hover:scale-105"
          >
            Home
          </a>
          <a
            href="/dashboard/save-password"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300 hover:scale-105"
          >
            Save Password
          </a>
          <a
            href="/dashboard/saved-passwords"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-300 hover:scale-105"
          >
            Saved Passwords
          </a>
        </div>
        {children}
      </main>
    </div>
  );
}