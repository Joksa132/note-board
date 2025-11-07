import type { Note } from "@/lib/types";
import { Button } from "./ui/button";
import { useState } from "react";
import { Eye, Palette, Save, Trash2, Type } from "lucide-react";
import { useMutation, type QueryClient } from "@tanstack/react-query";
import { deleteNote, updateNote } from "@/lib/notes";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "./ui/textarea";

type NoteCardProps = {
  note: Note;
  userId: string;
  queryClient: QueryClient;
};

export function NoteCard({ note, userId, queryClient }: NoteCardProps) {
  const [isPreview, setIsPreview] = useState(true);
  const [content, setContent] = useState(note.content || "");

  const deleteNoteMutation = useMutation({
    mutationFn: () => deleteNote(note.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
      toast.success(`Note deleted successfully`);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete note");
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: () =>
      updateNote(
        note.id,
        content,
        note.color,
        note.width,
        note.height,
        note.pos_x,
        note.pos_y
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
      toast.success("Note updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update note");
    },
  });

  return (
    <div
      className="absolute rounded-xl border-2 shadow-lg cursor-grab"
      style={{
        left: `${note.pos_x}px`,
        top: `${note.pos_y}px`,
        width: `${note.width}px`,
        height: `${note.height}px`,
        backgroundColor: note.color,
      }}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-1">
            {!isPreview && (
              <Button
                onClick={() => updateNoteMutation.mutate()}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Save className="w-4 h-4" />
              </Button>
            )}
            <Button
              onClick={() => setIsPreview(!isPreview)}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-black/5 dark:hover:bg-white/5"
              title={isPreview ? "Edit" : "Preview"}
            >
              {isPreview ? (
                <Type className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-black/5 dark:hover:bg-white/5"
              title="Change colors"
            >
              <Palette className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => deleteNoteMutation.mutate()}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {isPreview ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {note.content || "*No content*"}
              </ReactMarkdown>
            </div>
          ) : (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note in markdown..."
              className="h-full resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 p-0"
            />
          )}
        </div>
      </div>
    </div>
  );
}
