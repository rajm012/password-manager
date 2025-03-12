import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Header */}
      <header className="w-full bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Password Manager</h1>
          <nav className="flex space-x-4">
            <Link
              href="/auth/sign-in"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to PassWord Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Secure, fast, and easy-to-use password manager for all your needs.
          </p>
          <div className="space-x-4">
            <Link
              href="/auth/sign-in"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </Link>
            <Link
              href="/auth/sign-up"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white shadow-md mt-auto">
        <div className="container mx-auto px-6 py-4 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Password Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}