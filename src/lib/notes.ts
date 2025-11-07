import { supabase } from "./supabase";
import type { Note } from "./types";

export async function getNotes(userId: string) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data as Note[];
}

export async function addNote(userId: string, folderId?: string | null) {
  const res = await fetch("/api/note/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, folderId }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create note");
  return data.note;
}
