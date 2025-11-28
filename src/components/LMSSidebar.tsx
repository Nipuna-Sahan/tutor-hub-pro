import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Video, 
  FileText, 
  CheckSquare, 
  Calendar, 
  Upload, 
  Megaphone,
  BarChart3,
  User,
  MessageSquare
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/lms", icon: LayoutDashboard },
  { title: "Videos", url: "/lms/videos", icon: Video },
  { title: "Resources", url: "/lms/resources", icon: FileText },
  { title: "Quizzes", url: "/lms/quizzes", icon: CheckSquare },
  { title: "Attendance", url: "/lms/attendance", icon: Calendar },
  { title: "Assignments", url: "/lms/assignments", icon: Upload },
  { title: "Announcements", url: "/lms/announcements", icon: Megaphone },
  { title: "Messages", url: "/lms/messages", icon: MessageSquare },
  { title: "My Performance", url: "/lms/performance", icon: BarChart3 },
  { title: "My Profile", url: "/lms/profile", icon: User },
];

export function LMSSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Student Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
