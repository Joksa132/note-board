import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Note, User } from "@/lib/types";
import { NoteCard } from "@/components/note-card";
import { useRef } from "react";
import { getCurrentUser } from "@/lib/auth";

export const Route = createFileRoute("/board/$folder")({
  component: FolderBoardPage,
});

function FolderBoardPage() {
  const { folder } = Route.useParams();
  const queryClient = useQueryClient();
  const boardRef = useRef<HTMLDivElement | null>(null);

  const { data: user } = useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  const allNotes = queryClient.getQueryData<Note[]>(["notes", user?.id]) ?? [];

  const folderNotes = allNotes.filter((note) => note.folder_id === folder);

  return (
    <div className="relative w-full h-full overflow-hidden p-6" ref={boardRef}>
      {folderNotes.map((note) => (
        <NoteCard
          note={note}
          queryClient={queryClient}
          userId={user!.id}
          boardRef={boardRef}
          key={note.id}
        />
      ))}

      {folderNotes.length === 0 && (
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
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
              </div>
            </div>
            <h3
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Empty folder
            </h3>
            <p
              className="text-muted-foreground text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              This folder is waiting for your notes. Create a new note or drag
              existing ones here to organize your workspace.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
