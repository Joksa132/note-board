import type { Note } from "@/lib/types";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import {
  Eye,
  GripVertical,
  MoveDiagonal2,
  Palette,
  Save,
  Sparkles,
  Trash2,
  Type,
} from "lucide-react";
import { useMutation, type QueryClient } from "@tanstack/react-query";
import { deleteNote, updateNote } from "@/lib/notes";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { BG_COLORS, TEXT_COLORS } from "@/lib/utils";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useDragContext } from "./drag-context";
import { AiActionsPopover } from "./ai-actions-popover";
import { ColorPopover } from "./color-popover";

type NoteCardProps = {
  note: Note;
  userId: string;
  queryClient: QueryClient;
  boardRef: React.RefObject<HTMLDivElement | null>;
};

type UpdateNotePayload = {
  id: string;
  pos_x: number;
  pos_y: number;
  width: number;
  height: number;
  content: string;
  color: [string, string];
};

export function NoteCard({
  note,
  userId,
  queryClient,
  boardRef,
}: NoteCardProps) {
  const [isPreview, setIsPreview] = useState(true);
  const [content, setContent] = useState(note.content || "");
  const [color, setColor] = useState<[string, string]>(
    note.color || ["yellow", "black"]
  );
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [width, setWidth] = useState(note.width);
  const [height, setHeight] = useState(note.height);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const dragHandleRef = useRef<HTMLDivElement | null>(null);
  const { isDragging, setIsDragging } = useDragContext();
  const [pos, setPos] = useState({ x: note.pos_x, y: note.pos_y });
  const [zIndex, setZIndex] = useState(1);

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
    mutationFn: (payload: UpdateNotePayload) =>
      updateNote(
        payload.id,
        payload.content,
        payload.color,
        payload.width,
        payload.height,
        payload.pos_x,
        payload.pos_y
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", userId] });
      toast.success("Note updated successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update note");
    },
  });

  const handleResize = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width;
    const startHeight = height;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      setWidth(Math.max(250, startWidth + deltaX));
      setHeight(Math.max(250, startHeight + deltaY));
    };

    const onPointerUp = () => {
      updateNoteMutation.mutate({
        id: note.id,
        pos_x: Math.round(pos.x),
        pos_y: Math.round(pos.y),
        width: Math.round(width),
        height: Math.round(height),
        content,
        color,
      });

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  useEffect(() => {
    const el = dragHandleRef.current;
    if (!el) return;

    let initialMouseX = 0;
    let initialMouseY = 0;
    let initialPosX = 0;
    let initialPosY = 0;
    let offsetX = 0;
    let offsetY = 0;

    const cleanup = draggable({
      element: el,
      getInitialData: () => ({
        noteId: note.id,
      }),
      onDragStart: (args) => {
        setIsDragging(true);
        setZIndex(1000);
        const input = args.location.current.input;
        const rect = el.getBoundingClientRect();

        initialMouseX = input.clientX;
        initialMouseY = input.clientY;

        initialPosX = pos.x;
        initialPosY = pos.y;

        const boardRect = boardRef.current?.getBoundingClientRect();
        if (boardRect) {
          offsetX = input.clientX - boardRect.left - pos.x;
          offsetY = input.clientY - boardRect.top - pos.y;
        }
      },
      onDrag: (args) => {
        const input = args.location.current.input;
        const boardRect = boardRef.current?.getBoundingClientRect();

        if (!boardRect) return;

        const newX = input.clientX - boardRect.left - offsetX;
        const newY = input.clientY - boardRect.top - offsetY;

        setPos({ x: newX, y: newY });
      },
      onDrop: () => {
        setIsDragging(false);
        setZIndex(999);
        updateNoteMutation.mutate({
          id: note.id,
          pos_x: Math.round(pos.x),
          pos_y: Math.round(pos.y),
          width: Math.round(width),
          height: Math.round(height),
          content,
          color,
        });
      },
    });

    return () => {
      cleanup();
    };
  }, [note.id, width, height, content, color, updateNoteMutation]);

  return (
    <div
      ref={cardRef}
      className="absolute rounded-xl border-2 shadow-lg"
      onClick={() => setZIndex(999)}
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        zIndex: isDragging ? 1000 : zIndex,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: note.color[0],
        color: note.color[1],
      }}
    >
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-1">
            <div
              ref={dragHandleRef}
              className="h-8 w-8 p-0 hover:bg-black/5 cursor-grab active:cursor-grabbing flex items-center justify-center rounded"
              title="Drag to move"
            >
              <GripVertical className="w-4 h-4" />
            </div>
            <Button
              onClick={() => setIsPreview(!isPreview)}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-black/5"
              title={isPreview ? "Edit" : "Preview"}
            >
              {isPreview ? (
                <Type className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>

            <AiActionsPopover />

            <ColorPopover
              color={color}
              setColor={setColor}
              onSave={() => {
                updateNoteMutation.mutate({
                  id: note.id,
                  pos_x: Math.round(pos.x),
                  pos_y: Math.round(pos.y),
                  width: Math.round(width),
                  height: Math.round(height),
                  content,
                  color,
                });
              }}
              initialColor={note.color || ["yellow", "black"]}
            />

            <Button
              onClick={() => deleteNoteMutation.mutate()}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              title="Delete note"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            {!isPreview && (
              <Button
                onClick={() =>
                  updateNoteMutation.mutate({
                    id: note.id,
                    pos_x: Math.round(pos.x),
                    pos_y: Math.round(pos.y),
                    width: Math.round(width),
                    height: Math.round(height),
                    content,
                    color,
                  })
                }
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-black/5"
              >
                <Save className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {isPreview ? (
            <div className="prose prose-sm max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4">
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

        <div
          onPointerDown={handleResize}
          className="absolute bottom-1 right-1 cursor-se-resize"
          title="Drag to resize"
        >
          <MoveDiagonal2 className="w-4 h-4 text-black/50 hover:text-black" />
        </div>
      </div>
    </div>
  );
}
