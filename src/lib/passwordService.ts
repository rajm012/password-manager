import { supabase } from "@/lib/supabase";

export async function savePassword(userId: string, site: string, username: string, password: string) {
  const { data, error } = await supabase
    .from("passwords")
    .insert([{ userId: userId, site, username, password }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getSavedPasswords(userId: string) {
  const { data, error } = await supabase
    .from("passwords")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function deletePassword(passwordId: string) {
  const { error } = await supabase
    .from("passwords")
    .delete()
    .eq("id", passwordId);

  if (error) {
    throw new Error(error.message);
  }
}