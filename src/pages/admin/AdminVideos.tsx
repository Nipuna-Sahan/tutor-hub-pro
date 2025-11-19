import { ComingSoon } from "@/components/ComingSoon";

const AdminVideos = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Videos Management</h1>
        <p className="text-muted-foreground">Upload and manage video lessons</p>
      </div>
      <ComingSoon />
    </div>
  );
};

export default AdminVideos;
