import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LMSSidebar } from "@/components/LMSSidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { NotificationBell } from "@/components/NotificationBell";
import { NotificationProvider } from "@/contexts/NotificationContext";

const LMSLayout = () => {
  return (
    <NotificationProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <LMSSidebar />
          <div className="flex-1">
            <header className="h-16 border-b flex items-center justify-between px-6 bg-card">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h2 className="text-lg font-semibold">Student Portal</h2>
              </div>
              <div className="flex items-center gap-2">
                <NotificationBell />
                <Button variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </header>
            <main className="p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </NotificationProvider>
  );
};

export default LMSLayout;
