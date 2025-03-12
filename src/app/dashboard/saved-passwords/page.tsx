"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function SavedPasswords() {
  const { user } = useUser();
  const userId = user?.id || "";
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPasswords = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/get-passwords?userId=${userId}`);
        const data = await res.json();
        if (res.ok) {
          setPasswords(data);
        } else {
          throw new Error(data.error || "Failed to fetch passwords");
        }
      } catch (error) {
        console.error("Error fetching passwords:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPasswords();
  }, [userId]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Saved Passwords
      </h2>
      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : passwords.length > 0 ? (
        <ul className="space-y-2">
          {passwords.map((pw: any) => (
            <li key={pw.id} className="text-gray-800 dark:text-gray-300">
              <strong>{pw.site}</strong> - {pw.username}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No passwords saved yet.</p>
      )}
    </div>
  );
}