import { supabase } from "./supabase";

export async function getFolders(userId: string) {
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", userId)
    .order("name", { ascending: true });

  if (error) throw error;
  return data ?? [];
}
