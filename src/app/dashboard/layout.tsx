import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <div className="flex space-x-4">
            <a
              href="../"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </a>
            <a
              href="/dashboard/save-password"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Save Password
            </a>
            <a
              href="/dashboard/saved-passwords"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Saved Passwords
            </a>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}