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
    <div className="relative w-full h-full overflow-hidden p-6" ref={boardRef}>
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

      {notes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center max-w-md animate-in-up">
            <div className="mb-6 flex justify-center">
              <div className="p-6 rounded-2xl bg-accent/30 border border-border/50">
                <svg
                  className="w-16 h-16 text-muted-foreground/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
            </div>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your canvas awaits
            </h3>
            <p
              className="text-muted-foreground text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Create your first note to start organizing your thoughts and ideas
              on this beautiful digital canvas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
