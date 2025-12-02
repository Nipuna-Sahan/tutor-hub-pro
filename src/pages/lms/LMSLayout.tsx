import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LMSSidebar } from "@/components/LMSSidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Sparkles } from "lucide-react";
import { NotificationBell } from "@/components/NotificationBell";
import { NotificationProvider } from "@/contexts/NotificationContext";
import studentsData from "@/data/students.json";

const LMSLayout = () => {
  const student = studentsData[0]; // Mock logged-in student

  return (
    <NotificationProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <LMSSidebar />
          <div className="flex-1 flex flex-col">
            {/* Modern Header */}
            <header className="sticky top-0 z-40 h-16 border-b border-border/50 bg-card/80 backdrop-blur-xl">
              <div className="flex h-full items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-3">
                  <SidebarTrigger className="hover:bg-muted rounded-xl transition-colors" />
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold font-display">Student Portal</h2>
                      <p className="text-xs text-muted-foreground">{student?.class}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <NotificationBell />
                  <div className="hidden md:flex items-center gap-3 pl-3 border-l border-border/50">
                    <div className="text-right">
                      <p className="text-sm font-semibold">{student?.name}</p>
                      <p className="text-xs text-muted-foreground">{student?.grade}</p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {student?.name?.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-xl hover:bg-destructive/10 hover:text-destructive">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
              <div className="max-w-7xl mx-auto">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </NotificationProvider>
  );
};

export default LMSLayout;
