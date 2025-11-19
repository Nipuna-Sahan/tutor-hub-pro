import { Construction } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full animate-pulse">
            <Construction className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          This feature is currently under development
        </p>
      </Card>
    </div>
  );
};
