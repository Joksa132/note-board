import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Folder } from "@/lib/types";
import { useDragContext } from "./providers/drag-context";
import { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

function FolderDropZone({
  folder,
  onDrop,
}: {
  folder: Folder;
  onDrop: (noteId: string, folderId: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cleanup = dropTargetForElements({
      element: el,
      onDrop: ({ source }) => {
        const noteId = source.data.noteId as string;
        if (noteId) {
          onDrop(noteId, folder.id);
        }
      },
    });

    return cleanup;
  }, [folder.id, onDrop]);

  return (
    <div
      ref={ref}
      className="border-2 border-dashed border-primary/60 rounded-xl bg-accent/80 backdrop-blur-md px-6 py-3 cursor-pointer text-base font-semibold transition-all hover:bg-accent hover:border-primary shadow-lg"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        {folder.name}
      </div>
    </div>
  );
}

export function FolderDropBar({
  folders,
  userId,
}: {
  folders: Folder[];
  userId: string;
}) {
  const queryClient = useQueryClient();
  const { isDragging, setIsDragging } = useDragContext();

  const moveMutation = useMutation({
    mutationFn: ({ noteId, folderId }: { noteId: string; folderId: string }) =>
      fetch("/api/note/move", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, folderId }),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to move note");
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
      toast.success("Note moved to folder successfully");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to move note");
    },
  });

  const handleDrop = (noteId: string, folderId: string) => {
    moveMutation.mutate({ noteId, folderId });
    setIsDragging(false);
  };

  if (!isDragging) return null;

  return (
    <div className="absolute top-8 left-0 right-0 z-1000 flex justify-center gap-3 pointer-events-none animate-in-up">
      <div className="flex gap-3 pointer-events-auto p-3 rounded-2xl bg-card/95 backdrop-blur-lg border border-border shadow-2xl">
        <div
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-2 flex items-center"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Drop to move:
        </div>
        {folders.map((folder) => (
          <FolderDropZone key={folder.id} folder={folder} onDrop={handleDrop} />
        ))}
      </div>
    </div>
  );
}
