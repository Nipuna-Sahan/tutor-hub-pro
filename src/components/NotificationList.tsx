import { useNotifications } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, FileText, Bell, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export function NotificationList() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-4 w-4" />;
      case "deadline":
        return <Bell className="h-4 w-4" />;
      case "announcement":
        return <Megaphone className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "default";
      case "deadline":
        return "destructive";
      case "announcement":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-4 pb-3">
        <h3 className="font-semibold">Notifications</h3>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs"
            onClick={markAllAsRead}
          >
            <CheckCheck className="h-3 w-3 mr-1" />
            Mark all read
          </Button>
        )}
      </div>
      <Separator />
      
      {notifications.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm">No notifications yet</p>
        </div>
      ) : (
        <ScrollArea className="h-[400px]">
          <div className="divide-y">
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                to={notification.link || "#"}
                onClick={() => markAsRead(notification.id)}
                className={`block p-4 hover:bg-muted/50 transition-colors ${
                  !notification.read ? "bg-muted/30" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div className={`mt-1 ${!notification.read ? "text-primary" : "text-muted-foreground"}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-medium ${!notification.read ? "" : "text-muted-foreground"}`}>
                        {notification.title}
                      </p>
                      <Badge variant={getTypeColor(notification.type)} className="text-xs shrink-0">
                        {notification.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
