import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/board/all")({
  component: AllNotesPage,
});

function AllNotesPage() {
  return <h1>All Notes</h1>;
}
