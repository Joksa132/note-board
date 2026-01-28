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
          className="w-full bg-primary text-primary-foreground flex items-center hover:bg-primary/90 shadow-sm font-semibold transition-all"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" strokeWidth={2.5} />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="z-1002 border-border">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl">
            Create New Note
          </DialogTitle>
          {showAiInput ? (
            <></>
          ) : (
            <DialogDescription className="text-muted-foreground">
              Choose how you want to create your note
            </DialogDescription>
          )}
        </DialogHeader>
        {showAiInput ? (
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
                What should the note be about?
              </label>
              <Textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe what the note should be about… (e.g. 'Plan my week', 'Summarize a concept', 'Generate ideas')"
                className="min-h-[100px] resize-none border-border focus-visible:ring-primary"
                style={{ fontFamily: 'var(--font-body)' }}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowAiInput(false)}
                variant="outline"
                className="flex-1 border-border hover:bg-accent/50"
              >
                Back
              </Button>
              <Button
                onClick={() => createAiNoteMutation.mutate()}
                disabled={!aiPrompt.trim() || createAiNoteMutation.isPending}
                className="flex-1 bg-primary hover:bg-primary/90 transition-all"
              >
                <Sparkles className="w-4 h-4 mr-2" strokeWidth={2} />
                {createAiNoteMutation.isPending ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 py-4">
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-3 border-2 border-border hover:border-primary/50 hover:bg-accent/30 transition-all group"
              onClick={() => createNoteMutation.mutate()}
            >
              <FileText className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" strokeWidth={2} />
              <div className="text-center">
                <div className="font-semibold text-base">Simple Note</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Create a blank note
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-3 border-2 border-border hover:border-primary/50 hover:bg-accent/30 transition-all group"
              onClick={() => setShowAiInput(true)}
            >
              <Sparkles className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" strokeWidth={2} />
              <div className="text-center">
                <div className="font-semibold text-base">AI Generated Note</div>
                <div className="text-xs text-muted-foreground mt-1">
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
