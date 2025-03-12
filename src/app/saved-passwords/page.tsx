"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SavedPasswords() {
  const [passwords, setPasswords] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchPasswords = async () => {
      const { data, error } = await supabase.from("passwords").select("*");
      if (error) {
        console.error("Error fetching passwords:", error);
      } else {
        setPasswords(data);
      }
    };
    fetchPasswords();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Passwords</h1>
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Website</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Password</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((item, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{item.site}</td>
              <td className="border p-2">{item.username}</td>
              <td className="border p-2">
                {showPassword ? item.password : "••••••••"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "Hide Passwords" : "Show Passwords"}
      </button>
    </div>
  );
}
