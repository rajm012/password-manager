export default function Dashboard() {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to Your Dashboard
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Manage your passwords securely and efficiently.
      </p>
      <div className="flex justify-center space-x-4">
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
    </div>
  );
}