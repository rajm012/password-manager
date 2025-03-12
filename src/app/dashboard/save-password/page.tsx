"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { encryptData } from "@/lib/encryption"; // Import encryption utility

export default function SavePassword() {
  const { user } = useUser();
  const userId = user?.id || "";
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setMessage("⚠️ You must be logged in to save passwords.");
      return;
    }

    setLoading(true);

    try {
      const encryptedPassword = encryptData(password);

      const res = await fetch("/api/save-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, site, username, password: encryptedPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to save password");

      setMessage("✅ Password saved successfully!");
      setSite("");
      setUsername("");
      setPassword("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`❌ Error: ${error.message}`);
      } else {
        setMessage("❌ An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Save Password
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Website Name"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 hover:scale-105"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Password"}
        </button>
      </form>
      {message && (
        <p className={`mt-4 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}