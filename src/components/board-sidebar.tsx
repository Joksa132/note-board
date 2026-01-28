import {
  Folder as FolderIcon,
  Home,
  LogOut,
  Plus,
  StickyNote,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { handleLogout } from "@/lib/auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import type { Folder, Note, User } from "@/lib/types";
import { Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFolder } from "@/lib/folders";
import { SidebarFolderActions } from "./sidebar-folder-actions";
import { toast } from "sonner";
import { NewNoteDialog } from "./new-note-dialog";
import { ThemeToggle } from "./theme-toggle";

type BoardSidebarProps = {
  user: User;
  folders: Folder[];
  noteCount: number;
};

export function BoardSidebar({ user, folders, noteCount }: BoardSidebarProps) {
  const queryClient = useQueryClient();

  const userInitials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const addFolderMutation = useMutation({
    mutationFn: () => addFolder(user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders", user.id] });
      toast.success("New folder added successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add new folder");
    },
  });

  const notes = queryClient.getQueryData<Note[]>(["notes", user?.id]) ?? [];

  return (
    <Sidebar className="sidebar-fade-in border-r border-sidebar-border">
      <SidebarHeader className="p-5 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <StickyNote className="w-5 h-5 text-primary" strokeWidth={2.5} />
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Note Board
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 px-1">
          <p
            className="text-xs text-muted-foreground italic"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Organize your creative thoughts
          </p>
          <ThemeToggle />
        </div>
        <div className="mt-4 h-px bg-linear-to-r from-transparent via-border to-transparent"></div>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full flex items-center justify-between cursor-pointer bg-accent/40 hover:bg-accent/60 transition-all duration-200 rounded-lg px-3 py-2.5 group">
                  <div className="flex items-center gap-3">
                    <Home
                      className="w-4 h-4 text-primary group-hover:scale-110 transition-transform"
                      strokeWidth={2.5}
                    />
                    <Link to="/board/all">
                      <span className="font-semibold text-sm">All Notes</span>
                    </Link>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary min-w-6 text-center">
                    {noteCount}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4 bg-border" />

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between px-2 mb-3">
            <span
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Folders
            </span>
            <Button
              onClick={() => addFolderMutation.mutate()}
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0 rounded-md hover:bg-accent/60 transition-colors"
              title="Add new folder"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {folders.map((folder, index) => {
                const folderNoteCount = folder.id
                  ? notes.filter((note) => note.folder_id === folder.id).length
                  : 0;

                return (
                  <SidebarMenuItem
                    key={folder.id}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="animate-in-up"
                  >
                    <div className="flex items-center gap-2 group">
                      <SidebarMenuButton className="flex-1 cursor-pointer flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-accent/40 transition-all">
                        <FolderIcon
                          className="w-4 h-4 text-accent-foreground/60 group-hover:text-primary transition-colors"
                          strokeWidth={2}
                        />
                        <Link
                          to="/board/$folder"
                          params={{ folder: folder.id }}
                        >
                          <span className="flex-1 truncate text-sm font-medium">
                            {folder.name}
                          </span>
                        </Link>
                      </SidebarMenuButton>

                      <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground min-w-5 text-center">
                        {folderNoteCount}
                      </span>

                      <SidebarFolderActions
                        folder={folder}
                        userId={user.id}
                        queryClient={queryClient}
                      />
                    </div>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <div className="flex flex-col w-full gap-2.5">
          <div className="relative flex items-center gap-3 p-3 rounded-xl bg-accent/30 border border-border/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 group">
            <Avatar className="h-9 w-9 ring-2 ring-background">
              <AvatarFallback
                className="bg-linear-to-br from-primary to-accent text-primary-foreground text-xs font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span
                className="text-sm font-semibold truncate leading-tight"
                title={user.name}
              >
                {user.name}
              </span>
              <span
                className="text-[11px] text-muted-foreground truncate leading-tight mt-0.5"
                title={user.email}
              >
                {user.email}
              </span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-all"
              title="Logout"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" strokeWidth={2} />
            </Button>
          </div>

          <NewNoteDialog
            queryClient={queryClient}
            userId={user.id}
            folderId={null}
          />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
