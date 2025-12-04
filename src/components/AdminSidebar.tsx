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
  MessageSquare,
  Shield,
  Sparkles
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
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, color: "text-primary" },
  { title: "Classes", url: "/admin/classes", icon: GraduationCap, color: "text-info" },
  { title: "Students", url: "/admin/students", icon: Users, color: "text-accent" },
  { title: "Resources", url: "/admin/resources", icon: FileText, color: "text-success" },
  { title: "Announcements", url: "/admin/announcements", icon: Megaphone, color: "text-warning" },
  { title: "Papers", url: "/admin/papers", icon: FileCheck, color: "text-info" },
  { title: "Marks", url: "/admin/marks", icon: BarChart3, color: "text-success" },
  { title: "Attendance", url: "/admin/attendance", icon: Calendar, color: "text-accent" },
  { title: "Payments", url: "/admin/payments", icon: DollarSign, color: "text-warning" },
  { title: "Videos", url: "/admin/videos", icon: Video, color: "text-primary" },
  { title: "Messages", url: "/admin/messages", icon: MessageSquare, color: "text-info" },
];

export function AdminSidebar() {
  const { open, state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      {/* Sidebar Header */}
      <SidebarHeader className="p-3 md:p-4">
        <Link to="/admin" className="flex items-center gap-3 group">
          <div className={cn(
            "flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent transition-all duration-300 group-hover:shadow-glow",
            isCollapsed ? "w-10 h-10" : "w-10 h-10 md:w-12 md:h-12"
          )}>
            <Shield className={cn(
              "text-white transition-all",
              isCollapsed ? "w-5 h-5" : "w-5 h-5 md:w-6 md:h-6"
            )} />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1 className="font-display font-bold text-base md:text-lg leading-tight">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
            isCollapsed && "sr-only"
          )}>
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-auto p-0">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 md:py-2.5 rounded-xl transition-all duration-200",
                        "hover:bg-muted/80 group",
                        isCollapsed && "justify-center px-2"
                      )}
                      activeClassName="bg-primary/10 text-primary shadow-sm"
                    >
                      {({ isActive }) => (
                        <>
                          <div className={cn(
                            "flex items-center justify-center rounded-lg transition-all duration-200",
                            isCollapsed ? "w-9 h-9" : "w-7 h-7 md:w-8 md:h-8",
                            isActive 
                              ? "bg-primary text-white shadow-md" 
                              : `bg-muted/50 ${item.color} group-hover:bg-muted`
                          )}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          {!isCollapsed && (
                            <span className={cn(
                              "font-medium text-sm transition-colors",
                              isActive ? "text-primary" : "text-foreground/80 group-hover:text-foreground"
                            )}>
                              {item.title}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="p-3 md:p-4">
        {!isCollapsed && (
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent p-3 md:p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary">Admin Tip</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Keep your data updated for accurate reports!
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
