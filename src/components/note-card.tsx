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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { BG_COLORS, TEXT_COLORS } from "@/lib/utils";

type NoteCardProps = {
  note: Note;
  userId: string;
  queryClient: QueryClient;
};

export function NoteCard({ note, userId, queryClient }: NoteCardProps) {
  const [isPreview, setIsPreview] = useState(true);
  const [content, setContent] = useState(note.content || "");
  const [color, setColor] = useState<[string, string]>(
    note.color || ["yellow", "black"]
  );
  const [popoverOpen, setPopoverOpen] = useState(false);

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
        color,
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
        backgroundColor: note.color[0],
        color: note.color[1],
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
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 hover:bg-black/5 dark:hover:bg-white/5"
                  title="Change colors"
                >
                  <Palette className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Background</p>
                    <div className="grid grid-cols-5 gap-2">
                      {BG_COLORS.map((bg) => (
                        <Button
                          variant="ghost"
                          size="sm"
                          key={bg}
                          onClick={() => setColor([bg, color[1]])}
                          className={`w-6 h-6 rounded-full border ${
                            color[0] === bg ? "ring-2 ring-black" : ""
                          }`}
                          style={{ backgroundColor: bg }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Text</p>
                    <div className="grid grid-cols-5 gap-2">
                      {TEXT_COLORS.map((txt) => (
                        <Button
                          variant="ghost"
                          size="sm"
                          key={txt}
                          onClick={() => setColor([color[0], txt])}
                          className={`w-6 h-6 rounded-full border ${
                            color[1] === txt ? "ring-2 ring-black" : ""
                          }`}
                          style={{ backgroundColor: txt }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setColor(note.color || ["yellow", "black"]);
                        setPopoverOpen(false);
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        updateNoteMutation.mutate();
                        setPopoverOpen(false);
                      }}
                      className="flex-1"
                    >
                      Save Colors
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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
