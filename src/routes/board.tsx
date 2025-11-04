import { getCurrentUser, handleLogout } from "@/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/board")({
  beforeLoad: async () => {
    const user = await getCurrentUser();

    if (!user) throw redirect({ to: "/login" });
  },
  component: BoardLayout,
});

function BoardLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 p-4 border-r">
        <button onClick={handleLogout} className="px-4 py-2">
          Logout
        </button>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
