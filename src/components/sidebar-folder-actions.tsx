import { Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import type { Folder } from "@/lib/types";
import { useMutation, type QueryClient } from "@tanstack/react-query";
import { deleteFolder, renameFolder } from "@/lib/folders";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

type SidebarFolderActionsProps = {
  folder: Folder;
  userId: string;
  queryClient: QueryClient;
};

export function SidebarFolderActions({
  folder,
  userId,
  queryClient,
}: SidebarFolderActionsProps) {
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const startEditing = (folder: Folder) => {
    setEditingFolder(folder.id);
    setEditName(folder.name);
  };

  const handleRename = (folderId: string) => {
    if (!editName.trim()) return;
    renameFolderMutation.mutate({ folderId, newName: editName.trim() });
    setEditingFolder(null);
  };

  const renameFolderMutation = useMutation({
    mutationFn: ({
      folderId,
      newName,
    }: {
      folderId: string;
      newName: string;
    }) => renameFolder(folderId, newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", userId] });
      toast.success("Folder renamed successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to rename folder");
    },
  });

  const deleteFolderMutation = useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),
    onSuccess: (_, folderId) => {
      queryClient.invalidateQueries({ queryKey: ["folders", userId] });
      toast.success(`Folder "${folder.name}" deleted successfully`);

      if (currentPath === `/board/${folderId}`) {
        router.navigate({ to: "/board/all" });
      }
    },
    onError: (err) => {
      toast.error(err.message || `Failed to delete folder "${folder.name}"`);
    },
  });

  return (
    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
      <Popover
        open={editingFolder === folder.id}
        onOpenChange={(open) => !open && setEditingFolder(null)}
      >
        <PopoverTrigger asChild>
          <Button
            onClick={() => startEditing(folder)}
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
          >
            <Pencil className="w-3 h-3" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-3" align="start">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Rename Folder</label>
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRename(folder.id);
                if (e.key === "Escape") setEditingFolder(null);
              }}
              placeholder="Folder name"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingFolder(null)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => handleRename(folder.id)}
                disabled={!editName.trim()}
              >
                Save
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Button
        onClick={() => deleteFolderMutation.mutate(folder.id)}
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0"
      >
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  );
}
