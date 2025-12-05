import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Shield, LogOut, Bell } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const AdminLayout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Responsive Header */}
          <header className="sticky top-0 z-40 h-14 md:h-16 border-b border-border/50 bg-card/80 backdrop-blur-xl">
            <div className="flex h-full items-center justify-between px-3 md:px-6 gap-2">
              {/* Left Section */}
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <SidebarTrigger className="hover:bg-muted rounded-xl transition-colors shrink-0" />
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xs md:text-sm font-bold font-display truncate">Admin Panel</h2>
                    <p className="text-[10px] md:text-xs text-muted-foreground">Management System</p>
                  </div>
                </div>
              </div>
              
              {/* Right Section */}
              <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                {/* Dark Mode Toggle */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleTheme}
                  className="rounded-xl hover:bg-muted h-8 w-8 md:h-9 md:w-9"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-warning" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl hover:bg-muted h-8 w-8 md:h-9 md:w-9"
                >
                  <Bell className="w-4 h-4" />
                </Button>
                
                {/* Admin Info - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-3 pl-3 border-l border-border/50">
                  <div className="text-right">
                    <p className="text-sm font-semibold">Administrator</p>
                    <p className="text-xs text-muted-foreground">Super Admin</p>
                  </div>
                  <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">A</span>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl hover:bg-destructive/10 hover:text-destructive h-8 w-8 md:h-9 md:w-9"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-3 md:p-6 lg:p-8 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
