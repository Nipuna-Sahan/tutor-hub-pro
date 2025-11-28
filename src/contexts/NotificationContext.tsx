import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Notification {
  id: string;
  type: "assignment" | "deadline" | "announcement";
  title: string;
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "read">) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-1",
      type: "assignment",
      title: "New Assignment",
      message: "Chemistry Lab Report due in 3 days",
      date: "2025-01-25T10:00:00",
      read: false,
      link: "/lms/assignments"
    },
    {
      id: "notif-2",
      type: "deadline",
      title: "Upcoming Deadline",
      message: "Physics Assignment due tomorrow",
      date: "2025-01-24T09:00:00",
      read: false,
      link: "/lms/assignments"
    },
    {
      id: "notif-3",
      type: "announcement",
      title: "Class Schedule Update",
      message: "Next class moved to 3:00 PM",
      date: "2025-01-23T14:30:00",
      read: true,
      link: "/lms/announcements"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notification: Omit<Notification, "id" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
