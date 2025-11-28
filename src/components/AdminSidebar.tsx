import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  FileText, 
  Megaphone, 
  FileCheck, 
  BarChart3,
  Calendar,
  DollarSign,
  Video,
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Classes", url: "/admin/classes", icon: GraduationCap },
  { title: "Students", url: "/admin/students", icon: Users },
  { title: "Resources", url: "/admin/resources", icon: FileText },
  { title: "Announcements", url: "/admin/announcements", icon: Megaphone },
  { title: "Papers", url: "/admin/papers", icon: FileCheck },
  { title: "Marks", url: "/admin/marks", icon: BarChart3 },
  { title: "Attendance", url: "/admin/attendance", icon: Calendar },
  { title: "Payments", url: "/admin/payments", icon: DollarSign },
  { title: "Videos", url: "/admin/videos", icon: Video },
  { title: "Messages", url: "/admin/messages", icon: MessageSquare },
];

export function AdminSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
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
