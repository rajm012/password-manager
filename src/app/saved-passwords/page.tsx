"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Password {
  site_name: string;
  username: string;
  password: string;
  userId: string;
}

export default function SavedPasswords() {
  const { user } = useUser();
  const clerkId = user?.id || "";

  const [passwords, setPasswords] = useState<Password[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  async function getUserId(clerkId: string): Promise<string | null> {
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", clerkId)
      .single();

    if (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }

    return data ? data.id : null;
  }

  useEffect(() => {
    const fetchUserIdAndPasswords = async () => {
      const userId = await getUserId(clerkId);
      if (!userId) return;

      const { data, error } = await supabase
        .from("passwords")
        .select("*")
        .eq("userId", userId);

      if (error) {
        console.error("Error fetching passwords:", error);
      } else {
        setPasswords(data as Password[]);
      }
    };

    fetchUserIdAndPasswords();
  }, [clerkId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Passwords</h1>

      {passwords.length === 0 ? (
        <p>No saved passwords found.</p>
      ) : (
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
                <td className="border p-2">{item.site_name}</td>
                <td className="border p-2">{item.username}</td>
                <td className="border p-2">
                  {showPassword ? item.password : "••••••••"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "Hide Passwords" : "Show Passwords"}
      </button>

      <Link href="/">
        <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
          Back to Home
        </button>
      </Link>
    </div>
  );
}