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

export async function getFolderNotes(userId: string, folderId: string) {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .eq("folder_id", folderId);

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

export async function deleteNote(noteId: string) {
  const res = await fetch("/api/note/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ noteId }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete note");
  }

  return true;
}

export async function updateNote(
  noteId: string,
  content: string,
  color: [string, string],
  width: number,
  height: number,
  pos_x: number,
  pos_y: number
) {
  const res = await fetch("/api/note/edit", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      noteId,
      content,
      color,
      width,
      height,
      pos_x,
      pos_y,
    }),
  });

  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

export async function createAiNote({
  userId,
  folderId,
  prompt,
}: {
  userId: string;
  folderId: string | null;
  prompt: string;
}) {
  const res = await fetch("/api/note/ai-generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, folderId, prompt }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to generate AI note");
  }

  return res.json();
}

export async function createAiNoteAction(
  noteId: string,
  userId: string,
  action: "expand" | "restyle"
) {
  const res = await fetch("/api/note/ai-action", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ noteId, userId, action }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to perform AI action");
  }

  return res.json();
}
