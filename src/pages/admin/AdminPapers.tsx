import { ComingSoon } from "@/components/ComingSoon";

const AdminPapers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Papers Management</h1>
        <p className="text-muted-foreground">Manage past papers and tests</p>
      </div>
      <ComingSoon />
    </div>
  );
};

export default AdminPapers;
