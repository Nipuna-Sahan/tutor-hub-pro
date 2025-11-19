import { ComingSoon } from "@/components/ComingSoon";

const LMSAssignments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Assignments</h1>
        <p className="text-muted-foreground">Submit your assignments</p>
      </div>
      <ComingSoon />
    </div>
  );
};

export default LMSAssignments;
