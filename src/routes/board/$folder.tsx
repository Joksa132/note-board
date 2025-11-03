import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/board/$folder")({
  component: FolderBoardPage,
});

function FolderBoardPage() {
  const { folder } = Route.useParams();

  return (
    <div>
      <h1>{folder} folder</h1>
    </div>
  );
}
