import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ComparisonCardProps {
  title: string;
  value: number;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
}

export const ComparisonCard = ({ title, value, trend, subtitle }: ComparisonCardProps) => {
  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="w-5 h-5 text-success" />;
    if (trend === "down") return <TrendingDown className="w-5 h-5 text-destructive" />;
    return <Minus className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trend && getTrendIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}%</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
};
