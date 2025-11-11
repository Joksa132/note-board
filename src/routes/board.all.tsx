import { FolderDropBar } from "@/components/folder-drop-zone";
import { NoteCard } from "@/components/note-card";
import { getCurrentUser } from "@/lib/auth";
import { getNotes } from "@/lib/notes";
import type { Folder, Note, User } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/board/all")({
  component: AllNotesPage,
});

function AllNotesPage() {
  const queryClient = useQueryClient();
  const boardRef = useRef<HTMLDivElement | null>(null);

  const { data: user } = useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  const { data: notes = [] } = useQuery<Note[]>({
    queryKey: ["notes", user?.id],
    queryFn: () => getNotes(user!.id),
    enabled: !!user,
  });

  const allFolders =
    queryClient.getQueryData<Folder[]>(["folders", user?.id]) ?? [];

  return (
    <div className="relative w-full h-full overflow-hidden" ref={boardRef}>
      {user && allFolders && (
        <FolderDropBar folders={allFolders} userId={user.id} />
      )}

      {notes.map((note) => (
        <NoteCard
          note={note}
          queryClient={queryClient}
          userId={user!.id}
          boardRef={boardRef}
          key={note.id}
        />
      ))}
    </div>
  );
}
