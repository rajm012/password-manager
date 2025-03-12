"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "@clerk/nextjs";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa"; // Icons for show/hide and copy

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase credentials are missing");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

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
  const [showPasswords, setShowPasswords] = useState<boolean[]>([]);

  async function getUserId(clerkId: string): Promise<string | null> {
    try {
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
    } catch (error) {
      console.error("Unexpected error fetching user ID:", error);
      return null;
    }
  }

  // Fetch passwords from Supabase
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
        setShowPasswords(new Array(data.length).fill(false)); // Initialize show/hide state
      }
    };

    fetchUserIdAndPasswords();
  }, [clerkId]);

  // Toggle show/hide password for a specific row
  const toggleShowPassword = (index: number) => {
    setShowPasswords((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  // Copy password to clipboard
  const copyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Saved Passwords
      </h1>

      {passwords.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No saved passwords found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-3 text-left text-gray-800 dark:text-white">Website</th>
                <th className="p-3 text-left text-gray-800 dark:text-white">Username</th>
                <th className="p-3 text-left text-gray-800 dark:text-white">Password</th>
                <th className="p-3 text-left text-gray-800 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwords.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
                >
                  <td className="p-3 text-gray-800 dark:text-white">{item.site_name}</td>
                  <td className="p-3 text-gray-800 dark:text-white">{item.username}</td>
                  <td className="p-3 text-gray-800 dark:text-white">
                    <div className="flex items-center space-x-2">
                      <span>
                        {showPasswords[index] ? item.password : "••••••••"}
                      </span>
                      <button
                        onClick={() => toggleShowPassword(index)}
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
                      >
                        {showPasswords[index] ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => copyPassword(item.password)}
                      className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition duration-300"
                    >
                      <FaCopy />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6">
        <a
          href="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}