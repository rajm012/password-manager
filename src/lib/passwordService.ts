import { supabase } from "@/lib/supabase";

// Save a new password
export async function savePassword(userId: string, site: string, username: string, password: string) {
  const { data, error } = await supabase
    .from("passwords") // Replace with your table name
    .insert([{ user_id: userId, site, username, password }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Fetch saved passwords for a user
export async function getSavedPasswords(userId: string) {
  const { data, error } = await supabase
    .from("passwords") // Replace with your table name
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Delete a saved password
export async function deletePassword(passwordId: string) {
  const { error } = await supabase
    .from("passwords") // Replace with your table name
    .delete()
    .eq("id", passwordId);

  if (error) {
    throw new Error(error.message);
  }
}