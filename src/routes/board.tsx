import { BoardSidebar } from "@/components/board-sidebar";
import { DragProvider } from "@/components/providers/drag-context";
import { ThemeProvider } from "@/components/providers/theme-context";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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

    await registerUser(user);
  },
  component: BoardLayout,
});

function BoardLayout() {
  const { data: user } = useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
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
    <ThemeProvider>
      <SidebarProvider>
        <DragProvider>
          <div className="min-h-screen w-full flex flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
              {user && (
                <BoardSidebar
                  user={user}
                  folders={folders ?? []}
                  noteCount={noteCount}
                />
              )}

              <SidebarInset className="flex flex-col flex-1 overflow-hidden">
                <div className="flex h-12 items-center px-4 border-b shrink-0">
                  <SidebarTrigger />
                </div>

                <main className="flex-1 p-4 pt-4 overflow-auto">
                  <Outlet />
                </main>
              </SidebarInset>
            </div>
          </div>
        </DragProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}
