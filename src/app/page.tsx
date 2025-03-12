import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Password Manager</h1>
      <Link href="/saved-passwords">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          View Saved Passwords
        </button>
      </Link>
    </div>
  );
}
