import { BoardSidebar } from "@/components/board-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser, registerUser } from "@/lib/auth";
import { getFolders } from "@/lib/folders";
import { getNotes } from "@/lib/notes";
import type { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/board")({
  beforeLoad: async () => {
    const user = await getCurrentUser();

    if (!user) throw redirect({ to: "/login" });

    await registerUser();
  },
  component: BoardLayout,
});

function BoardLayout() {
  const { data: user } = useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: folders = [] } = useQuery({
    queryKey: ["folders", user?.id],
    queryFn: () => getFolders(user!.id),
    enabled: !!user,
  });

  const { data: notes = [] } = useQuery({
    queryKey: ["notes", user?.id],
    queryFn: () => getNotes(user!.id),
    enabled: !!user,
  });

  const noteCount = notes.length;

  return (
    <div className="min-h-screen flex">
      <SidebarProvider>
        {user && (
          <BoardSidebar
            user={user}
            folders={folders ?? []}
            noteCount={noteCount}
          />
        )}
      </SidebarProvider>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
