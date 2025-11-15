import { Sparkles, Type } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import type { Note } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAiNoteAction } from "@/lib/notes";

type AiActionsPopoverProps = {
  note: Note;
  userId: string;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

export function AiActionsPopover({
  note,
  userId,
  setIsPreview,
}: AiActionsPopoverProps) {
  const queryClient = useQueryClient();

  const aiMutation = useMutation({
    mutationFn: (action: { type: "expand" | "restyle" }) =>
      createAiNoteAction(note.id, userId, action.type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
      setIsPreview(true);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-black/5"
          title="AI Actions"
        >
          <Sparkles className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 z-1001">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center justify-start"
            onClick={() => aiMutation.mutate({ type: "expand" })}
            title="Expand Content"
          >
            <Sparkles className="w-4 h-4" />
            Expand Content
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center justify-start"
            onClick={() => aiMutation.mutate({ type: "restyle" })}
            title="Restyle Text"
          >
            <Type className="w-4 h-4" />
            Restyle Text
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
