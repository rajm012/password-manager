"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "@clerk/nextjs";
import { FaCopy, FaTrash, FaEdit, FaPlus, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for actions
import { useRouter } from "next/navigation"; // For navigation
import { decryptData } from "@/lib/encryption";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase credentials are missing");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Password {
  id: string;
  site_name: string;
  username: string;
  password: string;
  userId: string;
}

export default function SavedPasswords() {
  const { user } = useUser();
  const clerkId = user?.id || "";
  const router = useRouter(); // For navigation

  const [passwords, setPasswords] = useState<Password[]>([]);
  const [showPasswords, setShowPasswords] = useState<boolean[]>([]); // Track visibility for each password

  // Fetch user ID from Supabase
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

  // Fetch and decrypt passwords from Supabase
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
        console.log("Fetched passwords (encrypted):", data);
        const decryptedPasswords = data.map((pw) => ({
          ...pw,
          password: decryptData(pw.password), // Decrypt the password
        }));
        console.log("Decrypted passwords:", decryptedPasswords);
        setPasswords(decryptedPasswords);
        setShowPasswords(new Array(decryptedPasswords.length).fill(false)); // Initialize visibility state
      }
    };

    fetchUserIdAndPasswords();
  }, [clerkId]);

  // Toggle password visibility for a specific row
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

  // Delete a password
  const deletePassword = async (id: string) => {
    if (confirm("Are you sure you want to delete this password?")) {
      const { error } = await supabase.from("passwords").delete().eq("id", id);

      if (error) {
        console.error("Error deleting password:", error);
      } else {
        setPasswords((prev) => prev.filter((pw) => pw.id !== id));
        alert("Password deleted successfully!");
      }
    }
  };

  const editPassword = (id: string) => {
    router.push(`/dashboard/edit-password/${id}`);
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
                  key={item.id}
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
                  <td className="p-3 flex space-x-3">
                    <button
                      onClick={() => copyPassword(item.password)}
                      className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition duration-300"
                    >
                      <FaCopy />
                    </button>
                    <button
                      onClick={() => editPassword(item.id)}
                      className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition duration-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deletePassword(item.id)}
                      className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition duration-300"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Password Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => router.push("/dashboard/save-password")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Password</span>
        </button>
      </div>

      {/* Back to Home Button */}
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