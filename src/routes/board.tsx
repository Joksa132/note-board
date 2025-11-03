import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/board")({
  component: NotesBoard,
});

function NotesBoard() {
  return (
    <div>
      <h1>Notes Board</h1>
    </div>
  );
}
