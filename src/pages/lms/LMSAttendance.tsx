import { ComingSoon } from "@/components/ComingSoon";

const LMSAttendance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance</h1>
        <p className="text-muted-foreground">Track your class attendance</p>
      </div>
      <ComingSoon />
    </div>
  );
};

export default LMSAttendance;
