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
          <div className="min-h-screen w-full flex flex-col overflow-hidden bg-background">
            <div className="flex flex-1 overflow-hidden">
              {user && (
                <BoardSidebar
                  user={user}
                  folders={folders ?? []}
                  noteCount={noteCount}
                />
              )}

              <SidebarInset className="flex flex-col flex-1 overflow-hidden">
                <div className="relative flex h-14 items-center px-6 border-b shrink-0 bg-card/50 backdrop-blur-sm z-10">
                  <div className="flex items-center gap-3">
                    <SidebarTrigger className="hover:bg-accent/50 transition-colors" />
                    <div className="h-5 w-px bg-border"></div>
                    <h1
                      className="text-lg font-semibold tracking-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Note Board
                    </h1>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent"></div>
                </div>

                <main className="flex-1 overflow-auto board-canvas">
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
