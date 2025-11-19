import { ComingSoon } from "@/components/ComingSoon";

const AdminAnnouncements = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Announcements Management</h1>
        <p className="text-muted-foreground">Create and manage announcements</p>
      </div>
      <ComingSoon />
    </div>
  );
};

export default AdminAnnouncements;
