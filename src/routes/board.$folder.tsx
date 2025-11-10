import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFolderNotes } from "@/lib/notes";
import type { Note, User } from "@/lib/types";
import { NoteCard } from "@/components/note-card";
import { useRef } from "react";
import { getCurrentUser } from "@/lib/auth";

export const Route = createFileRoute("/board/$folder")({
  component: FolderBoardPage,
});

function FolderBoardPage() {
  const queryClient = useQueryClient();
  const { folder } = Route.useParams();
  const boardRef = useRef<HTMLDivElement | null>(null);

  const { data: user } = useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  const { data: notes = [] } = useQuery<Note[]>({
    queryKey: ["folder-notes", user?.id],
    queryFn: () => getFolderNotes(user!.id, folder!),
    enabled: !!user,
  });

  return (
    <div className="relative w-full h-full overflow-hidden" ref={boardRef}>
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
