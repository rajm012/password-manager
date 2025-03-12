"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Dashboard() {
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
      const res = await fetch("/api/save-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, site, username, password }),
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
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Save Password</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Website Name"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Password"}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}

      <Link href="/saved-passwords">
        <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
          View Saved Passwords
        </button>
      </Link>
    </div>
  );
}
