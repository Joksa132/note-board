import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/board/$folder")({
  component: FolderBoardPage,
});

function FolderBoardPage() {
  const { folder } = Route.useParams();
  return <h1>{folder} folder</h1>;
}
