import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FileText, Plus, Sparkles } from "lucide-react";
import { useMutation, type QueryClient } from "@tanstack/react-query";
import { addNote } from "@/lib/notes";
import { toast } from "sonner";

type NewNoteDialogProps = {
  queryClient: QueryClient;
  userId: string;
  folderId: string | null;
};

export function NewNoteDialog({
  queryClient,
  userId,
  folderId,
}: NewNoteDialogProps) {
  const [open, setOpen] = useState(false);

  const createNoteMutation = useMutation({
    mutationFn: () => addNote(userId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
      toast.success("New note created");
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create note");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <Plus className="w-5 h-5 mr-2" />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="z-1002">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
          <DialogDescription>
            Choose how you want to create your note
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col gap-2 bg-transparent"
            onClick={() => createNoteMutation.mutate()}
          >
            <FileText className="w-8 h-8" />
            <div className="text-center">
              <div className="font-semibold">Simple Note</div>
              <div className="text-xs text-muted-foreground">
                Create a blank note
              </div>
            </div>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex flex-col gap-2 bg-transparent"
            disabled
          >
            <Sparkles className="w-8 h-8 text-primary" />
            <div className="text-center">
              <div className="font-semibold">AI Generated Note</div>
              <div className="text-xs text-muted-foreground">
                Create a note from a prompt
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
