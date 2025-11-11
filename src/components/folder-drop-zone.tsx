import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Folder } from "@/lib/types";
import { useDragContext } from "./drag-context";
import { useEffect, useRef, useState } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

function FolderDropZone({
  folder,
  onDrop,
}: {
  folder: Folder;
  onDrop: (noteId: string, folderId: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cleanup = dropTargetForElements({
      element: el,
      onDragEnter: () => setIsOver(true),
      onDragLeave: () => setIsOver(false),
      onDrop: ({ source }) => {
        setIsOver(false);
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
      className={
        "border border-dashed rounded-lg bg-background/70 backdrop-blur-md px-8 py-4 cursor-pointer text-lg font-medium"
      }
    >
      {folder.name}
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
    <div className="absolute top-2 left-0 right-0 z-1000 flex justify-center gap-4 pointer-events-none">
      <div className="flex gap-4 pointer-events-auto">
        {folders.map((folder) => (
          <FolderDropZone key={folder.id} folder={folder} onDrop={handleDrop} />
        ))}
      </div>
    </div>
  );
}
