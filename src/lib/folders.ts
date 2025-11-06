import { supabase } from "./supabase";

export async function getFolders(userId: string) {
  const { data, error } = await supabase
    .from("folders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function addFolder(userId: string) {
  const res = await fetch("/api/folder/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to add folder");

  return data.folder;
}

export async function deleteFolder(folderId: string) {
  const res = await fetch("/api/folder/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folderId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to delete folder");

  return data;
}
