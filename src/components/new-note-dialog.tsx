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
import { addNote, createAiNote } from "@/lib/notes";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

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
  const [showAiInput, setShowAiInput] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

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

  const createAiNoteMutation = useMutation({
    mutationFn: () =>
      createAiNote({
        userId,
        folderId,
        prompt: aiPrompt,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
      toast.success("AI note created");
      setAiPrompt("");
      setShowAiInput(false);
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to generate AI note");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-blue-600 flex items-center hover:bg-blue-700"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-1" />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="z-1002">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
          {showAiInput ? (
            <></>
          ) : (
            <DialogDescription>
              Choose how you want to create your note
            </DialogDescription>
          )}
        </DialogHeader>
        {showAiInput ? (
          <div className="flex flex-col gap-3 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                What should the note be about?
              </label>
              <Textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe what the note should be about… (e.g. 'Plan my week', 'Summarize a concept', 'Generate ideas')"
                className="min-h-[100px]"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowAiInput(false)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={() => createAiNoteMutation.mutate()}
                disabled={!aiPrompt.trim() || createAiNoteMutation.isPending}
                className="flex-1"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {createAiNoteMutation.isPending ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        ) : (
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
              onClick={() => setShowAiInput(true)}
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
        )}
      </DialogContent>
    </Dialog>
  );
}
