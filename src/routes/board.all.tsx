import { NoteCard } from "@/components/note-card";
import { getCurrentUser } from "@/lib/auth";
import { getNotes } from "@/lib/notes";
import type { Note, User } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/board/all")({
  component: AllNotesPage,
});

function AllNotesPage() {
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: notes = [] } = useQuery<Note[]>({
    queryKey: ["notes", user?.id],
    queryFn: () => getNotes(user!.id),
    enabled: !!user,
  });

  return (
    <div className="relative w-full h-full">
      {notes.map((note) => (
        <NoteCard
          note={note}
          queryClient={queryClient}
          userId={user!.id}
          key={note.id}
        />
      ))}
    </div>
  );
}
