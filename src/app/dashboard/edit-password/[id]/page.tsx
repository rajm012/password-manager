"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

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

export default function EditPassword() {
  const router = useRouter();
  const { id } = useParams();
  const [password, setPassword] = useState<Password | null>(null);
  const [siteName, setSiteName] = useState("");
  const [username, setUsername] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch password details by ID
  useEffect(() => {
    const fetchPassword = async () => {
      const { data, error } = await supabase
        .from("passwords")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching password:", error);
        setMessage("Failed to fetch password details.");
      } else {
        setPassword(data);
        setSiteName(data.site_name);
        setUsername(data.username);
        setPasswordValue(data.password);
      }
    };

    fetchPassword();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("passwords")
        .update({ site_name: siteName, username, password: passwordValue })
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      }

      setMessage("✅ Password updated successfully!");
      setTimeout(() => {
        router.push("/dashboard/saved-passwords"); // Redirect to saved passwords page
      }, 1000);
    } 
    catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(`❌ Error: ${error.message}`);
      } 
      else {
        setMessage("❌ An unknown error occurred.");
      }
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Edit Password
      </h1>

      {password ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Website Name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
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
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            className="p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">Loading password details...</p>
      )}

      {message && (
        <p className={`mt-4 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
}