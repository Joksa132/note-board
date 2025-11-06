import { Home, LogOut, Plus, StickyNote } from "lucide-react";
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
import type { Folder, User } from "@/lib/types";
import { Link } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFolder } from "@/lib/folders";
import { SidebarFolderActions } from "./sidebar-folder-actions";

type BoardSidebarProps = {
  user: User;
  folders: Folder[];
};

export function BoardSidebar({ user, folders }: BoardSidebarProps) {
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
    },
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <StickyNote className="w-6 h-6" />
          <span className="text-lg font-bold">Sticky Notes</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    <Link to="/board/all">
                      <span className="font-medium">All Notes</span>
                    </Link>
                  </div>
                  <span className="text-xs opacity-75">Note Count</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            <span>Folders</span>
            <Button
              onClick={() => addFolderMutation.mutate()}
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
            >
              <Plus className="w-3 h-3" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map((folder) => (
                <SidebarMenuItem key={folder.id}>
                  <div className="flex items-center gap-2 group">
                    <SidebarMenuButton className="flex-1 cursor-pointer">
                      <Link to="/board/$folder" params={{ folder: folder.id }}>
                        <span className="flex-1 truncate">{folder.name}</span>
                      </Link>
                    </SidebarMenuButton>

                    <SidebarFolderActions
                      folder={folder}
                      userId={user.id}
                      queryClient={queryClient}
                    />
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col w-full px-2">
          <div className="flex items-center gap-3 p-2 rounded-lg">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-black text-white text-xs font-medium">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium truncate" title={user.name}>
                {user.name}
              </span>
              <span
                className="text-xs text-muted-foreground truncate"
                title={user.email}
              >
                {user.email}
              </span>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8"
              title="Logout"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
          <span>new note button here</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
